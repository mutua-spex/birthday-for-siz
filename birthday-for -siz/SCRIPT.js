// DOM elements
const countdownScreen = document.getElementById("countdown-screen");
const countdownElement = document.getElementById("countdown-text");
const letterScreen = document.getElementById("letter-screen");
const photoScreen = document.getElementById("photo-screen");
const notebookScreen = document.getElementById("notebook-screen");
const pages = document.querySelectorAll(".page");
let currentPage = 0;

// Open envelope and start binary countdown
function openEnvelope() {
  letterScreen.classList.add("hidden");
  countdownScreen.classList.remove("hidden");

  const binaryNumbers = ["11", "10", "1"];
  let index = 0;

  const interval = setInterval(() => {
    countdownElement.textContent = binaryNumbers[index];
    index++;

    if (index >= binaryNumbers.length) {
      clearInterval(interval);

      // Show "Happy Birthday!" in binary rain
      countdownElement.textContent = "🎉 Happy Birthday! 🎉";

      // After 2 seconds, go to photo screen with glitter background
      setTimeout(() => {
        countdownScreen.classList.add("hidden");
        photoScreen.classList.remove("hidden");
        photoScreen.classList.add("glitter-bg");
      }, 2000);
    }
  }, 1000);
}

// Tap hand to open notebook
function showNotebook() {
  photoScreen.classList.add("hidden");
  notebookScreen.classList.remove("hidden");
  pages[0].classList.add("active"); // show first page
  currentPage = 0;
}

// Flip to next notebook page
function nextPage() {
  pages[currentPage].classList.remove("active");
  currentPage++;

  if (currentPage < pages.length) {
    pages[currentPage].classList.add("active");
  }
}

// ===============================
// Binary Rain Background Effect
// ===============================
const canvas = document.getElementById("binaryCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const binaryChars = ["0", "1"];
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawBinaryRain() {
  // Light pink transparent background
  ctx.fillStyle = "rgba(255, 182, 193, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff69b4"; // Pink binary text
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = binaryChars[Math.floor(Math.random() * binaryChars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawBinaryRain, 50);

// Resize canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
window.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");

  // Try autoplay (most browsers will block it unless muted or triggered by click)
  music.play().catch(() => {
    console.warn("Autoplay blocked. Waiting for user interaction...");
    
    // Enable fallback: play on first interaction
    document.addEventListener("click", () => {
      music.play().catch(err => console.log("Still blocked:", err));
    }, { once: true });
  });
});






