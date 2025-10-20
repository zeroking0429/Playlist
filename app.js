const songsList = [
  {
    name: "Toxic",
    artist: "BoyWithUke",
    src: "assets/1.mp3",
    cover: "assets/1.png",
  },
  {
    name: "Overdose",
    artist: "Natory",
    src: "assets/2.mp3",
    cover: "assets/2.png",
  },
  {
    name: "Bansanka",
    artist: "tuki.",
    src: "assets/3.mp3",
    cover: "assets/3.png",
  },
  {
    name: "Dance With Silence",
    artist: "Camellia",
    src: "assets/4.mp3",
    cover: "assets/4.png",
  },
];

const artist_name = document.querySelector(".artist_name");
const music_name = document.querySelector(".song_name");
const fill_bar = document.querySelector(".fill_bar");
const time = document.querySelector(".time");
const cover = document.querySelector("#cover");
const play_btn = document.querySelector("#play");
const prev_btn = document.querySelector("#prev");
const next_btn = document.querySelector("#next");
const prog = document.querySelector(".progress_bar");
const body = document.body;

let song = new Audio();
let current_song = 0;
let playing = false;

document.addEventListener("DOMContentLoaded", () => {
  loadSong(current_song);
  song.addEventListener("timeupdate", updateProgress);
  song.addEventListener("ended", nextSong);
  prev_btn.addEventListener("click", prevSong);
  next_btn.addEventListener("click", nextSong);
  play_btn.addEventListener("click", togglePlayPuase);
  prog.addEventListener("click", seek);
});

function loadSong(index) {
  const { name, artist, src, cover: thumb } = songsList[index];
  artist_name.innerHTML = artist;
  music_name.innerHTML = name;
  song.src = src;
  cover.style.backgroundImage = `url(${thumb})`;
  body.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
  if (song.duration) {
    const pos = (song.currentTime / song.duration) * 100;
    fill_bar.style.width = `${pos}%`;

    const duration = formatTime(song.duration);
    const currentTime = formatTime(song.currentTime);
    time.innerHTML = `${currentTime} - ${duration}`;
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

function togglePlayPuase() {
  if (playing) {
    song.pause();
  } else {
    song.play();
  }
  playing = !playing;
  play_btn.classList.toggle("fa-pause", playing);
  play_btn.classList.toggle("fa-play", !playing);
  cover.classList.toggle("active", playing);
}

function nextSong() {
  current_song = (current_song + 1) % songsList.length;
  playMusic();
}

function prevSong() {
  current_song = (current_song - 1 + songsList.length) % songsList.length;
  playMusic();
  playMusic();
}

function playMusic() {
  loadSong(current_song);
  song.play();
  playing = true;
  play_btn.classList.add("fa-pause");
  play_btn.classList.remove("fa-play");
  cover.classList.add("active");
}

function seek(e) {
  const pos = (e.offsetX / prog.clientWidth) * song.duration;
  song.currentTime = pos;
}
