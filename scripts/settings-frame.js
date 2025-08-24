document.addEventListener("DOMContentLoaded", settingsInit);

function settingsInit() {
  // Edit name button
  const nameSettingEditButton = document.querySelector(
    "#name-setting-edit-button"
  );
  nameSettingEditButton.addEventListener("click", () => editName());

  // Change name button
  const nameSettingChangeButton = document.querySelector(
    "#name-setting-change-button"
  );
  nameSettingChangeButton.addEventListener("click", () => changeName());

  // Cancel name edit button
  const nameSettingCancelButton = document.querySelector(
    "#name-setting-cancel-button"
  );
  nameSettingCancelButton.addEventListener("click", () => cancelEditName());

  // On new name enter event
  const nameSettingEditInput = document.querySelector(
    "#name-setting-edit-input"
  );
  nameSettingEditInput.addEventListener("input", setEditButtonAvailiability);
}

function editName() {
  const nameSettingEditInput = document.querySelector(
    "#name-setting-edit-input"
  );
  const name = window.localStorage.getItem(PLAYER_NAME_KEY);
  nameSettingEditInput.value = name;
  nameSettingEditInput.dispatchEvent(new Event("input"));

  const settingBox = document.querySelector(".setting-box");
  settingBox.classList.add("edit-mode");
}

function changeName() {
  const nameSettingEditInput = document.querySelector(
    "#name-setting-edit-input"
  );
  const newName = nameSettingEditInput.value;
  window.localStorage.setItem(PLAYER_NAME_KEY, newName);

  const settingBox = document.querySelector(".setting-box");
  settingBox.classList.remove("edit-mode");

  loadPlayerData();
}

function cancelEditName() {
  const settingBox = document.querySelector(".setting-box");
  settingBox.classList.remove("edit-mode");
}

function setEditButtonAvailiability(e) {
  const newNameLength = e.target.value.length;

  const nameSettingChangeButton = document.querySelector(
    "#name-setting-change-button"
  );

  if (newNameLength > 0) {
    nameSettingChangeButton.disabled = false;
  } else {
    nameSettingChangeButton.disabled = true;
  }
}
