import { moviesNow } from "./data.js";
import { movie, time } from "./rendering.js";
import { ticket } from "./rendering.js";
import { renderTimes } from "./rendering.js";
import { renderTheater } from "./rendering.js";
import { renderTicketsTotal } from "./rendering.js";
import { selectSeat } from "./rendering.js";

//FUNCTIONS
function getSelectedSeats() {
  let selectedSeats = [];
  document.querySelectorAll(".seat.selected").forEach((selectedSeat) => {
    selectedSeats.push(selectedSeat.dataset.seatcode);
  });
  localStorage.setItem("Selected seats", JSON.stringify(selectedSeats));
}
//EVENT LISTENERS
ticket.addEventListener("change", () => {
  renderTicketsTotal();
  localStorage.setItem("Ticket index", ticket.options.selectedIndex);
});

//##Render Time selector and Theater on Movie change
movie.addEventListener("change", () => {
  renderTimes(moviesNow);
  renderTheater(moviesNow);
  renderTicketsTotal();

  document.querySelectorAll(".seat").forEach((seat) => {
    seat.addEventListener("click", selectSeat);
  });
  localStorage.setItem("Movie index", movie.options.selectedIndex);
  localStorage.setItem("Time index", time.options.selectedIndex);
  localStorage.setItem("Selected seats", JSON.stringify([]));
});

time.addEventListener("change", () => {
  localStorage.setItem("Time index", time.options.selectedIndex);
});
