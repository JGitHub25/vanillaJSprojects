const musicContainer = document.getElementById("music-container");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const audioElement = document.getElementById("audio");
let duration;
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");

const title = document.getElementById("title");
const coverImg = document.getElementById("cover");

const songs = ["hey", "summer", "ukulele"];

let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.textContent = song;
  coverImg.src = `./images/${song}.jpg`;
  audioElement.src = `./music/${song}.mp3`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i").className = "fas fa-pause";
  audioElement.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i").className = "fas fa-play";
  audioElement.pause();
}

function setTime(e) {
  const clickX = e.offsetX;
  audioElement.currentTime =
    (clickX / progressContainer.clientWidth) * duration;
}

playBtn.addEventListener("click", () => {
  if (musicContainer.classList.contains("play")) {
    pauseSong();
  } else {
    playSong();
  }
});

const setNextSong = () => {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }

  loadSong(songs[songIndex]);

  if (musicContainer.classList.contains("play")) {
    playSong();
  }
};

nextBtn.addEventListener("click", setNextSong);

prevBtn.addEventListener("click", () => {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }

  loadSong(songs[songIndex]);

  if (musicContainer.classList.contains("play")) {
    playSong();
  }
});

audioElement.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.target;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
});

audioElement.addEventListener("durationchange", () => {
  duration = audioElement.duration;
});

audioElement.addEventListener("ended", () => {
  setNextSong();
  playSong();
});

progressContainer.addEventListener("click", setTime);
