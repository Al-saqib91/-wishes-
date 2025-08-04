const button = document.getElementById('wish-button');
const message = document.getElementById('wish-message');
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

let confetti = [];
let colors = ['#fce18a', '#ff726d', '#b48def', '#f4306d'];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createConfetti() {
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 10 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.floor(Math.random() * 10) - 10,
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((c) => {
    ctx.beginPath();
    ctx.lineWidth = c.r / 2;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt + c.r / 4, c.y);
    ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 4);
    ctx.stroke();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach((c, i) => {
    c.y += Math.cos(c.d) + 1 + c.r / 2;
    c.x += Math.sin(c.d);
    if (c.y > canvas.height) {
      confetti[i] = {
        x: Math.random() * canvas.width,
        y: -10,
        r: c.r,
        d: c.d,
        color: c.color,
        tilt: c.tilt,
      };
    }
  });
}

function animateConfetti() {
  drawConfetti();
  requestAnimationFrame(animateConfetti);
}

button.addEventListener('click', () => {
  message.classList.remove('hidden');
  createConfetti();
  animateConfetti();
});
