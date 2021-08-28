import { moviesNow } from "./data.js";
import { theaters } from "./data.js";

//#=======================CHECK AND SET SESSION INFO===================

// TODO Aquí voy: decidí qué depende de qué: primero se renderiza la página y después pongo los valores de acuerdo
// al localStorage (no renderizo de acuerdo al localStorage).
function checkPreviousStorage() {
  if (localStorage.getItem("sessionStored")) {
    userSessionInfo = JSON.parse(localStorage.getItem("userSessionInfo"));
    setUserInfo(userSessionInfo);
  }
}

function setUserInfo(info) {}

let userSessionInfo = {};

userSessionInfo = {
  sessionStored: true,
  movie: "aquaman",
  time: "10:12",
  ticket: "$89",
  selectedSeats: ["A5", "B9"],
};
const {
  movie: movieTitle,
  time: movieTime,
  ticket: ticketPrice,
  selectedSeats,
} = userSessionInfo;
console.log(movieTitle);
console.log(movieTime);
console.log(ticketPrice);

// localStorage.setItem("movieTitle", movieTitle);
// localStorage.setItem("movieTime", movieTime);
// localStorage.setItem("ticketPrice", ticketPrice);
// localStorage.setItem("userSessionInfo", JSON.stringify(userSessionInfo));
//#=======================SELECT EXISTING ELEMENTS===================
export const movie = document.getElementById("movie-selector");
export const time = document.getElementById("time-selector");
export const ticket = document.getElementById("ticket-selector");
const theaterName = document.getElementById("theater-name");
const theaterSeats = document.getElementById("theater");
let ticketsQty = document.getElementById("seats-quantity");
let totalPrice = document.getElementById("seats-price");

// #=======================RENDER===================
//##Render Movie selector
function renderMovies(moviesArray) {
  let titlesSelect = moviesArray.map((everyMovie) => {
    return `<option id="movie${everyMovie.id}" value="${everyMovie.title}">${everyMovie.title}</option>`;
  });
  movie.innerHTML = titlesSelect;
}
//##Render Time selector
export function renderTimes(moviesArray) {
  let currentMovieName = movie.value;
  let currentMovieObject = moviesArray.find((givenMovie) => {
    return givenMovie.title === currentMovieName;
  });
  let currentMovieTimesArr = currentMovieObject.showtimes.times;
  let currentMovieTimes = currentMovieTimesArr.map((everyTime) => {
    return `<option value="${everyTime}">${everyTime}</option>`;
  });
  time.innerHTML = currentMovieTimes;
}

//##Render Theater (name and seats)
function renderTheaterseats(theaterNameObject) {
  let theaterRows = theaterNameObject.rows;
  let theaterLines = theaterNameObject.lines;

  function createLines(row) {
    let linesEachRow = "";
    for (let i = 0; i < theaterLines; i++) {
      linesEachRow += `<div class="seat available" data-seatCode="${row}${i}"></div>`;
    }

    return linesEachRow;
  }

  let theaterElements = theaterRows.map((everyRow) => {
    return `<div class="row" id="row${everyRow}">
              ${createLines(everyRow)}
           </div>`;
  });

  theaterSeats.innerHTML = theaterElements.join("");
  console.log(theaterRows);
  console.log(theaterLines);
}

export function renderTheater(moviesArray) {
  //Find theater.
  let currentMovieName = movie.value;
  let currentMovieObject = moviesArray.find((givenMovie) => {
    return givenMovie.title === currentMovieName;
  });
  //Render name.
  theaterName.innerHTML = currentMovieObject.showtimes.theater;
  let currentTheater = theaters.find((givenTheater) => {
    return givenTheater.name === currentMovieObject.showtimes.theater;
  });
  //Render seats.
  renderTheaterseats(currentTheater);
}

//### Render total.
export function renderTicketsTotal() {
  let qty = document.querySelectorAll(".seat.selected").length;
  let price = qty * +ticket.value;

  ticketsQty.innerText = qty;
  totalPrice.innerText = price;
}
//### Select seat on click.
export function selectSeat(e) {
  if (
    e.currentTarget.classList.contains("available") ||
    e.currentTarget.classList.contains("selected")
  ) {
    e.currentTarget.classList.toggle("selected");
    e.currentTarget.classList.toggle("available");
  }

  renderTicketsTotal();
}

//##Render page on load.
function renderOnLoad(moviesArray) {
  renderMovies(moviesArray);
  renderTimes(moviesArray);
  renderTheater(moviesArray);
  renderTicketsTotal();
  console.log("Rendered!");
}

document.addEventListener("DOMContentLoaded", () => {
  renderOnLoad(moviesNow);
  document.querySelectorAll(".seat").forEach((seat) => {
    seat.addEventListener("click", selectSeat);
  });
});

//
// console.log(JSON.parse(localStorage.getItem("userSessionInfo")).movie);
