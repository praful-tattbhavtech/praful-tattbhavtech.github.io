document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.getElementById('background-animation').appendChild(canvas);

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

    function updateParticles() {
        particles.forEach(particle => {
            particle.y -= particle.speed;
            if (particle.y + particle.radius < 0) {
                particle.y = canvas.height + particle.radius;
            }
        });
    }

    function animate() {
        drawParticles();
        updateParticles();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    // Scroll animations
    gsap.registerPlugin(ScrollTrigger);

    // Header background change on scroll
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {className: 'scrolled', targets: 'header'}
    });

    // Animate sections on scroll
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate cards on scroll
    gsap.utils.toArray('.card').forEach(card => {
        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate process steps
    gsap.utils.toArray('.process-step').forEach((step, index) => {
        gsap.from(step, {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: step,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
});