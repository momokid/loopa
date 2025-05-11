document.addEventListener("DOMContentLoaded", () => {
  const socket = io({
    withCredentials: true
  });

  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("btn-send-message");
  const messagesContainer = document.querySelector(".chat-messages");

  sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message !== "") {
      const messageData = {
        send: "You",
        content: message,
        timestamp: new Date().toISOString(),
      };

      socket.emit("message:send", messageData);
      addMessageToDOM(messageData, true);
      messageInput.value = "";
    }
  });

  socket.on("message:receive", (messageData) => {
    addMessageToDOM(messageData, false);
  });

  socket.on("test reply", (data) => {
    console.log(data.msg); // This will log 'Hello from server!' when the server sends a reply
  });

  function addMessageToDOM(data, isMine) {
    const msgEl = document.createElement("div");
    msgEl.classList.add("message");
    msgEl.classList.add(isMine ? "sent" : "received");
    msgEl.innerHTML = `
         <p>${data.content}</p>
         <span class="time">${new Date(data.timestamp).toLocaleTimeString([], {
           hour: "2-digit",
           minute: "2-digit",
         })}</span>
        `;
    messagesContainer.appendChild(msgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
});
