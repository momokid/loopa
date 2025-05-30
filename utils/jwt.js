const jwt = require("jsonwebtoken");

function generateToken(user){
    return jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    )
}

module.exports = {generateToken}