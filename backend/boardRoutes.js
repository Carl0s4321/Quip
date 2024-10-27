const express = require('express');
const database = require('./connect');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config({path: "./config.env"})

let boardRoutes = express.Router();
const SALT = 6;
const BOARD_COLLECTION_NAME = "boards"
const COLUMN_COLLECTION_NAME = "columns"
const TASK_COLLECTION_NAME = "tasks"

// make CRUD operations:
// retrieve all board relating to a user
// http://localhost:3000/users/:userId/boards

// do verifyToken, if token is verified we run the get function otherwise throw error.
boardRoutes.route('/users/:userId/boards').get(verifyToken, async (request,response) => {
    let db = database.getDb();
    let data = await db.collection(BOARD_COLLECTION_NAME).find({creatorId: request.params.userId}).toArray();

    if(data.length > 0){
        response.json(data);
    } else{
        response.status(404).json({message: "No boards for this user"})
    }
})

// retrieve specific board
// http://localhost:3000/boards/:boardId
boardRoutes.route('/boards/:boardId').get(verifyToken, async (request,response) => {
    try {
        const db = database.getDb();
        
        const board = await db.collection(BOARD_COLLECTION_NAME).findOne({_id: new ObjectId(request.params.boardId)});
        
        if (!board) {
            return response.status(404).json({ error: "Board not found" });
        }
        // console.log('board response', board)
        
        
        // get columns related to each board
        const columns = await db.collection(COLUMN_COLLECTION_NAME).find({ boardId: board._id.toString() }).toArray();
        console.log('column response', columns)

        const columnsObject = {};

        columns.forEach(column => {
            columnsObject[column._id] = {
                id: column._id.toString(),
                title: column.title,
                taskIds: column.taskIds || [], 
            };
        });

        // get tasks relatef to each column
        const tasks = await db.collection(TASK_COLLECTION_NAME).find({ columnId: { $in: Object.keys(columnsObject) } }).toArray();

        const tasksObject = {};
        tasks.forEach(task => {
            tasksObject[task._id] = {
                id: task._id.toString(),
                content: task.content,
            };
        });

        const responseBody = {
            _id: board._id,
            name: board.name,
            creatorId: board.creatorId,
            invitedUsers: board.invitedUsers || [],
            tasks: tasksObject,
            columns: columnsObject,
            columnOrder: board.columnOrder,
        };

        response.json(responseBody);
    } catch (error) {
        console.error("Error fetching board data:", error);
        response.status(500).json({ error: "Internal server error" });
    }
})

// // create one
// // route can be same but use different methods (get/post)
// boardRoutes.route('/users').post(async (request,response) => {
//     let db = database.getDb();

//     try {
//         const takenEmail = await db.collection(BOARD_COLLECTION_NAME).findOne({ email: request.body.email });
//         if (takenEmail) {
//           return response.json({ success:false, message: "Email is taken" });
//         }
    
//         const hash = await bcrypt.hash(request.body.password, SALT);
    
//         let mongoObject = {
//           name: request.body.name,
//           email: request.body.email,
//           password: hash,
//         };
    
//         let data = await db.collection(BOARD_COLLECTION_NAME).insertOne(mongoObject);

//         // console.log("DATA IN ROUTES:, ", data)

//         const token = jwt.sign(mongoObject, process.env.SECRET_KEY, { expiresIn: '24h' });
    
//         return response.json({
//             success: true,
//             message: 'User created successfully',
//             token: token,
//         });
//       } catch (error) {
//         throw error
//       }
// })

// // update one
// boardRoutes.route('/users/:id').put(verifyToken, async (request,response) => {
//     let db = database.getDb();
//     let updatedUserInfo = {
//         name: request.body.name,
//         email: request.body.email,
//         password: request.body.password,
//     };

//     let mongoObject = { $set: updatedUserInfo };
//     let data = await db.collection(BOARD_COLLECTION_NAME).updateOne({_id: new ObjectId(request.params.id)}, mongoObject);

//     if (data.modifiedCount > 0) {
//         // generate new token with updated user info
//         const tokenPayload = {
//             _id: request.params.id,
//             name: updatedUserInfo.name,
//             email: updatedUserInfo.email,
//             password: request.body.password,
//         };
//         const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '24h' });
        
//         return response.json({
//             success: true,
//             message: 'User updated successfully',
//             token: token,
//         });
//     } else {
//         return response.status(400).json({
//             success: false,
//             message: 'Failed to update user',
//         });
//     }
// })

// // delete one
// boardRoutes.route('/users/:id').delete(verifyToken, async (request,response) => {
//     let db = database.getDb();
//     let data = await db.collection(BOARD_COLLECTION_NAME).deleteOne({_id: new ObjectId(request.params.id)})
//     response.json(data);
// })

// // login
// boardRoutes.route('/users/login').post(async (request,response) => {
//     let db = database.getDb();
    
//     const user = await db.collection(BOARD_COLLECTION_NAME).findOne({email: request.body.email})
//     if(user){
//         bcrypt.compare(request.body.password, user.password, (err, data) => {
//             //if error then throw error
//             if (err) throw err

//             if (data) {
//                 const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '24h'})
//                 return response.json({success:true, token})
//             } else {
//                 return response.json({success:false, message: "Incorrect email/password"})
//             }
//         })
//     }else{
//         return response.json({success:false, message: "Account not found"})
//     }
// })

// if verified, go to next
function verifyToken(request, response, next){
    const authHeader = request.headers['authorization']
    // authHeader = Bearer 12345
    // split by ' ' and take the token
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        return response.status(401).json({message:'Authentication token is missing!'})
    }
    // run the arrow function if verification is successful, error is filled otherwise
    jwt.verify(token, process.env.SECRET_KEY, (error,user)=>{
        if(error){
            return response.status(403).json({message:'Invalid token!'})
        }

        request.body.user = user

        // proceedto next step
        next()
    })
}

module.exports = boardRoutes;