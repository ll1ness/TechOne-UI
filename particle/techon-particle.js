class TechOnParticle {
  constructor(element) {
    this.element = element;
    this.count = this.getParticleCount();
    this.color = element.dataset.color || 'primary';
    this.shape = element.dataset.shape || 'circle';
    this.density = element.dataset.density || 'medium';
    this.speed = element.dataset.speed || 'medium';
    this.size = parseInt(element.dataset.size) || 2;
    
    this.element.setAttribute('data-color', this.color);
    this.element.setAttribute('data-shape', this.shape);
    this.element.setAttribute('data-density', this.density);
    this.element.setAttribute('data-speed', this.speed);
    
    this.init();
  }

  init() {
    this.createParticles();
    this.animate();
  }

  getParticleCount() {
    const densities = {
      'sparse': 30,
      'medium': 60,
      'dense': 100
    };
    return densities[this.density] || 60;
  }

  createParticles() {
    const container = document.createElement('div');
    container.className = 'to-particle-canvas';
    
    for (let i = 0; i < this.count; i++) {
      const particle = document.createElement('div');
      particle.className = 'to-particle-dot';
      
      // Random initial position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random animation delay
      particle.style.animationDelay = `${Math.random() * 10}s`;
      
      // Random size variation
      const sizeVariation = this.size * (0.5 + Math.random());
      particle.style.width = `${sizeVariation}px`;
      particle.style.height = `${sizeVariation}px`;
      
      // Random opacity
      particle.style.opacity = 0.2 + Math.random() * 0.5;
      
      container.appendChild(particle);
    }
    
    this.element.appendChild(container);
    this.canvas = container;
  }

  animate() {
    if (!this.canvas) return;
    
    const particles = this.canvas.children;
    
    setInterval(() => {
      for (let particle of particles) {
        // Small random movement for more natural look
        const currentLeft = parseFloat(particle.style.left);
        const currentTop = parseFloat(particle.style.top);
        
        if (Math.random() > 0.9) {
          particle.style.left = `${Math.max(0, Math.min(100, currentLeft + (Math.random() - 0.5) * 2))}%`;
          particle.style.top = `${Math.max(0, Math.min(100, currentTop + (Math.random() - 0.5) * 2))}%`;
        }
      }
    }, 1000);
  }

  setColor(color) {
    this.color = color;
    this.element.setAttribute('data-color', color);
  }

  setDensity(density) {
    this.density = density;
    this.element.setAttribute('data-density', density);
    this.count = this.getParticleCount();
    this.canvas.remove();
    this.createParticles();
  }

  setSpeed(speed) {
    this.speed = speed;
    this.element.setAttribute('data-speed', speed);
    // Update animation speed for all particles
    const particles = this.canvas.children;
    for (let particle of particles) {
      particle.style.animationDuration = `var(--to-particle-speed)`;
    }
  }

  setShape(shape) {
    this.shape = shape;
    this.element.setAttribute('data-shape', shape);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-particle').forEach(particle => {
    particle.particleInstance = new TechOnParticle(particle);
  });
});