const express = require('express');
const database = require('./connect');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config({path: "./config.env"})

const CHAT_COLLECTION_NAME = "chats"

let chatRoutes = express.Router();

// retrieve all chats relating to a user
// do verifyToken, if token is verified we run the get function otherwise throw error.
chatRoutes.route('/chat/:userId').get(verifyToken, async (request,response) => {
    let db = database.getDb();
    const userId = request.params.userId

    try{
        const chats = await db.collection(CHAT_COLLECTION_NAME).find({
            members: {$in: [userId] }
        }).toArray();

        response.status(200).json(chats)

    }catch(error){
        console.error(error)
        response.status(500).json(error)
    }

})

// retrieve specific chat
chatRoutes.route('/chat/find/:firstId/:secondId').get(verifyToken, async (request,response) => {
    let db = database.getDb();
    const {firstId, secondId} = request.params

    try{
        const chat = await db.collection(CHAT_COLLECTION_NAME).findOne({
            members: {$all: [firstId, secondId] }
        });

        response.status(200).json(chat)

    }catch(error){
        console.error(error)
        response.status(500).json(error)
    }
})

// create one
// route can be same but use different methods (get/post)
chatRoutes.route('/chat/create').post(async (request,response) => {
    let db = database.getDb();
    const {firstId, secondId} = request.body

    try{
        // find if chat exists already
        const chat = await db.collection(CHAT_COLLECTION_NAME).findOne({
            members: {$all: [firstId, secondId]}
        })
        if (chat) return response.status(200).json(chat)

        const newChat = {
            members: [firstId, secondId],
            lastUpdated: new  Date(),
        }
        const data = await db.collection(CHAT_COLLECTION_NAME).insertOne(newChat)

        response.status(200).json(data)

    }catch(error){
        console.log(error)
        response.status(500).json(error)
    }
})

// delete one
chatRoutes.route('/chats/delete/:id').delete(verifyToken, async (request,response) => {

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

module.exports = chatRoutes;