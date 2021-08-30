import { moviesNow } from "./data.js";
import { theaters } from "./data.js";

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
function getMovie(moviesArray) {
  let currentMovieName = movie.value;
  let currentMovieObject = moviesArray.find((givenMovie) => {
    return givenMovie.title === currentMovieName;
  });
  return currentMovieObject;
}

export function renderTimes(moviesArray) {
  let currentMovieObject = getMovie(moviesArray);
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
    for (let i = 1; i <= theaterLines; i++) {
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
}

export function renderTheater(moviesArray) {
  //Find theater.
  let currentMovieObject = getMovie(moviesArray);
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
  if (e.currentTarget.classList.contains("available")) {
    e.currentTarget.classList.remove("available");
    e.currentTarget.classList.add("selected");
  } else if (e.currentTarget.classList.contains("selected")) {
    e.currentTarget.classList.add("available");
    e.currentTarget.classList.remove("selected");
  }
  renderTicketsTotal();

  let selectedSeats = JSON.parse(localStorage.getItem("Selected seats"));
  if (selectedSeats.includes(e.currentTarget.dataset.seatcode)) {
    selectedSeats = selectedSeats.filter((item) => {
      return item !== e.currentTarget.dataset.seatcode;
    });
  } else {
    selectedSeats.push(e.currentTarget.dataset.seatcode);
  }
  localStorage.setItem("Selected seats", JSON.stringify(selectedSeats));
}

//##Render page on load.
function renderOnLoad(moviesArray) {
  setInitialStorage();

  renderMovies(moviesArray);
  movie.options.selectedIndex = localStorage.getItem("Movie index");

  renderTimes(moviesArray);
  time.options.selectedIndex = localStorage.getItem("Time index");

  ticket.options.selectedIndex = localStorage.getItem("Ticket index");

  renderTheater(moviesArray);

  document.querySelectorAll(".seat").forEach((seat) => {
    seat.addEventListener("click", selectSeat);
  });

  let selectedSeatsStorage = JSON.parse(localStorage.getItem("Selected seats"));
  document.querySelectorAll(".seat").forEach((seat) => {
    if (selectedSeatsStorage.includes(seat.dataset.seatcode)) {
      seat.classList.add("selected");
      seat.classList.remove("available");
    }
  });
  console.log("Rendered!");
}

document.addEventListener("DOMContentLoaded", () => {
  renderOnLoad(moviesNow);
  renderTicketsTotal();
});

//#=======================CHECK AND SET SESSION INFO===================
function setInitialStorage() {
  if (localStorage.length === 0) {
    localStorage.setItem("Movie index", 0);
    localStorage.setItem("Time index", 0);
    localStorage.setItem("Ticket index", 0);
    localStorage.setItem("Selected seats", JSON.stringify([]));
  }
}
