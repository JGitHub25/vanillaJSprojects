const mainElem = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const showMillionairesBtn = document.getElementById("show-millionaires");
const doubleBtn = document.getElementById("double");
const sortBtn = document.getElementById("sort");
const totalWealthBtn = document.getElementById("calculate-wealth");

let users = [];

function renderUsers() {
  mainElem.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  users.forEach((item) => {
    const formattedNumber = item.wealth
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");

    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>$${formattedNumber}`;
    mainElem.append(element);
  });
}

//Event handlers.
async function getUser() {
  try {
    const response = await fetch("https://randomuser.me/api");

    if (response.ok) {
      const data = await response.json();
      const user = data.results[0];
      const filteredUser = {
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        wealth: Math.floor(Math.random() * 1000000),
      };

      users.push(filteredUser);

      renderUsers();
      return users;
    }

    throw new Error("Request failed to fetch the user.");
  } catch (error) {
    console.log(error);
  }
}

function doubleMoney() {
  users.forEach((item) => {
    item.wealth = item.wealth * 2;
  });
  renderUsers();
}

function sortUsers() {
  users.sort((a, b) => {
    return b.wealth - a.wealth;
  });
  renderUsers();
}

function showMillionaires() {
  users = users.filter((item) => item.wealth > 1000000);
  renderUsers();
}

//DOM Content Loaded.
document.addEventListener("DOMContentLoaded", () => {
  getUser();
  getUser();
  getUser();
  renderUsers();
  console.log(`The users are:`, users);
});

//Event listeners.
addUserBtn.addEventListener("click", () => {
  getUser();
  console.log(`The users are:`, users);
});

doubleBtn.addEventListener("click", () => {
  doubleMoney();
  console.log(`The users are:`, users);
});

sortBtn.addEventListener("click", () => {
  sortUsers();
  console.log(`The users are:`, users);
});

showMillionairesBtn.addEventListener("click", () => {
  showMillionaires();
  console.log(`The users are:`, users);
});
