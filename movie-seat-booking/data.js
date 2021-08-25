class MovieOnTheaters {
  constructor(id, title, showtimes) {
    this.id = id;
    this.title = title;
    this.showtimes = showtimes;
  }
  get getterTimes() {
    return this.showtimes;
  }
}

let elOlvidoQueSeremos = new MovieOnTheaters(1, "el olvido que seremos", {
  theater: "Casablanca Theater",
  times: ["5:30", "7:20", "10:00"],
});
let anotherRound = new MovieOnTheaters(2, "another round", {
  theater: "Gran Sala",
  times: ["5:40", "8:50", "11:30"],
});
let batman = new MovieOnTheaters(3, "Batman", {
  theater: "La Jolla",
  times: ["4:00", "6:10"],
});
let portraitOfALady = new MovieOnTheaters(4, "portrait of a lady on fire", {
  theater: "Casablanca Theater",
  times: ["3:00", "6:10", "8:00"],
});
let legoMovie = new MovieOnTheaters(5, "the lego movie", {
  theater: "La Jolla",
  times: ["7:00", "9:10", "11:00"],
});

export let moviesNow = [
  elOlvidoQueSeremos,
  anotherRound,
  batman,
  portraitOfALady,
  legoMovie,
];

export let theaters = [
  {
    name: "Gran Sala",
    rows: ["A", "B", "C", "D", "E", "F"],
    lines: 8,
    aisles: [2, 6],
  },
  {
    name: "Casablanca Theater",
    rows: ["A", "B", "C", "D", "E"],
    lines: 6,
    aisles: [1, 5],
  },
  {
    name: "La Jolla",
    rows: ["A", "B", "C", "D", "E", "F", "G"],
    lines: 10,
    aisles: [3, 7],
  },
];
