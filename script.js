
let users = [
  {
    id: 1,
    name: "Haroon",
    age: 22,
    city: "Kabul",
  },
  {
    id: 2,
    name: "Ahmad",
    age: 30,
    city: "Herat",
  },
  {
    id: 3,
    name: "Ali",
    age: 25,
    city: "Kabul",
  },
  {
    id: 4,
    name: "Omid",
    age: 35,
    city: "Kandahar",
  },
];

/* === GET HTML ELEMENTS ===== */

const addUserForm = document.getElementById("addUserForm");
const userName = document.getElementById("userName");
const userAge = document.getElementById("userAge");
const userCity = document.getElementById("userCity");
const usersContainer = document.getElementById("usersContainer");
const userCount = document.getElementById("userCount");
const totalUsers = document.getElementById("totalUsers");
const message = document.getElementById("message");
const searchInput = document.getElementById("searchInput");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cityBtn = document.getElementById("cityBtn");
const showAllBtn = document.getElementById("showAllBtn");
const oldestUser = document.getElementById("oldestUser");
const oldestAge = document.getElementById("oldestAge");
const averageAge = document.getElementById("averageAge");
const updateUserForm = document.getElementById("updateUserForm");
const updateId = document.getElementById("updateId");
const updateName = document.getElementById("updateName");
const updateAge = document.getElementById("updateAge");
const updateCity = document.getElementById("updateCity");
const updateMessage = document.getElementById("updateMessage");
const usersSubtitle = document.getElementById("usersSubtitle");

/* ==== DISPLAY USERS ===== */

function displayUsers(usersToDisplay = users) {
  usersContainer.innerHTML = "";

  if (usersToDisplay.length === 0) {
    usersContainer.innerHTML = `
            <div class="empty-state">
                <p>No users found.</p>
            </div>
        `;

    return;
  }

  usersToDisplay.forEach((user) => {
    const card = document.createElement("div");

    card.classList.add("user-card");

    card.innerHTML = `
            <div class="user-top">

                <div class="user-avatar">
                    ${user.name.charAt(0).toUpperCase()}
                </div>

                <span class="user-id">
                    ID: ${user.id}
                </span>

            </div>

            <h3 class="user-name">
                ${user.name}
            </h3>

            <p class="user-info">
                Age: ${user.age}<br>
                City: ${user.city}
            </p>

            <div class="user-actions">

                <button
                    class="delete-btn"
                    onclick="deleteUser(${user.id})"
                >
                    Delete User
                </button>

            </div>
        `;

    usersContainer.appendChild(card);
  });
}

/* ====== UPDATE USER COUNT ====== */

function updateUserCount() {
  userCount.textContent = users.length;
  totalUsers.textContent = users.length;
}

/* ====== ADD USER ====== */

addUserForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = userName.value.trim();
  const age = Number(userAge.value);
  const city = userCity.value.trim();

  if (!name || !age || !city) {
    showMessage(message, "Please fill in all fields.", "error");
    return;
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
    name: name,
    age: age,
    city: city,
  };

  users.push(newUser);
  displayUsers();
  updateUserCount();
  calculateAverageAge();
  findOldestUser();
  showMessage(message, `${name} was added successfully.`, "success");
  addUserForm.reset();
});

/* ====== DELETE USER ======== */

function deleteUser(id) {
  const user = users.find((user) => user.id === id);
  if (!user) {
    return;
  }

  users = users.filter((user) => user.id !== id);
  displayUsers();
  updateUserCount();
  calculateAverageAge();
  findOldestUser();
  showMessage(message, `${user.name} was deleted.`, "success");
}

/* ===== SEARCH USER ======= */

function searchUser() {
  const searchText = searchInput.value.trim().toLowerCase();
  if (!searchText) {
    displayUsers();
    usersSubtitle.textContent = "All registered users";
    return;
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText),
  );

  displayUsers(filteredUsers);
  usersSubtitle.textContent = `Search results for "${searchInput.value}"`;
}

searchBtn.addEventListener("click", searchUser);

/* ===== FIND USERS BY CITY ======= */

function findUsersByCity() {
  const city = cityInput.value.trim().toLowerCase();

  if (!city) {
    displayUsers();
    return; 
  }
  const filteredUsers = users.filter(
    (user) => user.city.toLowerCase() === city,
  );
  displayUsers(filteredUsers);
  usersSubtitle.textContent = `Users from "${cityInput.value}"`;
}
cityBtn.addEventListener("click", findUsersByCity);

/* === SHOW ALL USERS ====== */

showAllBtn.addEventListener("click", function () {
  displayUsers();
  usersSubtitle.textContent = "All registered users";
  searchInput.value = "";
  cityInput.value = "";
});

/* ====== FIND OLDEST USER ======= */

function findOldestUser() {
  if (users.length === 0) {
    oldestUser.textContent = "—";
    oldestAge.textContent = "No users";
    return;
  }

  const oldest = users.reduce(function (oldestUser, currentUser) {
    if (currentUser.age > oldestUser.age) {
      return currentUser;
    }
    return oldestUser;
  });

  oldestUser.textContent = oldest.name;
  oldestAge.textContent = `${oldest.age} years old`;
}

/* ===== CALCULATE AVERAGE AGE ======== */

function calculateAverageAge() {
  if (users.length === 0) {
    averageAge.textContent = "—";
    return;
  }

  const totalAge = users.reduce(function (sum, user) {
    return sum + user.age;
  }, 0);
  const average = totalAge / users.length;
  averageAge.textContent = `${average.toFixed(1)} years`;
}

/* ==== UPDATE USER ======== */

updateUserForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const id = Number(updateId.value);
  const user = users.find((user) => user.id === id);
  if (!user) {
    showMessage(updateMessage, "User not found.", "error");
    return;
  }

  /*
        We use the SPREAD OPERATOR here.

        Instead of manually creating a new object:

        {
            id: user.id,
            name: newName,
            age: newAge,
            city: newCity
        }

        We copy the existing user first:

        ...user

        Then we replace the values we want.
    */

  const updatedUser = {
    ...user,

    name: updateName.value.trim() || user.name,
    age: updateAge.value ? Number(updateAge.value) : user.age,
    city: updateCity.value.trim() || user.city,
  };

  users = users.map(function (currentUser) {
    if (currentUser.id === id) {
      return updatedUser;
    }
    return currentUser;
  });

  displayUsers();
  updateUserCount();
  calculateAverageAge();
  findOldestUser();
  showMessage(
    updateMessage,
    `${updatedUser.name} was updated successfully.`,
    "success",
  );

  updateUserForm.reset();
});

/* ===== SHOW MESSAGE  ======= */

function showMessage(element, text, type) {
  element.textContent = text;
  if (type === "success") {
    element.style.color = "#238b57";
  } else {
    element.style.color = "#d94c4c";
  }
}

/* ==== INITIAL DISPLAY ===== */

displayUsers();
updateUserCount();
findOldestUser(); 
calculateAverageAge();
