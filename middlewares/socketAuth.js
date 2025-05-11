const jwt = require("jsonwebtoken")
const cookie = require("cookie");

function socketAuthMiddleware(socket, next){
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.token;

    if(!token) return next(new Error("Athentication error: No token"));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        socket.user= decoded //user info attached
        next();

    } catch (error) {
        return next(new Error("Authentication error: INvalid token"))
    }
}

module.exports = socketAuthMiddleware;