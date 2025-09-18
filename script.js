const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.05,
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      entry.target.classList.remove("show");
      return;
    }
    entry.target.classList.add("show");
  });
}, appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

// Particulas

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

const mouse = { x: null, y: null };
const attractionRadius = 150;

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = "rgba(255,0,0,0.7)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 180; i++) {
    const size = Math.random() * 3 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 2;
    const speedY = (Math.random() - 0.5) * 2;
    particles.push(new Particle(x, y, size, speedX, speedY));
  }
}

function connectParticles() {
  let opacity;
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;

      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        opacity = 1 - distance / 100;
        ctx.strokeStyle = `rgba(255, 0, 0, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

initParticles();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// A

const typingText = document.querySelector(".typing-text");
const phrases = ["Desenvolvedor Front-end.", "Criando experiências digitais."];
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function type() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    typingText.textContent = current.substring(0, letterIndex + 1);
    letterIndex++;

    if (letterIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 1500); // pausa no fim da frase antes de apagar
      return;
    }
    setTimeout(type, 60); // velocidade de digitação
  } else {
    typingText.textContent = current.substring(0, letterIndex - 1);
    letterIndex--;

    if (letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
      return;
    }
    setTimeout(type, 50);
  }
}

// inicia ao carregar
document.addEventListener("DOMContentLoaded", type);
