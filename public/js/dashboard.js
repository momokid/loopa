document.addEventListener("DOMContentLoaded", () => {

    fetchUsers();

    setUpChatTabs();

    userLogOut();
});

//Fetch all users
function fetchUsers() {
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
      document.querySelector(".user-profile .user-name").textContent =
        currentUser.username;

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
    })
    .catch((error) => {
      console.error("Error loading users (505): ", error);
    });
}

//chat tabs
function setUpChatTabs(){
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content')

    tabButtons.forEach(btn=>{
        btn.addEventListener('click',()=>{
            tabButtons.forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');

            //Get selected tab
            const selectedTab = btn.dataset.tab;

            //Hide all tabs contents
            tabContents.forEach(tab=>tab.classList.add('hidden'));

            //Show selected tab
            const activeList = document.querySelector(`.tab-content[data-tab="${selectedTab}"]`);
            if(activeList) activeList.classList.remove('hidden');
        })
    })
}

//logout
function userLogOut(){
    const logoutBtn = document.getElementById('logout-btn');

    if(logoutBtn){
        logoutBtn.addEventListener('click',()=>{
           window.location.href = '/logout';
        })
    }
}