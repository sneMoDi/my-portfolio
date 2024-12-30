// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
let darkMode = true;

themeToggle.addEventListener('click', () => {
  darkMode = !darkMode;
  document.body.style.background = darkMode ? '#000' : '#fff';
  document.body.style.color = darkMode ? '#fff' : '#000';
});

// Magic Particle Effect
const canvas = document.getElementById('magic-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const colors = ['#8a00c2', '#8a00c2'];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Mouse move event to create particles
document.addEventListener('mousemove', (event) => {
  // Add multiple particles for denser effect
  for (let i = 0; i < 5; i++) {
    particles.push({
      x: event.clientX,
      y: event.clientY,
      size: Math.random() * 5 + 2, // Random size
      speedX: (Math.random() - 0.5) * 2, // Random horizontal speed
      speedY: (Math.random() - 0.5) * 2, // Random vertical speed
      color: colors[Math.floor(Math.random() * colors.length)], // Random color
      life: 100
    });
  }
});

// Animation function for particles
function animateParticles() {
  // Clear the entire canvas to remove traces
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Iterate backward to safely remove particles without disrupting the loop
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    
    // Draw the particle
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();

    // Update particle position and life
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.size -= 0.05; // Gradual shrink
    particle.life -= 1;

    // Remove particle if it dies
    if (particle.size <= 0 || particle.life <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();
