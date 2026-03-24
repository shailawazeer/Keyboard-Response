const display = document.getElementById("stimulus-display");
const resultDiv = document.getElementById("result");
let startTime, currentStimulus;

function generateRandomLetter() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 10).toString();
}

function startTrial() {
  resultDiv.innerText = "";

  const isLetterType = Math.random() > 0.5;
  currentStimulus = isLetterType
    ? generateRandomLetter()
    : generateRandomNumber();

  display.innerText = currentStimulus;
  startTime = performance.now();
}

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (key === " ") {
    startTrial();
    return;
  }

  if (!startTime) return;

  const endTime = performance.now();
  const reactionTime = (endTime - startTime).toFixed(0);

  const isNumber = !isNaN(currentStimulus);

  if ((!isNumber && key === "a") || (isNumber && key === "l")) {
    resultDiv.innerHTML = `Correct! Time: <span style="color:green">${reactionTime}ms</span>`;
  } else if (key === "a" || key === "l") {
    resultDiv.innerHTML = `Wrong Key! Time: <span style="color:red">${reactionTime}ms</span>`;
  }

  startTime = null;
});
