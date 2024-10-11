
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config({path:"./config.env"})

const DB_NAME="app"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database;

console.log('te')

module.exports = {
    connectToServer: () => {
        database = client.db(DB_NAME);

    },
    getDb: () => {
        return database;
    }
}