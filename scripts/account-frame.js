document.addEventListener("DOMContentLoaded", accountInit);

function accountInit() {
  // Load all player images for selection
  const accountImageSelector = document.querySelector(
    "#account-image-selector"
  );
  Array.from(accountImageSelector.children).forEach((e) => e.remove());
  PLAYER_IMAGES.forEach((e) => {
    const selectImageBox = document.createElement("aside");
    selectImageBox.classList.add("select-image-box");

    const selectImage = document.createElement("img");
    selectImage.src = e;

    const selectOverlay = document.createElement("div");
    selectOverlay.classList.add("select-image-overlay");

    const selectButton = document.createElement("button");
    selectButton.addEventListener("click", () => setPlayerImage(e));

    selectImageBox.appendChild(selectImage);
    selectImageBox.appendChild(selectOverlay);
    selectImageBox.appendChild(selectButton);

    accountImageSelector.appendChild(selectImageBox);
  });

  // Setting opening select modal
  const accountImageChangeButton = document.querySelector(
    "#account-image-change-button"
  );
  accountImageChangeButton.addEventListener("click", () =>
    openSelectImageModal()
  );

  // Setting closing select modal
  const selectorModalCloseButton = document.querySelector(
    "#account-image-selector-modal-close-button"
  );
  const selectorModalOverlay = document.querySelector(
    "#account-image-selector-modal-overlay"
  );
  selectorModalCloseButton.addEventListener("click", () =>
    closeSelectImageModal()
  );
  selectorModalOverlay.addEventListener("click", () => closeSelectImageModal());
}

function openSelectImageModal() {
  const accountImageSelectorModal = document.querySelector(
    "#account-image-selector-modal"
  );
  accountImageSelectorModal.classList.add("visible");
}

function closeSelectImageModal() {
  const accountImageSelectorModal = document.querySelector(
    "#account-image-selector-modal"
  );
  accountImageSelectorModal.classList.remove("visible");
}

function setPlayerImage(imageSrc) {
  window.localStorage.setItem(PLAYER_IMG_KEY, imageSrc);
  closeSelectImageModal();
  loadPlayerData();
}
