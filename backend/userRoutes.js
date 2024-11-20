const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const error = require("./util");
require("dotenv").config({ path: "./config.env" });

let userRoutes = express.Router();
const SALT = 6;
const USER_COLLECTION_NAME = "users";

// make CRUD operations:
// retrieve all
// http://localhost:3000/users

// do verifyToken, if token is verified we run the get function otherwise throw error.
userRoutes.route("/users").get(verifyToken, async (request, response) => {
  let db = database.getDb();
  let data = await db.collection(USER_COLLECTION_NAME).find({}).toArray();

  if (data.length > 0) {
    response.json(data);
  } else {
    response.status(400).json(response.data);
  }
});

// retrieve one
// http://localhost:3000/users/12345
userRoutes.route("/users/:id").get(verifyToken, async (request, response) => {
  let db = database.getDb();
  try{
    let data = await db
    .collection(USER_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(request.params.id) });

    if (Object.keys(data).length < 1) {
      error('User not found', 404)
    }

    return response.status(200).json(data);
  // since data should only be one object, we check if the object is empty or not
  }catch(e){
    console.error(e);
    return response.status(e.status).json({message: e.message});
  }

  
});

// create one
// route can be same but use different methods (get/post)
userRoutes.route("/users").post(async (request, response) => {
  let db = database.getDb();

  try {
    const takenEmail = await db
      .collection(USER_COLLECTION_NAME)
      .findOne({ email: request.body.email });
    if (takenEmail) {
      return response.json({ success: false, message: "Email is taken" });
    }

    const hash = await bcrypt.hash(request.body.password, SALT);

    let mongoObject = {
      name: request.body.name,
      email: request.body.email,
      password: hash,
      friends: [],
    };

    let data = await db.collection(USER_COLLECTION_NAME).insertOne(mongoObject);

    // console.log("DATA IN ROUTES:, ", data)

    const token = jwt.sign(mongoObject, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    return response.json({
      success: true,
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    throw error;
  }
});

// update one
userRoutes.route("/users/:id").put(verifyToken, async (request, response) => {
  let db = database.getDb();
  let updatedUserInfo = {
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    friends: request.body.friends,
  };

  try {
    let data = await db
      .collection(USER_COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(request.params.id) },
        { $set: updatedUserInfo }
      );
    if (data.modifiedCount > 0) {
      const tokenPayload = {
        _id: request.params.id,
        name: updatedUserInfo.name,
        email: updatedUserInfo.email,
        password: request.body.password,
        friends: request.body.friends,
      };
      const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });

      return response.status(200).json({
        success: true,
        message: "User updated successfully",
        token: token,
      });
    } else {
      error("Failed updating user info", 400);
    }
  } catch (error) {
    console.error(error.message);
    return response.status(error.status).json(error);
  }
});

// delete one
userRoutes
  .route("/users/:id")
  .delete(verifyToken, async (request, response) => {
    let db = database.getDb();
    let data = await db
      .collection(USER_COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(request.params.id) });
    response.json(data);
  });

// login
userRoutes.route("/users/login").post(async (request, response) => {
  let db = database.getDb();

  try {
    const user = await db
      .collection(USER_COLLECTION_NAME)
      .findOne({ email: request.body.email });
    if (!user) {
      error("User doesn't exist", 404);
    }

    bcrypt.compare(request.body.password, user.password, (err, data) => {
      //if error then throw error
      if (err) error(err.message);

      if (data) {
        const token = jwt.sign(user, process.env.SECRET_KEY, {
          expiresIn: "24h",
        });
        return response.status(200).json({ token });
      } else {
        error("Wrong password/email", 401)
      }
    });
  } catch (e) {
    console.error(e);
    return response.status(e.status).json({message: e.message});
  }
});

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

module.exports = userRoutes;
