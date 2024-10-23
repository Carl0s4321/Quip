
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config({path:"./config.env"})

const DB_NAME = "app"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;

module.exports = {
    connectToServer: async function() {
        try {
            await client.connect();
            database = client.db(DB_NAME);
            console.log(`Successfully connected to MongoDB - database ${DB_NAME}.`);
        } catch (err) {
            console.error("Error connecting to MongoDB:", err);
            process.exit(1);
        }
    },
    getDb: () => {
        return database
    }
}
