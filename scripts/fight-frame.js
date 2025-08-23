const WIN_RESULT = "WIN_RESULT";
const LOSE_RESULT = "LOSE_RESULT";

const CRIT_MULTI = 1.5;

let CurrentEnemy = null;
let EnemyHealth = 0;
let PlayerHealth = 0;

document.addEventListener("DOMContentLoaded", fightInit);

function fightInit() {
  // Fight initiation button
  const fightInitiationButton = document.querySelector(
    "#fight-initiation-button"
  );
  fightInitiationButton.addEventListener("click", () => startFight());

  // Action set form change
  const actionSetForm = document.querySelector("#duel-action-control-box");
  actionSetForm.addEventListener("change", () => actionSetChange());
  actionSetForm.dispatchEvent(new Event("change"));

  // Action set apply
  const actionSubmitButton = document.querySelector(
    "#duel-action-submit-button"
  );
  actionSubmitButton.addEventListener("click", () =>
    proceedFightState(new FormData(actionSetForm))
  );

  // Init attack and defence directions
  const duelActionAttack = document.querySelector("#duel-action-attack");
  for (let i = 0; i < ATTACK_DIRECTIONS.length; i += 1) {
    const label = document.createElement("label");
    const span = document.createElement("span");
    span.textContent = ATTACK_DIRECTIONS[i].name;
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "attack");
    input.setAttribute("value", ATTACK_DIRECTIONS[i].code);
    label.appendChild(span);
    label.appendChild(input);
    duelActionAttack.appendChild(label);
  }
  const duelDefenceAttack = document.querySelector("#duel-action-defence");
  for (let i = 0; i < DEFENCE_DIRECTIONS.length; i += 1) {
    const label = document.createElement("label");
    const span = document.createElement("span");
    span.textContent = DEFENCE_DIRECTIONS[i].name;
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "defence");
    input.setAttribute("value", DEFENCE_DIRECTIONS[i].code);
    label.appendChild(input);
    label.appendChild(span);
    duelDefenceAttack.appendChild(label);
  }

  const isFighting = window.localStorage.getItem(IS_FIGHTING_KEY);
  if (isFighting !== null && isFighting === "true") {
    restoreFight();
  }
}

function saveFightState() {
  const actionSetForm = document.querySelector("#duel-action-control-box");
  const actionSet = new FormData(actionSetForm);
  window.localStorage.setItem(
    FIGHT_STATE_KEY,
    JSON.stringify({
      playerHealth: PlayerHealth,
      currentEnemy: CurrentEnemy,
      enemyHealth: EnemyHealth,
      actionSet: {
        attack: actionSet.getAll("attack"),
        defence: actionSet.getAll("defence"),
      },
    })
  );
}

function restoreFight() {
  const fightStateJson = window.localStorage.getItem(FIGHT_STATE_KEY);
  const fightState = JSON.parse(fightStateJson);

  PlayerHealth = fightState.playerHealth;
  CurrentEnemy = fightState.currentEnemy;
  EnemyHealth = fightState.enemyHealth;
  [...fightState.actionSet.attack, ...fightState.actionSet.defence].forEach(
    (n) => {
      const checkbox = document.querySelector(`input[value='${n}']`);
      checkbox.checked = true;
    }
  );

  const actionSetForm = document.querySelector("#duel-action-control-box");
  actionSetForm.dispatchEvent(new Event("change"));

  // Load history log
  const historyLogs = window.localStorage.getItem(HISTORY_LOG_KEY);
  if (historyLogs !== null) {
    const historyLogBox = document.querySelector("#history-log");
    historyLogBox.innerHTML = historyLogs;
    historyLogBox.scrollTop = historyLogBox.scrollHeight;
  }

  const fightFrame = document.querySelector(".fight-frame");
  fightFrame.classList.add("fight-started");

  proceedFightState();
}

function startFight() {
  const sumWeight = ENEMY_LIST.map((e) => e.weight).reduce((a, b) => a + b);

  let selectedWeight = Math.round(Math.random() * sumWeight);
  for (let i = 0; i < ENEMY_LIST.length; i += 1) {
    if (selectedWeight > ENEMY_LIST[i].weight) {
      selectedWeight -= ENEMY_LIST[i].weight;
    } else {
      CurrentEnemy = ENEMY_LIST[i];
      break;
    }
  }

  EnemyHealth = CurrentEnemy.maxHealth;
  PlayerHealth = PLAYER_CHARS.maxHealth;

  window.localStorage.setItem(IS_FIGHTING_KEY, true);

  saveFightState();

  const fightFrame = document.querySelector(".fight-frame");
  fightFrame.classList.add("fight-started");

  proceedFightState();
}

function stopFight(result) {
  const fightInitiationMessage = document.querySelector(
    "#fight-initiation-message"
  );
  fightInitiationMessage.classList.remove("win", "lose");

  if (result === WIN_RESULT) {
    // If win
    let winsCount = window.localStorage.getItem(WINS_COUNT_KEY);
    winsCount = winsCount === null ? 1 : parseInt(winsCount) + 1;
    window.localStorage.setItem(WINS_COUNT_KEY, winsCount);

    fightInitiationMessage.textContent = "YOU WON!";
    fightInitiationMessage.classList.add("win");
  } else if (result === LOSE_RESULT) {
    // If lose
    let losesCount = window.localStorage.getItem(LOSES_COUNT_KEY);
    losesCount = losesCount === null ? 1 : parseInt(losesCount) + 1;
    window.localStorage.setItem(LOSES_COUNT_KEY, losesCount);

    fightInitiationMessage.textContent = "YOU HAVE BEEN DEFEATED!";
    fightInitiationMessage.classList.add("lose");
  }

  window.localStorage.setItem(HISTORY_LOG_KEY, "");
  window.localStorage.setItem(IS_FIGHTING_KEY, false);

  const fightFrame = document.querySelector(".fight-frame");
  fightFrame.classList.remove("fight-started");

  const historyLogBox = document.querySelector("#history-log");
  historyLogBox.innerHTML = "";

  loadPlayerData();
}

function proceedFightState(actionSet) {
  if (actionSet) {
    playAction(actionSet);
  } else {
    const enemyNameHud = document.querySelector("#duel-enemy-name");
    const enemyPortraitHud = document.querySelector("#duel-enemy-portrait");
    enemyNameHud.textContent = CurrentEnemy.name;
    enemyPortraitHud.src = CurrentEnemy.img;
  }

  const playerHealthHud = document.querySelector("#duel-player-health");
  const enemyHealthHud = document.querySelector("#duel-enemy-health");

  playerHealthHud.style.setProperty("--health", PlayerHealth);
  playerHealthHud.style.setProperty("--max-health", PLAYER_CHARS.maxHealth);

  enemyHealthHud.style.setProperty("--health", EnemyHealth);
  enemyHealthHud.style.setProperty("--max-health", CurrentEnemy.maxHealth);
}

function actionSetChange() {
  const actionSetForm = document.querySelector("#duel-action-control-box");
  const actionSubmitButton = document.querySelector(
    "#duel-action-submit-button"
  );

  const actionSet = new FormData(actionSetForm);
  if (
    actionSet.getAll("attack").length !== 1 ||
    actionSet.getAll("defence").length !== 2
  ) {
    actionSubmitButton.disabled = true;
  } else {
    actionSubmitButton.disabled = false;
  }
}

function playAction(actionSet) {
  // Get player action set
  const playerAttack = actionSet
    .getAll("attack")
    .map((e) => ATTACK_DIRECTIONS.find((a) => e === a.code).name);
  const playerDefence = actionSet
    .getAll("defence")
    .map((e) => DEFENCE_DIRECTIONS.find((a) => e === a.code).name);

  // Get enemy action set
  const enemyAttack = getNRandomOf(
    CurrentEnemy.attackCount,
    ATTACK_DIRECTIONS
  ).map((e) => e.name);
  const enemyDefence = getNRandomOf(
    CurrentEnemy.defenceCount,
    DEFENCE_DIRECTIONS
  ).map((e) => e.name);

  // Get player name
  const playerName = window.localStorage.getItem(PLAYER_NAME_KEY);

  // Player is attacking
  const playerAttackMetaList = tryAttacks(
    playerAttack,
    enemyDefence,
    PLAYER_CHARS.damage,
    PLAYER_CHARS.criticalChance
  );

  for (const attackMeta of playerAttackMetaList) {
    EnemyHealth -= attackMeta.damage;
    if (EnemyHealth <= 0) {
      stopFight(WIN_RESULT);
      return;
    }
    logAction(
      attackMeta.isHit,
      attackMeta.isCrit,
      playerName,
      CurrentEnemy.name,
      attackMeta.part,
      attackMeta.damage
    );
  }

  // Enemy is attacking
  const enemyAttackMetaList = tryAttacks(
    enemyAttack,
    playerDefence,
    CurrentEnemy.damage,
    CurrentEnemy.criticalChance
  );

  for (const attackMeta of enemyAttackMetaList) {
    PlayerHealth -= attackMeta.damage;
    if (PlayerHealth <= 0) {
      stopFight(LOSE_RESULT);
      return;
    }
    logAction(
      attackMeta.isHit,
      attackMeta.isCrit,
      CurrentEnemy.name,
      playerName,
      attackMeta.part,
      attackMeta.damage
    );
  }

  saveFightState();
}

function getNRandomOf(n, array) {
  const result = [];
  while (result.length < n) {
    const index = Math.round(Math.random() * (array.length - 1));
    if (result.findIndex((e) => e === array[index]) === -1) {
      result.push(array[index]);
    }
  }
  return result;
}

function tryAttacks(attacks, enemyDefences, charDamage, criticalChance) {
  const attackMetaList = [];

  for (let i = 0; i < attacks.length; i++) {
    const isHit = enemyDefences.findIndex((e) => e === attacks[i]) === -1;
    const isCrit = Math.random() * 100 <= criticalChance;
    const damage = Math.round(
      (isHit || isCrit ? charDamage : 0) * (isCrit ? CRIT_MULTI : 1)
    );
    attackMetaList.push({
      isHit: isHit,
      isCrit: isCrit,
      part: attacks[i],
      damage: damage,
    });
  }

  return attackMetaList;
}

function logAction(isHit, isCrit, who, toWho, part, damage) {
  // Init base tags
  const logSpan = document.createElement("span");

  const subjectName = document.createElement("b");
  subjectName.textContent = who;

  const objectName = document.createElement("b");
  objectName.textContent = toWho;

  const partName = document.createElement("y");
  partName.textContent = part;

  // Filling log message
  logSpan.appendChild(subjectName);
  logSpan.innerHTML += " attacked ";
  logSpan.appendChild(objectName);
  logSpan.innerHTML += " to ";
  logSpan.appendChild(partName);
  if (isHit) {
    let damageText;
    if (isCrit) {
      logSpan.innerHTML += " and crit ";
      damageText = document.createElement("r");
    } else {
      logSpan.innerHTML += " and deal ";
      damageText = document.createElement("d");
    }
    damageText.textContent = `${damage} damage`;
    logSpan.appendChild(damageText);
  } else if (isCrit) {
    damageText = document.createElement("r");
    damageText.textContent = `${damage} damage`;

    logSpan.innerHTML += " and ";
    logSpan.appendChild(objectName.cloneNode(true));
    logSpan.innerHTML += " tried to block but ";
    logSpan.appendChild(subjectName.cloneNode(true));
    logSpan.innerHTML += " was very lucky and crit his opponent for ";
    logSpan.appendChild(damageText);
  } else {
    logSpan.innerHTML += " but ";
    logSpan.appendChild(objectName.cloneNode(true));
    logSpan.innerHTML += " was able to protect his (her) ";
    logSpan.appendChild(partName.cloneNode(true));
  }
  logSpan.innerHTML += ".";

  // Save log to storage
  const logText = logSpan.outerHTML;
  let historyLogs = window.localStorage.getItem(HISTORY_LOG_KEY);
  historyLogs = historyLogs === null ? logText : `${historyLogs}${logText}`;
  window.localStorage.setItem(HISTORY_LOG_KEY, historyLogs);

  // Append log to display box
  const historyLogBox = document.querySelector("#history-log");
  historyLogBox.appendChild(logSpan);
  historyLogBox.scrollTop = historyLogBox.scrollHeight;
}
