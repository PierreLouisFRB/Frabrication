// Animation de défilement fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Effet de particules
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = 0.5 + Math.random() * 1;
        this.radius = Math.random() * 3;
        this.direction = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;
    }
}

// Initialisation des particules
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-canvas');
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Création des particules
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas));
    }

    // Animation des particules
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(76, 175, 80, 0.1)';

        particles.forEach(particle => {
            particle.update();
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Animation au défilement pour les cartes
function initScrollAnimations() {
    const cards = document.querySelectorAll('.category-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        observer.observe(card);
    });
}

// Carrousel
window.onload = function() {
    // Initialiser le carrousel
    const carousel = document.querySelector('.carousel-images');
    if (!carousel) return;

    const images = carousel.querySelectorAll('img');
    let currentIndex = 0;

    // Afficher la première image
    images[0].classList.add('visible');

    // Gérer les boutons
    document.querySelector('.carousel-button.prev').onclick = function() {
        images[currentIndex].classList.remove('visible');
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        images[currentIndex].classList.add('visible');
    }

    document.querySelector('.carousel-button.next').onclick = function() {
        images[currentIndex].classList.remove('visible');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('visible');
    }
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollAnimations();
});
