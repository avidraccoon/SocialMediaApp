const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const uri = "mongodb+srv://"+username+":"+password+"@cluster0.ujlon0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
let client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectClient(){
  await client.connect();
}

async function getConnection(){
  return client;
}

async function closeConnection(client){
  await client.close();
}
module.exports = {getConnection, closeConnection, connectClient}