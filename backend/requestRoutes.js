const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const error = require("./util");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

let requestRoutes = express.Router();

const REQUEST_COLLECTION_NAME = "requests";
const USER_COLLECTION_NAME = "users";

// make CRUD operations:
// retrieve all
requestRoutes
  .route("/friendReqs/:userId")
  .get(verifyToken, async (request, response) => {
    let db = database.getDb();
    try {
      let incomingReqs = await db
        .collection(REQUEST_COLLECTION_NAME)
        .find({ receiverId: request.params.userId })
        .toArray();
      let outgoingReqs = await db
        .collection(REQUEST_COLLECTION_NAME)
        .find({ senderId: request.params.userId })
        .toArray();

      console.log('incoming:', incomingReqs ,"\noutgoing:", outgoingReqs)

      response.status(200).json({ incomingReqs, outgoingReqs });
    } catch (error) {
      console.error(error.message);
      response.status(500).json(error);
    }
  });

// retrieve one
// http://localhost:3000/users/12345
// requestRoutes.route('/users/:id').get(verifyToken, async (request,response) => {
//     let db = database.getDb();
//     let data = await db.collection(REQUEST_COLLECTION_NAME).findOne({_id: new ObjectId(request.params.id)})
//     // since data should only be one object, we check if the object is empty or not
//     if(Object.keys(data).length > 0){
//         response.json(data);
//     } else{
//         throw new Error("Data not found")
//     }
// })

// create one
requestRoutes.route("/friendReqs/create").post(async (request, response) => {
  let db = database.getDb();
  const { senderId, receiverId } = request.body;

  try {
    const existingReq = await db
      .collection(REQUEST_COLLECTION_NAME)
      .findOne({ senderId: senderId, receiverId: receiverId });

    if (existingReq) {
      error("request already exists!", 403);
    }

    const userExist = await db
      .collection(USER_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(receiverId) });

    if (!userExist) {
      error("user doesnt exists!", 404);
    }

    let newFriendReq = {
      senderId: senderId,
      receiverId: receiverId,
      sent: new Date(),
    };

    let data = await db
      .collection(REQUEST_COLLECTION_NAME)
      .insertOne(newFriendReq);

    newFriendReq["id"] = data.insertedId.toString();

    return response.status(200).json(newFriendReq);
  } catch (error) {
    console.error(error.message);
    response.status(error.status).json(error);
  }
});

// update one
// requestRoutes.route('/users/:id').put(verifyToken, async (request,response) => {
//     let db = database.getDb();
//     let updatedUserInfo = {
//         name: request.body.name,
//         email: request.body.email,
//         password: request.body.password,
//     };

//     let mongoObject = { $set: updatedUserInfo };
//     let data = await db.collection(REQUEST_COLLECTION_NAME).updateOne({_id: new ObjectId(request.params.id)}, mongoObject);

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

// delete one
// requestRoutes.route('/users/:id').delete(verifyToken, async (request,response) => {
//     let db = database.getDb();
//     let data = await db.collection(REQUEST_COLLECTION_NAME).deleteOne({_id: new ObjectId(request.params.id)})
//     response.json(data);
// })

// if verified, go to next
function verifyToken(request, response, next) {
  const authHeader = request.headers["authorization"];
  // authHeader = Bearer 12345
  // split by ' ' and take the token
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return response
      .status(401)
      .json({ message: "Authentication token is missing!" });
  }
  // run the arrow function if verification is successful, error is filled otherwise
  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) {
      return response.status(403).json({ message: "Invalid token!" });
    }

    request.body.user = user;

    // proceedto next step
    next();
  });
}

module.exports = requestRoutes;
