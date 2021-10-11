const video = document.getElementById("video");
const playBtn = document.getElementById("play");
const stopBtn = document.getElementById("stop");
const progressLine = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

function toggleVideoPlay() {
  if (video.paused) {
    video.play();
    playBtn.innerHTML = `<i class="fa fa-pause fa-2x"></i>`;
  } else {
    video.pause();
    playBtn.innerHTML = `<i class="fa fa-play fa-2x"></i>`;
  }
}

function stopVideo() {
  video.pause();
  video.currentTime = 0;
}

function updateVideoTime() {
  progressLine.value = (video.currentTime / video.duration) * 100;

  let min = Math.floor(video.currentTime / 60);
  if (min < 10) {
    min = "0" + min.toString();
  }

  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${min}:${secs}`;
}

function setVideoTime() {
  video.currentTime = (progressLine.value * video.duration) / 100;
}

video.addEventListener("click", toggleVideoPlay);
video.addEventListener("timeupdate", updateVideoTime);
playBtn.addEventListener("click", toggleVideoPlay);
stopBtn.addEventListener("click", stopVideo);
progressLine.addEventListener("change", setVideoTime);

let previousVol = 1;
document.addEventListener("keydown", function (e) {
  if (e.key === " ") {
    toggleVideoPlay();
  }

  if (e.key === "ArrowRight") {
    video.currentTime += 5;
  }
  if (e.key === "ArrowLeft") {
    video.currentTime -= 5;
  }
  if (e.key === "l") {
    video.currentTime += 10;
  }
  if (e.key === "j") {
    video.currentTime -= 10;
  }
  if (e.key === "ArrowUp" && video.volume <= 0.8) {
    video.volume += 0.2;
  }
  if (e.key === "ArrowDown" && video.volume >= 0.2) {
    video.volume = (video.volume * 10 - 2) / 10;
  }
  if (e.key === "m" && video.volume === 0) {
    video.volume = previousVol;
  } else if (e.key === "m" && video.volume !== 0) {
    previousVol = video.volume;
    video.volume = 0;
  }
});
