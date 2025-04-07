document.addEventListener('DOMContentLoaded', () => {
    // Make sure p5 is available before creating the sketch
    if (typeof p5 !== 'undefined') {
        new p5(sketch);
    } else {
        console.error('p5.js library not loaded');
        // Fallback background if p5 is not available
        document.getElementById('home').style.background = 'linear-gradient(135deg, #1a237e, #0d47a1)';
    }
});

const sketch = (p) => {
    let particles = [];
    
    p.setup = () => {
        // Create canvas with the correct size
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent('hero-animation');
        
        // Create particles
        for(let i = 0; i < 100; i++) {
            particles.push(new Particle(p));
        }
    };
    
    p.draw = () => {
        p.clear();
        particles.forEach(particle => {
            particle.update();
            particle.display();
        });
    };
    
    // Handle window resize
    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
    };
    
    class Particle {
        constructor(p) {
            this.p = p;
            this.reset();
        }
        
        reset() {
            this.x = this.p.random(this.p.width);
            this.y = this.p.random(this.p.height);
            this.size = this.p.random(2, 5);
            this.speed = this.p.random(0.5, 2);
            this.opacity = this.p.random(50, 150);
        }
        
        update() {
            this.y -= this.speed;
            if (this.y < 0) {
                this.y = this.p.height;
                this.x = this.p.random(this.p.width);
            }
        }
        
        display() {
            this.p.noStroke();
            this.p.fill(255, 255, 255, this.opacity);
            this.p.circle(this.x, this.y, this.size);
        }
    }
};


// Add this to your animations.js file

// Parallax effect for hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('home');
    const heroContent = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrollPosition / (window.innerHeight * 0.8));
        }
    });
});