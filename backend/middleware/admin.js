const{Admin}= require('../db')
const {globalSecret} = require("../config");
const {verify} = require("jsonwebtoken");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
const authorization = req.headers.authorization
    const word = authorization.split(" ")
const decodedToken = verify(word[1],globalSecret)
    if(decodedToken.username){
        next()
    } else {
        res.json("Admin not logged in")
    }
}

module.exports = adminMiddleware;