gsap.registerPlugin(ScrollTrigger);

// Header background change on scroll
ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: {className: 'scrolled', targets: 'header'}
});

// Hero animations
gsap.from("#offer", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.from("#trust", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out"
});

gsap.from("#benefits li", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
});

gsap.from("#cta", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "power3.out"
});

// Animate sections on scroll
gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 100,
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
        y: 50,
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

// Parallax effect for background
gsap.to("#background-animation", {
    y: "30%",
    ease: "none",
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Floating animation for CTA button
gsap.to("#cta", {
    y: -10,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
});

// Create floating particles in the background
const createParticle = () => {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    document.getElementById('background-animation').appendChild(particle);

    gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5
    });

    gsap.to(particle, {
        x: "+=" + (Math.random() * 100 - 50),
        y: "+=" + (Math.random() * 100 - 50),
        opacity: 0,
        scale: 0,
        duration: Math.random() * 4 + 3,
        onComplete: () => {
            particle.remove();
            createParticle();
        }
    });
};

// Create initial particles
for (let i = 0; i < 20; i++) {
    createParticle();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});