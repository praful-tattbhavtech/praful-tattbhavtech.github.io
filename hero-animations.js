// Particle Wave
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    const particleCount = Math.floor(window.innerWidth * window.innerHeight / 10000);
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            speed: Math.random() * 0.5 + 0.1
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateParticles(mouseX, mouseY) {
    particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
            particle.x += dx / distance * particle.speed;
            particle.y += dy / distance * particle.speed;
        }
        if (particle.x < 0 || particle.x > canvas.width) particle.x = Math.random() * canvas.width;
        if (particle.y < 0 || particle.y > canvas.height) particle.y = Math.random() * canvas.height;
    });
}

function animateParticles() {
    drawParticles();
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

canvas.addEventListener('mousemove', (e) => {
    updateParticles(e.clientX, e.clientY);
});

resizeCanvas();
createParticles();
animateParticles();

// Morphing Shapes
const morphingShapes = document.getElementById('morphing-shapes');
const shapes = ['circle', 'square', 'triangle'];
let currentShape = 0;

function createShape() {
    const shape = document.createElement('div');
    shape.classList.add('morphing-shape', shapes[currentShape]);
    morphingShapes.appendChild(shape);
    currentShape = (currentShape + 1) % shapes.length;
    return shape;
}

function animateShape(shape) {
    const duration = 5000 + Math.random() * 5000;
    const keyframes = [
        { transform: 'scale(0) rotate(0deg)', opacity: 0 },
        { transform: 'scale(1) rotate(360deg)', opacity: 0.3, offset: 0.5 },
        { transform: 'scale(0) rotate(720deg)', opacity: 0 }
    ];
    const animation = shape.animate(keyframes, {
        duration: duration,
        easing: 'ease-in-out',
        iterations: Infinity
    });
    
    animation.onfinish = () => {
        shape.remove();
        createAndAnimateShape();
    };
}

function createAndAnimateShape() {
    const shape = createShape();
    shape.style.left = `${Math.random() * 100}%`;
    shape.style.top = `${Math.random() * 100}%`;
    animateShape(shape);
}

for (let i = 0; i < 5; i++) {
    createAndAnimateShape();
}