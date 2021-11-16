const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const showMillionairesBtn = document.getElementById("show-millionaires");
const doubleBtn = document.getElementById("double");
const sortBtn = document.getElementById("sort");
const totalWealthBtn = document.getElementById("calculate-wealth");

let users = [];

async function getUsers() {
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
      return;
    }

    throw new Error("Request failed to fetch the user.");
  } catch (error) {
    console.log(error);
  }
}

getUsers();
getUsers();
getUsers();

console.log(`The users are:`, users);
