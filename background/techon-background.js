class TechOnBackground {
  constructor(element) {
    this.element = element;
    this.type = element.dataset.type || 'solid';
    this.pattern = element.dataset.pattern;
    this.color = element.dataset.color || 'primary';
    this.accent = element.dataset.accent || 'primary';
    this.animated = element.dataset.animated === 'true';
    this.blur = element.dataset.blur === 'true';
    this.overlay = element.dataset.overlay === 'true';
    
    this.element.setAttribute('data-type', this.type);
    this.element.setAttribute('data-color', this.color);
    this.element.setAttribute('data-accent', this.accent);
    this.element.setAttribute('data-animated', this.animated);
    this.element.setAttribute('data-blur', this.blur);
    this.element.setAttribute('data-overlay', this.overlay);
    
    if (this.pattern) {
      this.element.setAttribute('data-pattern', this.pattern);
    }
    
    this.init();
  }

  init() {
    if (this.type === 'particles') {
      this.createParticles();
    }
  }

  createParticles() {
    const container = document.createElement('div');
    container.className = 'to-background-particles';
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 6 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.background = `rgba(255,255,255,${Math.random() * 0.5})`;
      particle.style.borderRadius = '50%';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animation = `float ${Math.random() * 10 + 10}s infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(particle);
    }
    
    this.element.appendChild(container);
  }

  setType(type) {
    this.type = type;
    this.element.setAttribute('data-type', type);
  }

  setPattern(pattern) {
    this.pattern = pattern;
    if (pattern) {
      this.element.setAttribute('data-pattern', pattern);
    } else {
      this.element.removeAttribute('data-pattern');
    }
  }

  setColor(color) {
    this.color = color;
    this.element.setAttribute('data-color', color);
  }

  setAccent(accent) {
    this.accent = accent;
    this.element.setAttribute('data-accent', accent);
  }

  setAnimated(animated) {
    this.animated = animated;
    this.element.setAttribute('data-animated', animated);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-background').forEach(bg => {
    bg.backgroundInstance = new TechOnBackground(bg);
  });
});

// Add particle animation style
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    25% { transform: translateY(-20px) translateX(10px); }
    50% { transform: translateY(0) translateX(20px); }
    75% { transform: translateY(20px) translateX(10px); }
  }
`;
document.head.appendChild(style);