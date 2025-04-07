// Hero Animation
const sketch = (p) => {
    let particles = [];
    
    p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent('hero-animation');
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
            if (this.y < 0) this.reset();
        }
        
        display() {
            this.p.noStroke();
            this.p.fill(255, 255, 255, this.opacity);
            this.p.circle(this.x, this.y, this.size);
        }
    }
};

// Initialize p5 sketch when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    new p5(sketch);
});