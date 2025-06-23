const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = Array.from({ length: 300 }).map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 1.5,
  opacity: Math.random() * 0.5 + 0.3,
}));

const meteors = Array.from({ length: 60 }).map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  length: Math.random() * 80 + 10,
  speed: Math.random() * 4 + 2,
  angle: Math.PI / 4,
  opacity: Math.random() * 0.5 + 0.2,
}));

function draw() {
  const gradient = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 0,
    canvas.width / 2, canvas.height / 2, canvas.width
  );
  gradient.addColorStop(0, "#000011");
  gradient.addColorStop(0.5, "#000033");
  gradient.addColorStop(1, "#000011");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach((s) => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
    ctx.fill();
  });

  meteors.forEach((m) => {
    const dx = Math.cos(m.angle) * m.length;
    const dy = Math.sin(m.angle) * m.length;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - dx, m.y - dy);
    ctx.strokeStyle = `rgba(0, 255, 255, ${m.opacity})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    m.x += m.speed;
    m.y += m.speed;

    if (m.x > canvas.width || m.y > canvas.height) {
      m.x = Math.random() * canvas.width;
      m.y = -20;
    }
  });
}

setInterval(draw, 33);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
