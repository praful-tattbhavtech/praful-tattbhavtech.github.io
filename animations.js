gsap.registerPlugin(ScrollTrigger);

// Header background change on scroll
ScrollTrigger.create({
    start: 'top top',
    end: 99999,
    toggleClass: {className: 'scrolled', targets: 'header'}
});

// Hero animations
gsap.from("#offer", {
    x: -100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: "#hero",
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse"
    }
});

gsap.from("#trust", {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    delay: 0.3,
    scrollTrigger: {
        trigger: "#hero",
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse"
    }
});

gsap.from("#benefits li", {
    x: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
        trigger: "#hero",
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse"
    }
});

gsap.to("#cta", {
    scale: 1.05,
    duration: 0.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
});

// Background animation
const particles = 50;
const particlesContainer = document.getElementById('background-animation');

for (let i = 0; i < particles; i++) {
    let particle = document.createElement('div');
    particle.className = 'particle';
    particlesContainer.appendChild(particle);

    gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5
    });

    animateParticle(particle);
}

function animateParticle(particle) {
    gsap.to(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        duration: Math.random() * 10 + 5,
        ease: "none",
        onComplete: animateParticle,
        onCompleteParams: [particle]
    });
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