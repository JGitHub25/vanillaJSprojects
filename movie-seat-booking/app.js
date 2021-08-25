import { moviesNow } from "./data.js";
import { movie } from "./rendering.js";
import { ticket } from "./rendering.js";
import { renderTimes } from "./rendering.js";
import { renderTheater } from "./rendering.js";
import { renderTicketsTotal } from "./rendering.js";

//FUNCTIONS

//EVENT LISTENERS
ticket.addEventListener("change", renderTicketsTotal);

//##Render Time selector and Theater on Movie change
movie.addEventListener("change", () => {
  renderTimes(moviesNow);
  renderTheater(moviesNow);
});
