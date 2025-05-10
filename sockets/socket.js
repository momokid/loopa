const pool = require('../config/db');

function socketHandler(io) {

  io.on("connection", (socket) => {
    //console.log(" ✅ User connected", socket.id);

    //
    socket.on("message:send", async (messageData) => {
      // const {senderId, receiverId, content, timestamp} = messageData;

      // await pool.query("INSERT INTO messages (sender_id, receiver_id,message, created_at) VALUES(?,?,?,?)",[senderId, receiverId, content, timestamp]);

      //broadcast to receiver
      socket.broadcast.emit("message:receive", messageData);
    });

    socket.on("disconnect", () => {
      console.log(" ❌ User disconnected", socket.id);
    });
  });
}

module.exports = socketHandler;
