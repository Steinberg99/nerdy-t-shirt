const localStorageInputs = document.querySelectorAll(".local-storage-input");
const options = ["fit-options", "size-options", "color-options"];
const textInput = document.querySelector(".text-input");
const tShirtText = document.querySelector(".t-shirt-text");
const colorInputs = document.querySelectorAll(".color-input");
const tShirt = document.querySelector(".t-shirt");

const writeLocalStorage = () => {
  if (Storage === void 0) return; // Return if local storage is not supported by the browser

  localStorageInputs.forEach((input) => {
    // Add event listeners to all of the local storage inputs
    input.addEventListener("change", (e) => {
      localStorage.setItem(input.name, input.value);

      console.log(input.name);
      console.log(localStorage.getItem(input.name));
    });
  });
};

const readLocalStorage = () => {
  if (Storage === void 0) return; // Return if local storage is not supported by the browser

  const text = localStorage.getItem("text-option");

  if (text) {
    tShirtText.textContent = text;
    textInput.value = text;
  }

  options.forEach((option) => {
    const value = localStorage.getItem(option);

    if (!value) return; // Return when the value saved in local storage is equal to null

    document.querySelector(`input[value=${value}]`).checked = true;
  });
};

const setTShirtColor = () => {
  const color = localStorage.getItem("color-options");

  if (!color) return;

  tShirt.style.fill = color;
};

writeLocalStorage();
readLocalStorage();
setTShirtColor();

// Add event listeners
textInput.addEventListener("input", (e) => (tShirtText.textContent = e.target.value));

colorInputs.forEach((input) => {
  input.addEventListener("change", (e) => (tShirt.style.fill = e.target.value));
});
