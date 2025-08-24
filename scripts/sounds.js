const clickAudio = new Audio("./assets/sound/button.wav");
const ambientAudio = new Audio("./assets/sound/01 - Wilderness.mp3");

document.addEventListener("DOMContentLoaded", soundsInit);

let isPlaying = true;

function soundsInit() {
  // Click button sound
  clickAudio.volume = 0.4;
  document.querySelectorAll("button").forEach((e) =>
    e.addEventListener("click", () => {
      clickAudio.currentTime = 0;
      clickAudio.play();
    })
  );

  // Ambient
  ambientAudio.volume = 0.2;

  isPlaying = !(window.localStorage.getItem(IS_MUSIC_PLAYING_KEY) === "false");

  const loginToggleMusicButton = document.querySelector(
    "#login-toggle-music-button"
  );
  const toggleMusicButton = document.querySelector("#toggle-music-button");
  loginToggleMusicButton.addEventListener("click", () => toggleAmbient());
  toggleMusicButton.addEventListener("click", () => toggleAmbient());

  ambientAudio.addEventListener("canplaythrough", () => autoPlayAmbient());
}

function toggleAmbient(e) {
  console.log(e);
  const loginToggleMusicButton = document.querySelector(
    "#login-toggle-music-button"
  );
  const toggleMusicButton = document.querySelector("#toggle-music-button");
  if (isPlaying) {
    ambientAudio.pause();
    window.localStorage.setItem(IS_MUSIC_PLAYING_KEY, false);
    loginToggleMusicButton.classList.remove("stop-music-button");
    toggleMusicButton.classList.remove("stop-music-button");
    loginToggleMusicButton.classList.add("play-music-button");
    toggleMusicButton.classList.add("play-music-button");
  } else {
    ambientAudio.play();
    window.localStorage.setItem(IS_MUSIC_PLAYING_KEY, true);
    loginToggleMusicButton.classList.remove("play-music-button");
    toggleMusicButton.classList.remove("play-music-button");
    loginToggleMusicButton.classList.add("stop-music-button");
    toggleMusicButton.classList.add("stop-music-button");
  }
  isPlaying = !isPlaying;
}

function autoPlayAmbient() {
  const loginToggleMusicButton = document.querySelector(
    "#login-toggle-music-button"
  );
  const toggleMusicButton = document.querySelector("#toggle-music-button");
  ambientAudio.play().catch((e) => {
    window.addEventListener(
      "click",
      () => {
        if (isPlaying) {
          ambientAudio.play();
          loginToggleMusicButton.classList.remove("play-music-button");
          toggleMusicButton.classList.remove("play-music-button");
          loginToggleMusicButton.classList.add("stop-music-button");
          toggleMusicButton.classList.add("stop-music-button");
        }
      },
      { once: true }
    );
  });
}

const HIT_SOUND = "HIT_SOUND";
const BLOCK_SOUND = "BLOCK_SOUND";

function playSound(type) {
  let srcToPlay = "";

  if (type === HIT_SOUND) {
    const i = Math.round(Math.random() * (HIT_SOUNDS.length - 1));
    srcToPlay = HIT_SOUNDS[i];
  } else if (type === BLOCK_SOUND) {
    const i = Math.round(Math.random() * (BLOCK_SOUNDS.length - 1));
    srcToPlay = BLOCK_SOUNDS[i];
  } else return;

  const audio = new Audio(srcToPlay);
  audio.volume = 0.4;
  audio.addEventListener("ended", () => {
    audio.remove();
  });
  audio.play();
}
