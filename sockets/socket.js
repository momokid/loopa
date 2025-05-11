const pool = require("../config/db");
const socketAuthMiddleware = require("../middlewares/socketAuth");

function socketHandler(io) {
  io.use(socketAuthMiddleware); //

  io.on("connection", (socket) => {
    socket.on("message:send", async (messageData) => {
      console.log(`✅ User connected: ${socket.user.username}`);

      //broadcast to receiver
      socket.broadcast.emit("message:receive", messageData);
    });

    socket.on("disconnect", () => {
      console.log(" ❌ User disconnected", socket.id);
    });
  });
}

module.exports = socketHandler;
