const localStorageInputs = document.querySelectorAll(".local-storage-input");
const options = ["fit-options", "size-options", "color-options"];
const textInput = document.querySelector(".text-input");
const tShirtText = document.querySelector(".t-shirt-text");
const colorInputs = document.querySelectorAll(".color-input");
const tShirt = document.querySelector(".t-shirt");
const imageInput = document.querySelector(".image-input");
const tShirtImage = document.querySelector(".t-shirt-image");

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

  // Add event listener to the image input
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];

    if (file) {
      if (FileReader === void 0) return; // Return if the FileReader API is not supported by the browser

      const reader = new FileReader();

      reader.onload = (e) => {
        const base64String = e.target.result;

        localStorage.setItem("image-option", base64String);
      };

      reader.readAsDataURL(file);
    } else {
      localStorage.setItem("image-option", "");
    }
  });
};

const readLocalStorage = () => {
  if (Storage === void 0) return; // Return if local storage is not supported by the browser

  const text = localStorage.getItem("text-option");
  const image = localStorage.getItem("image-option");

  if (text) {
    tShirtText.textContent = text;
    textInput.value = text;
  }

  if (image) {
    tShirtImage.src = image;

    if (DataTransfer === void 0) return; // Return if the DataTransfer API is not supported by the browser

    fetch(image)
      .then((res) => res.blob())
      .then((blob) => {
        const dt = new DataTransfer();

        dt.items.add(new File([blob], "Image", { type: "image/png" }));
        imageInput.files = dt.files; // Add the image file saved in local storage to the file input
      });
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

const setTShirtImage = (e) => {
  const file = e.target.files[0];

  if (file) {
    tShirtImage.src = URL.createObjectURL(file);
  } else {
    tShirtImage.src = "";
  }
};

writeLocalStorage();
readLocalStorage();
setTShirtColor();

// Add event listeners
colorInputs.forEach((input) => {
  input.addEventListener("change", (e) => (tShirt.style.fill = e.target.value));
});

textInput.addEventListener("input", (e) => (tShirtText.textContent = e.target.value));

imageInput.addEventListener("input", setTShirtImage);
