const {User} = require("../db");
const {verify} = require("jsonwebtoken");
const {globalSecret} = require("../config");
const cors = require("cors")

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
   const authorization = req.headers.authorization;
   const word = authorization.split(" ");
   const decodedToken = verify(word[1],globalSecret)
    if(decodedToken.username){
req.username= decodedToken.username
        next();
    } else{
        res.status(403).json(" logged in first")
    }
}

module.exports = userMiddleware;