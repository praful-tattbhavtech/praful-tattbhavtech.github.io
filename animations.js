document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const backgroundAnimation = document.getElementById('background-animation');
    if (backgroundAnimation) {
        backgroundAnimation.appendChild(canvas);
    }

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

    if (backgroundAnimation) {
        resizeCanvas();
        createParticles();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
    }

    gsap.registerPlugin(ScrollTrigger);

    // Header background change on scroll (only for home page)
    if (document.body.classList.contains('home-page')) {
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            toggleClass: {className: 'scrolled', targets: 'header'}
        });
    }

    // Fade in sections on scroll
    gsap.utils.toArray('section').forEach(section => {
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
    gsap.utils.toArray('.card, .expertise-item, .approach-item').forEach(item => {
        gsap.from(item, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
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

    // Subtle hover animation for grid items
    const gridItems = document.querySelectorAll('.expertise-item, .approach-item, .card');
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, { y: -5, duration: 0.3, ease: "power2.out" });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item, { y: 0, duration: 0.3, ease: "power2.out" });
        });
    });

    // About page specific animations
    if (document.body.classList.contains('about-page')) {
        gsap.from('.page-header h1', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
        });

        gsap.from('.page-header p', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
        });

        gsap.from('.expertise-item h3', {
            textContent: 0,
            duration: 2,
            ease: "power1.inOut",
            snap: { textContent: 1 },
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.expertise-grid',
                start: "top 80%",
            }
        });
    }
});