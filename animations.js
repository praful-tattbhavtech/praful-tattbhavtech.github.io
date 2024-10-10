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
    // Hero section animation
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        heroSection.appendChild(canvas);

        let particles = [];
        let meshPoints = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initMeshPoints();
        }

        function initMeshPoints() {
            meshPoints = [];
            const meshSize = 50;
            const meshSpacing = Math.max(canvas.width, canvas.height) / meshSize;
            for (let x = 0; x < canvas.width; x += meshSpacing) {
                for (let y = 0; y < canvas.height; y += meshSpacing) {
                    meshPoints.push({ x, y, baseY: y });
                }
            }
        }

        function createParticle(x, y) {
            return {
                x,
                y,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 3 - 1.5,
                speedY: Math.random() * 3 - 1.5
            };
        }

        function drawParticles() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function updateParticles() {
            particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                if (particle.size > 0.2) particle.size -= 0.1;
            });
            particles = particles.filter(particle => particle.size > 0.2);
        }

        function drawMesh(mouseX, mouseY) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            meshPoints.forEach(point => {
                const dx = mouseX - point.x;
                const dy = mouseY - point.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 200;
                
                if (distance < maxDistance) {
                    point.y = point.baseY + (maxDistance - distance) / 2;
                } else {
                    point.y += (point.baseY - point.y) * 0.1;
                }

                ctx.moveTo(point.x, point.y);
                ctx.lineTo(point.x + meshSpacing, point.y);
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(point.x, point.y + meshSpacing);
            });
            ctx.stroke();
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawMesh(mouseX, mouseY);
            updateParticles();
            drawParticles();
            requestAnimationFrame(animate);
        }

        let mouseX = 0;
        let mouseY = 0;

        canvas.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            particles.push(createParticle(mouseX, mouseY));
        });

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();
    }

    // Expertise section horizontal scroll
    const expertiseSection = document.querySelector('.expertise-section');
    if (expertiseSection) {
        const scrollContainer = expertiseSection.querySelector('.expertise-scroll');
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });

        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
        });

        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
        });

        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 3;
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
    }

    // Approach section interactive elements
    const approachSection = document.querySelector('.approach-section');
    if (approachSection) {
        const steps = approachSection.querySelectorAll('.approach-step');
        steps.forEach(step => {
            step.addEventListener('click', () => {
                steps.forEach(s => s.classList.remove('active'));
                step.classList.add('active');
            });
        });
    }

    // Promise section parallax effect
    const promiseSection = document.querySelector('.promise-section');
    if (promiseSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const sectionTop = promiseSection.offsetTop;
            const sectionHeight = promiseSection.offsetHeight;
            if (scrollPosition > sectionTop - window.innerHeight && scrollPosition < sectionTop + sectionHeight) {
                const parallaxElements = promiseSection.querySelectorAll('.parallax');
                parallaxElements.forEach(el => {
                    const speed = el.dataset.speed;
                    el.style.transform = `translateY(${(scrollPosition - sectionTop) * speed}px)`;
                });
            }
        });
    }
}