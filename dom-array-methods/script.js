const mainElem = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const showMillionairesBtn = document.getElementById("show-millionaires");
const doubleBtn = document.getElementById("double");
const sortBtn = document.getElementById("sort");
const totalWealthBtn = document.getElementById("calculate-wealth");

let users = [];

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
      filteredUser.wealth = filteredUser.wealth
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      users.push(filteredUser);
      return users;
    }

    throw new Error("Request failed to fetch the user.");
  } catch (error) {
    console.log(error);
  }
}

async function renderUser() {
  const data = await getUser();
  mainElem.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  data.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>$${item.wealth}`;
    mainElem.append(element);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getUser();
  getUser();
  renderUser();
  console.log(`The users are:`, users);
});
addUserBtn.addEventListener("click", () => {
  renderUser();
  console.log(`The users are:`, users);
});
