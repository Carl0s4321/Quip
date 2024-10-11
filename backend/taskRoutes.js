const express = require('express');
const database = require('./connect');
const ObjectId = require('mongodb').ObjectId;

const TASKS_COLLECTION = "tasks"

let taskRoutes = express.Router();

// make CRUD operations:
// retrieve all
// http://localhost:3000/tasks
taskRoutes.route('/tasks').get(async (request,response) => {
    let db = database.getDb();
    let data = await db.collection("tasks").find({}).toArray();

    if(data.length > 0){
        response.json(data);
    } else{
        throw new Error("Data not found")
    }
})

// retrieve one
// http://localhost:3000/tasks/12345
taskRoutes.route('/tasks/:id').get(async (request,response) => {
    let db = database.getDb();
    let data = await db.collection("tasks").findOne({_id: new ObjectId(request.params.id)})
    // since data should only be one object, we check if the object is empty or not
    if(Object.keys(data).length > 0){
        response.json(data);
    } else{
        throw new Error("Data not found")
    }
})

// create one
// route can be same but use different methods (get/post)
// taskRoutes.route('/tasks').post(async (request,response) => {
//     let db = database.getDb();

//     try {
//         const takenEmail = await db.collection(tasks).findOne({ email: request.body.email });
//         if (takenEmail) {
//           return response.json({ success:false, message: "Email is taken" });
//         }
    
//         // const hash = await bcrypt.hash(request.body.password, SALT);
    
//         let mongoObject = {
//           name: request.body.name,
//           email: request.body.email,
//           password: hash,
//         };
    
//         let data = await db.collection(tasks).insertOne(mongoObject);
    
//         return response.json({ success:true, data });
//       } catch (error) {
//         throw error
//       }
// })

// update one
// taskRoutes.route('/tasks/:id').put(async (request,response) => {
//     let db = database.getDb();
//     let mongoObject = {
//         $set: {
//             name: request.body.name,
//             email: request.body.email,
//             password: request.body.password,
//         }
//     };
//     let data = await db.collection(tasks).updateOne({_id: new ObjectId(request.params.id)}, mongoObject);
//     response.json(data);
// })

// delete one
// taskRoutes.route('/tasks/:id').delete(async (request,response) => {
//     let db = database.getDb();
//     let data = await db.collection(tasks).deleteOne({_id: new ObjectId(request.params.id)})
//     response.json(data);
// })
