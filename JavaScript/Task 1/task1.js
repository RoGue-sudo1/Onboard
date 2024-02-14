const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const hexText = document.getElementById("hex-number-text");

function randomHexNumber() {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
}

let intervalId;

startButton.addEventListener("click", () => {
  intervalId = setInterval(() => {
    const hexNumber = randomHexNumber();
    document.body.style.backgroundColor = hexNumber;
    hexText.textContent = hexNumber;
  }, 2000);
});

stopButton.addEventListener("click", () => {
   clearInterval(intervalId)
   document.body.style.backgroundColor = "#FFFFFF";
    hexText.textContent ="Click on start button";
});
