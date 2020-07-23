window.addEventListener("load", start);

let colorBlock = document.querySelector("#colored");
//inputs
let red = document.querySelector("#redInput");
let green = document.querySelector("#greenInput");
let blue = document.querySelector("#blueInput");

function start() {
  refreshColor();

  document.querySelector("#redInput").addEventListener("change", refreshRed);
  document
    .querySelector("#greenInput")
    .addEventListener("change", refreshGreen);
  document.querySelector("#blueInput").addEventListener("change", refreshBlue);
}

const refreshColor = () => {
  colorBlock.style.backgroundColor =
    "rgb(" + red.value + "," + green.value + "," + blue.value + ")";
};

const refreshRed = () => {
  document.querySelector("#redTxt").value = red.value;
  refreshColor();
};

const refreshGreen = () => {
  document.querySelector("#greenTxt").value = green.value;
  refreshColor();
};

const refreshBlue = () => {
  document.querySelector("#blueTxt").value = blue.value;
  refreshColor();
};
