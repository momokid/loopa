document.addEventListener("DOMContentLoaded", async ()=>  {
  const socket = io({ withCredentials: true });

  const users = await fetchUser();
  if(users){
    const {currentUser, otherUsers} = users;
    senderId = currentUser.id

    renderUsersToDOM(currentUser, otherUsers);
  }

  setUpChatTabs();

  userLogOut();
});


//fetch all users 
async function fetchUser() {
  try {
    const result = await fetch("/api/chat/users", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) throw new Error("Failed to load users");

    const users = await result.json();
    return users;
  } catch (err) {
    console.error("Error loading users (505): ", err);
    return null;
  }
}

//chat tabs
function setUpChatTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      //Get selected tab
      const selectedTab = btn.dataset.tab;

      //Hide all tabs contents
      tabContents.forEach((tab) => tab.classList.add("hidden"));

      //Show selected tab
      const activeList = document.querySelector(
        `.tab-content[data-tab="${selectedTab}"]`
      );
      if (activeList) activeList.classList.remove("hidden");
    });
  });
}

//Update Users DOM
function renderUsersToDOM(currentUser, otherUsers) {
  // Display current user
  document.querySelector(".user-profile .user-name").textContent = currentUser.username;

  // Display other users
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
        <div class="status-indicator online"></div>
      </div>
    `;

    chatList.appendChild(li);
  });
}

//logout
function userLogOut() {
  const logoutBtn = document.getElementById("logout-btn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "/logout";
    });
  }
}
