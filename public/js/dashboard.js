document.addEventListener("DOMContentLoaded", () => {
  fetch("api/chat/users", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load users");
      return res.json();
    })
    .then((users) => {
      // console.log(users)
      const { currentUser, otherUsers } = users;

      //display current users
      document.querySelector('.user-profile .user-name').textContent = currentUser.username
      
      const chatList = document.querySelector(".chat-list");
      chatList.innerHTML = "";

      otherUsers.forEach((user) => {
        const li = document.createElement("li");
        li.classList.add("chat-item");
        li.dataset.id = user.id;

        li.innerHTML = `
            <img src="images/avatars/john.jpg" alt="${user.username}" />
            <div class="chat-users-list">
                <div class="name">${user.username}</div>
                <div class="status-indicator offline"></div>
            </div>
            `;

        chatList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error loading users (505): ", error);
    });
});
