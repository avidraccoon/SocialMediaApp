const auth = require("./auth.js");
const uuid = require('uuid');

async function duplicateChecker(user, mail, client){
  let db = await client.db("social");
  let users = await db.collection("Users");
  let auth = await db.collection("UserAuth");
  let usernameQuery = {username: user};
  let emailQuery = {email: mail};
  let usernameAuthResult = await auth.findOne(usernameQuery);
  let usernameResult = await users.findOne(usernameQuery);
  let emailResult = await users.findOne(emailQuery);
  console.log(usernameAuthResult, usernameResult, emailResult);
  if (usernameResult == null && usernameAuthResult == null && emailResult == null){
    return false; 
  }
  return true;
}

async function createUser(username, password, email, client){
  if (await duplicateChecker(username, email, client)){
    return {success: false};
  }
  let db = await client.db("social");
  let users = await db.collection("Users");
  let auth = await db.collection("UserAuth");
  const id = uuid.v4();
  let user = {
    username: username,
    email: email,
    id: id,
    posts: [],
    likedPosts: [],
    comments: []
  }
  let userAuth = {
    username: username,
    password: password,
    id: id
  }
  await users.insertOne(user);
  await auth.insertOne(userAuth);

  return {success: true};
}

async function loginUser(username, password, client){
  const valid =  await auth.auth(username, password, client);
  if (!valid.success){
    res.send("Invalid username or password");
  }
  const users = await client.db("social").collection("Users");
  const user = await users.findOne({username: username});
  //console.log(user);
  if (user){}
  else{
    return {success: false};
  }
  const email = user.email;
  const id = user._id;
  const token = auth.generateAccessToken({email: email, id: id, username: username});
  return {success: true, token: token};
}

module.exports = {
  createUser,
  loginUser
}