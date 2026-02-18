const JWT = require("jsonwebtoken");
require('dotenv').config()

const genrateToken = (payload)=>{
    return JWT.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h"
    });
}

const verifyToken = (token)=>{
    return JWT.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    genrateToken,
    verifyToken
}