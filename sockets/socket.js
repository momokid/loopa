function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log(" ✅ User connected", socket.id);

    //Test event
    socket.on("test message", (data) => {
      console.log(` 🛜 Message received`, data);
      socket.emit("test reply", {msg: 'Hello from server!'});
    });

    socket.on("disconnect", () => {
      console.log(" ❌ User disconnected", socket.id);
    });
  });
}

module.exports = socketHandler;
