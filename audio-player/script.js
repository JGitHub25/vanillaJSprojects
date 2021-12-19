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

const setPrevSong = () => {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }

  loadSong(songs[songIndex]);

  if (musicContainer.classList.contains("play")) {
    playSong();
  }
};

nextBtn.addEventListener("click", setNextSong);

prevBtn.addEventListener("click", setPrevSong);

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

let previousVol = 1;
document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case " ":
      if (musicContainer.classList.contains("play")) {
        e.preventDefault();
        pauseSong();
      } else {
        e.preventDefault();
        playSong();
      }
      break;
    case "m":
      if (audioElement.volume === 0) {
        audioElement.volume = previousVol;
      } else {
        previousVol = audioElement.volume;
        audioElement.volume = 0;
      }
      break;
    case "ArrowRight":
      if (e.shiftKey) {
        setNextSong();
      } else {
        audioElement.currentTime += 5;
      }
      break;
    case "ArrowLeft":
      if (e.shiftKey) {
        setPrevSong();
      } else {
        audioElement.currentTime -= 5;
      }
      break;
    case "ArrowUp":
      if (audioElement.volume <= 0.8) {
        audioElement.volume += 0.2;
      }
      break;
    case "ArrowDown":
      if (audioElement.volume >= 0.2) {
        audioElement.volume = (audioElement.volume * 10 - 2) / 10;
      }
      break;
    case "l":
      audioElement.currentTime += 10;
      break;
    case "j":
      audioElement.currentTime -= 10;
      break;
  }
});
