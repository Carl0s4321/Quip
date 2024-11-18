const express = require('express');
const database = require('./connect');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config({path: "./config.env"})

const MESSAGE_COLLECTION_NAME = "messages"

let messageRoutes = express.Router();

// retrieve all messages relating to a chat
// do verifyToken, if token is verified we run the get function otherwise throw error.
messageRoutes.route('/message/:chatId').get(verifyToken, async (request,response) => {
    let db = database.getDb();
    const chatId = request.params.chatId

    try{
        const messages = await db.collection(MESSAGE_COLLECTION_NAME).find({ chatId }).toArray();

        response.status(200).json(messages)

    }catch(error){
        console.error(error)
        response.status(500).json(error)
    }

})

// create one
// route can be same but use different methods (get/post)
messageRoutes.route('/message/create').post(async (request,response) => {
    let db = database.getDb();
    const {chatId, senderId, text} = request.body

    try{
        const newMessage = {
           chatId: chatId,
           senderId: senderId,
           text: text,
           timeStamp: new Date(),
        }
        
        await db.collection(MESSAGE_COLLECTION_NAME).insertOne(newMessage)
        response.status(200).json(newMessage)

    }catch(error){
        console.log(error)
        response.status(500).json(error)
    }
})

// delete one
messageRoutes.route('/messages/delete/:id').delete(verifyToken, async (request,response) => {

})

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

module.exports = messageRoutes;