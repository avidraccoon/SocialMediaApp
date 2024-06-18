const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nathansmith:AvidGameDev@cluster0.ujlon0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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