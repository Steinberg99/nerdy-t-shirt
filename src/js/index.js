const localStorageInputs = document.querySelectorAll(".local-storage-input");
const options = ["fit-options", "size-options", "color-options"];

const writeLocalStorage = () => {
  if (Storage === void 0) return; // Return if local storage is not supported by the browser

  localStorageInputs.forEach((input) => {
    // Add event listeners to all of the local storage inputs
    input.addEventListener("change", (e) => {
      localStorage.setItem(input.name, input.value);
    });
  });
};

const readLocalStorage = () => {
  if (Storage === void 0) return; // Return if local storage is not supported by the browser

  options.forEach((option) => {
    const value = localStorage.getItem(option);

    if (!value) return; // Return when the value saved in local storage is equal to null

    document.querySelector(`input[value=${value}]`).checked = true;
  });
};

writeLocalStorage();
readLocalStorage();
