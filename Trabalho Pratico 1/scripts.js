window.addEventListener("load", start);

var colorBlock = document.querySelector("#colored");
//inputs
var red = document.querySelector("#redInput");
var green = document.querySelector("#greenInput");
var blue = document.querySelector("#blueInput");

function start() {
  refreshColor();

  document.querySelector("#redInput").addEventListener("change", refreshRed);
  document
    .querySelector("#greenInput")
    .addEventListener("change", refreshGreen);
  document.querySelector("#blueInput").addEventListener("change", refreshBlue);
}

function refreshColor() {
  colorBlock.style.backgroundColor =
    "rgb(" + red.value + "," + green.value + "," + blue.value + ")";
}

function refreshRed() {
  document.querySelector("#redTxt").value = red.value;
  refreshColor();
}

function refreshGreen() {
  document.querySelector("#greenTxt").value = green.value;
  refreshColor();
}

function refreshBlue() {
  document.querySelector("#blueTxt").value = blue.value;
  refreshColor();
}
