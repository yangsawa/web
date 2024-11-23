/* particles.js */

const canvas = document.getElementById('dynamic-background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const colors = ['#ff6b6b', '#f3f3f3', '#ffc300', '#6bf56b', '#6baff5', '#d16bf5'];

class Particle {
    constructor(x, y, size, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.alpha = 1; // Controls fade-out
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.01; // Particle fades out
        if (this.alpha <= 0) this.alpha = 0;
    }
}

function createFirework(x, y) {
    const numParticles = 50; // Number of particles in a firework
    const baseSpeed = 2;

    for (let i = 0; i < numParticles; i++) {
        const size = Math.random() * 3 + 1;
        const angle = Math.random() * 2 * Math.PI; // Random direction
        const speed = Math.random() * baseSpeed + 0.5; // Random speed
        const color = colors[Math.floor(Math.random() * colors.length)];
        const speedX = Math.cos(angle) * speed;
        const speedY = Math.sin(angle) * speed;

        particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Remove particle if it's completely faded out
        if (particle.alpha <= 0) {
            particlesArray.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

// Firework on mouse click
canvas.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    createFirework(x, y);
});

// Firework on mouse move
canvas.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.1) { // Less frequent fireworks on move
        createFirework(e.clientX, e.clientY);
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
