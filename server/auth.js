const jwt = require('jsonwebtoken');

async function auth(username, password, client){
  //console.log(client);
  let col = await client.db("social").collection("UserAuth");
  let query = {username: username, password: password};
  const result = await col.findOne(query);
  if (result){
    return {success: true, data: result};
  }else{
    return {success: false};
  }
}


function generateAccessToken(user) {
  const payload = {
    id: user.id,
    username: user.name,
    email: user.email
  };

  const secret = 'your-secret-key';
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
}


function verifyAccessToken(token) {
  const secret = 'your-secret-key';

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function getCookies(req){
  return req.cookies;
}



function checkLoggedIn(req){ 
  const token = getCookies(req).token;
  if (token){
    const decoded = verifyAccessToken(token);
    if (decoded.success){
      return true;
    }else{
      return false;
    }
  }
  return false;
}

function checkLoggedInRedirect(req, res){ 
  const token = getCookies(req).token;
  if (token){
    const decoded = verifyAccessToken(token);
    if (decoded.success){
      return;
    }else{
      res.redirect("/login")
    }
  }
  res.redirect("/login")
}

module.exports = {
  auth,
  generateAccessToken,
  verifyAccessToken,
  checkLoggedIn,
  checkLoggedInRedirect
}