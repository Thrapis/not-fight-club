const PLAYER_NAME_KEY = "PLAYER_NAME";
const WINS_COUNT_KEY = "WINS_COUNT";
const LOSES_COUNT_KEY = "LOSES_COUNT";

document.addEventListener("DOMContentLoaded", uiInit);

function uiInit() {
  // Enter name UI
  const playerNameInput = document.querySelector("#player-name-input");
  const enterNameSubmitButton = document.querySelector(
    "#enter-name-submit-button"
  );
  enterNameSubmitButton.addEventListener("click", () =>
    submitPlayerName(playerNameInput.value)
  );

  const homeButton = document.querySelector(".top-right-hud .home-button");
  homeButton.addEventListener("click", () => selectFrame("fight"));
  const accountButton = document.querySelector(
    ".top-right-hud .account-button"
  );
  accountButton.addEventListener("click", () => selectFrame("account"));
  const settingsButton = document.querySelector(
    ".top-right-hud .settings-button"
  );
  settingsButton.addEventListener("click", () => selectFrame("settings"));

  loadPlayerData();
}

function submitPlayerName(value) {
  const enterNameWindow = document.querySelector("#enter-name-window");

  window.localStorage.setItem(PLAYER_NAME_KEY, value);
  enterNameWindow.classList.add("hidden");

  loadPlayerData();
}

function loadPlayerData() {
  const playerName = window.localStorage.getItem(PLAYER_NAME_KEY);
  const winsCount = window.localStorage.getItem(WINS_COUNT_KEY);
  const losesCount = window.localStorage.getItem(LOSES_COUNT_KEY);

  if (playerName !== null) {
    const playerNameLabel = document.querySelector("#player-name-label");
    const accountPlayerName = document.querySelector("#account-player-name");
    const nameSettingReadonly = document.querySelector(
      "#name-setting-readonly"
    );
    playerNameLabel.textContent = playerName;
    accountPlayerName.textContent = playerName;
    nameSettingReadonly.textContent = playerName;
    // Hide player name enter window
    const enterNameWindow = document.querySelector("#enter-name-window");
    enterNameWindow.classList.add("hidden");
  }

  const accountWinStatisticsCount = document.querySelector("#account-win-statistics-count");
  accountWinStatisticsCount.textContent = winsCount !== null ? winsCount : 0;

  const accountLoseStatisticsCount = document.querySelector("#account-lose-statistics-count");
  accountLoseStatisticsCount.textContent = losesCount !== null ? losesCount : 0;

}

function selectFrame(frameName) {
  const frames = document.querySelectorAll(".render > section");
  frames.forEach((e) => e.classList.remove("focused"));

  const frameToSelect = document.querySelector(`.${frameName}-frame`);
  frameToSelect.classList.add("focused");

  const gameStateIndicator = document.querySelector('#game-state-indicator');
  gameStateIndicator.textContent = frameName;
}
