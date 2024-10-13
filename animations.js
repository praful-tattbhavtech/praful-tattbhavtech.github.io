document.addEventListener('DOMContentLoaded', (event) => {
    // Home page animations
    if (document.body.classList.contains('home-page')) {
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

        // Header background change on scroll
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            toggleClass: {className: 'scrolled', targets: 'header'}
        });

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
    }

    
    // About page animations
    if (document.body.classList.contains('about-page')) {
    const content = {
        hero: {
            headline: "From Blueprint to Breakthrough",
            subheadline: "Tech That's Truly Yours",
            tagline: "Invest once, own forever: Scalable solutions without recurring fees"
        },
        mission: "Empowering SMBs with affordable, cutting-edge technology to compete and thrive in the digital age.",
        expertise: {
            text: "Our seasoned experts bring together decades of experience in software development and business operations. This unique blend allows us to create solutions that not only solve technical challenges but also drive real business growth. Our team's collective experience spans across Fortune 500 companies, tech giants, global sports organizations, multinational banks, FMCG leaders, and international non-profits. From steel to social media, from banking to wholesale retail, we've seen it all – and we're here to bring that expertise to your business.",
            items: ["Fortune 500", "Tech Giants", "Global Sports", "Multinational Banks", "FMCG Leaders", "International Non-profits"]
        },
        approach: {
            text: "At Tattbhav Tech, we believe in empowering your business, not locking you into costly contracts. Our 'invest once, own forever' model means you get a custom-built solution tailored to your needs, with the freedom to modify and scale as your business grows.",
            steps: [
                { title: "Invest Once", description: "Pay for discovery and development, own the software forever." },
                { title: "Tailored Solutions", description: "Custom-built to fit your specific needs and requirements." },
                { title: "Scalable Growth", description: "Solutions that evolve with your business, without recurring fees." },
                { title: "True Ownership", description: "Your codebase, your asset - free from vendor lock-in." }
            ]
        },
        promise: "We've witnessed firsthand how large corporations leverage technology to drive immense value. Our commitment is to bring that same level of technological advantage to SMBs, without the enterprise-level price tag. With Tattbhav Tech, you're not just getting software – you're gaining a competitive edge that grows with your business."
    };

    const heroSection = document.querySelector('.hero-section');
    const heroCanvas = document.getElementById('hero-canvas');
    const heroContent = document.getElementById('hero-content');

    if (heroCanvas && heroContent) {
        const ctx = heroCanvas.getContext('2d');
        let particles = [];
        let meshPoints = [];
        let mousePosition = { x: 0, y: 0 };

        function resizeCanvas() {
            heroCanvas.width = window.innerWidth;
            heroCanvas.height = window.innerHeight;
            initMeshPoints();
        }

        function initMeshPoints() {
            meshPoints = [];
            const meshSize = 50;
            const meshSpacing = Math.max(heroCanvas.width, heroCanvas.height) / meshSize;
            for (let x = 0; x < heroCanvas.width; x += meshSpacing) {
                for (let y = 0; y < heroCanvas.height; y += meshSpacing) {
                    meshPoints.push({ x, y, baseY: y });
                }
            }
        }

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.1;
            }

            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function animate() {
            ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

            // Draw mesh
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            for (let point of meshPoints) {
                const dx = mousePosition.x - point.x;
                const dy = mousePosition.y - point.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    point.y = point.baseY + (maxDistance - distance) / 1.5;
                } else {
                    point.y += (point.baseY - point.y) * 0.1;
                }

                ctx.moveTo(point.x, point.y);
                ctx.lineTo(point.x + heroCanvas.width / 50, point.y);
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(point.x, point.y + heroCanvas.height / 50);
            }
            ctx.stroke();

            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();
                if (particles[i].size <= 0.2) {
                    particles.splice(i, 1);
                }
            }

            requestAnimationFrame(animate);
        }

        function initHeroAnimation() {
            resizeCanvas();
            animate();

            // Create and animate hero text
            heroContent.innerHTML = '';
            const headlineElement = document.createElement('h1');
            const subheadlineElement = document.createElement('h2');
            const taglineElement = document.createElement('p');

            heroContent.appendChild(headlineElement);
            heroContent.appendChild(subheadlineElement);
            heroContent.appendChild(taglineElement);

            // Animate headline letter by letter
            content.hero.headline.split('').forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter;
                headlineElement.appendChild(span);

                gsap.from(span, {
                    opacity: 0,
                    x: -100,
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: 'power3.out'
                });
            });

            // Animate subheadline and tagline
            gsap.from(subheadlineElement, {
                opacity: 0,
                x: 100,
                duration: 1,
                delay: 1,
                ease: 'power3.out',
                onStart: () => { subheadlineElement.textContent = content.hero.subheadline; }
            });

            gsap.from(taglineElement, {
                opacity: 0,
                y: 50,
                duration: 1,
                delay: 1.5,
                ease: 'power3.out',
                onStart: () => { taglineElement.textContent = content.hero.tagline; }
            });
        }

        heroCanvas.addEventListener('mousemove', (e) => {
            const rect = heroCanvas.getBoundingClientRect();
            mousePosition.x = e.clientX - rect.left;
            mousePosition.y = e.clientY - rect.top;
            particles.push(new Particle(mousePosition.x, mousePosition.y));
        });

        window.addEventListener('resize', resizeCanvas);
        initHeroAnimation();
    }

    // Animate other sections
    function animateSection(sectionId, textContent) {
        const section = document.getElementById(sectionId);
        const contentElement = document.createElement('p');
        contentElement.textContent = textContent;
        section.appendChild(contentElement);

        gsap.from(contentElement, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    animateSection('mission-content', content.mission);
    animateSection('expertise-content', content.expertise.text);
    animateSection('approach-content', content.approach.text);
    animateSection('promise-content', content.promise);

    // Expertise section horizontal scroll
    const expertiseScroll = document.querySelector('.expertise-scroll');
    content.expertise.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'expertise-item';
        itemElement.textContent = item;
        expertiseScroll.appendChild(itemElement);
    });

    // Approach steps animation
    const approachContent = document.getElementById('approach-content');
    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'approach-steps';
    approachContent.appendChild(stepsContainer);

    content.approach.steps.forEach(step => {
        const stepElement = document.createElement('div');
        stepElement.className = 'approach-step';
        stepElement.innerHTML = `<h3>${step.title}</h3><p>${step.description}</p>`;
        stepsContainer.appendChild(stepElement);

        gsap.from(stepElement, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: stepElement,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    }

});