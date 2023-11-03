const audio = document.querySelector(".audio");
const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const img = document.querySelector(".img");
const progressBar = document.querySelector(".progress-bar");
const replayBtn = document.querySelector(".replay");
const prevBtn = document.querySelector(".backward");
const nextBtn = document.querySelector(".forward");
const title = document.querySelector(".title");
const currentTime = document.querySelector(".current-time");
const durationTime = document.querySelector(".duration-time");
const plusBtn = document.querySelector(".plus");
const minusBtn = document.querySelector(".minus");

let currentSong = 0;

const songs = [
  {
    title: "Say I - Creed",
    path: "assets/music/Say I.mp3",
    cover: "assets/img/img1.jpg",
  },
  {
    title: "Kaamos - Apocalyptica",
    path: "assets/music/Kaamos.mp3",
    cover: "assets/img/img2.jpg",
  },
  {
    title: "Merseburger Zauberspruche II - In Extremo",
    path: "assets/music/Merseburger_Zauberspruche_II.mp3",
    cover: "assets/img/img3.jpg",
  },
  {
    title: "Here Is The Rain - Century",
    path: "assets/music/Here Is The Rain.mp3",
    cover: "assets/img/img4.jpg",
  },
  {
    title: "Droppin' Plates - Disturbed",
    path: "assets/music/Droppin' Plates.mp3",
    cover: "assets/img/img5.jpg",
  },
];

const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = Math.floor(time % 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

const setSong = (i) => {
  progressBar.value = 0;
  let song = songs[i];
  currentSong = i;
  audio.src = song.path;
  title.innerHTML = song.title;
  img.src = song.cover;
  currentTime.innerHTML = "00:00";
  audio.addEventListener("loadedmetadata", () => {
    progressBar.max = audio.duration;
    durationTime.innerHTML = formatTime(audio.duration);
  });
};

setSong(0);

const playMusic = () => {
  playBtn.classList.add("fade");
  img.classList.add("img_larger");
  setTimeout(() => {
    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
    pauseBtn.classList.remove("fade");
    pauseBtn.classList.add("show");
  }, 300);
  audio.play();
};

setInterval(() => {
  progressBar.value = audio.currentTime;
  currentTime.innerHTML = formatTime(audio.currentTime);
}, 1000);

playBtn.addEventListener("click", playMusic);

pauseBtn.addEventListener("click", () => {
  pauseBtn.classList.add("fade");
  img.classList.remove("img_larger");
  setTimeout(() => {
    pauseBtn.classList.add("hidden");
    playBtn.classList.remove("hidden");
    playBtn.classList.remove("fade");
    playBtn.classList.add("show");
  }, 300);
  audio.pause();
});

replayBtn.addEventListener("click", () => {
  audio.currentTime = 0;
  playMusic();
});

progressBar.addEventListener("change", () => {
  audio.currentTime = progressBar.value;
  playMusic();
});

nextBtn.addEventListener("click", () => {
  if (currentSong >= songs.length - 1) {
    currentSong = 0;
  } else {
    currentSong++;
  }
  setSong(currentSong);
  playMusic();
});

prevBtn.addEventListener("click", () => {
  if (currentSong <= 0) {
    currentSong = songs.length - 1;
  } else {
    currentSong--;
  }
  setSong(currentSong);
  playMusic();
});

plusBtn.addEventListener("click", () => {
  if (audio.volume < 1) {
    audio.volume += 0.2;
  }
});

minusBtn.addEventListener("click", () => {
  if (audio.volume > 0.2) {
    audio.volume -= 0.2;
  }
});
