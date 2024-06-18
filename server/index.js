var mongo = require('./mongo.js');
var auth = require('./auth.js');
var http = require('http');
var fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var user = require('./user.js');

//mongo.connectClient();
let client = null;
//mongo.getConnection().then(function(db){
//  client = db;
//})

const app = express();
dotenv.config({ path: './.env'});
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());

const dir = "/home/runner/StrongDeeppinkDatum/";


app.get("/", (req, res) => {
  //auth.checkLoggedInRedirect(req, res);
  //if (!auth.checkLoggedIn(req)){
    //return;
  //}
  res.sendFile(dir + "client/home/home.html");
});

app.get("/login", (req, res) => {
  console.log("test");
  if (auth.checkLoggedIn(req)){
    res.redirect("/");
    return;
  }
  res.sendFile(dir + "client/login/login.html");
});

app.get("/signup", (req, res) => {
  if (auth.checkLoggedIn(req)){
    res.redirect("/");
    return;
  }
  res.sendFile(dir + "client/signup/signup.html");
});

app.get("/post.html", (req, res) => {
  res.sendFile(dir + "client/home/post.html");
});

app.get("/home.js", (req, res) => {
  res.sendFile(dir + "client/home/home.js");
});

app.get("/home.css", (req, res) => {
  res.sendFile(dir + "client/home/home.css");
});






app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const result = await user.loginUser(username, password, client);
  const success = result.success;
  if (success){
    res.cookie("token", result.token, { maxAge: 5*60*1000, httpOnly: false});
    res.redirect("/");
    return;
  }
  res.send("Invalid username or password");
});

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  let result = await user.createUser(username, password, email, client);
  
  if (!result.success){
    res.send("Username or email already exists");
    return;
  }
  
  result = await user.loginUser(username, password, client);
  success = result.success;
  if (success){
    res.cookie("token", result.token, { maxAge: 5*60*1000, httpOnly: false});
    res.redirect("/");
    return;
  }
  res.send("Invalid username or password");
});


app.listen(5000, ()=> {
    console.log("server started on port 5000")
})