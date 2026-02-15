class TechOnCompareImage {
  constructor(element) {
    this.element = element;
    this.container = element.querySelector('.to-compare-image-container');
    this.handle = element.querySelector('.to-compare-image-handle');
    this.before = element.querySelector('.to-compare-image-before');
    this.orientation = element.dataset.orientation || 'horizontal';
    this.position = 50; // 50% default
    
    this.element.setAttribute('data-orientation', this.orientation);
    this.element.style.setProperty('--position', `${this.position}%`);
    
    this.init();
  }

  init() {
    this.element.addEventListener('mousemove', (e) => this.handleMove(e));
    this.element.addEventListener('touchmove', (e) => this.handleMove(e));
    
    // Optional: Add click/drag to move
    let isDragging = false;
    
    this.element.addEventListener('mousedown', () => {
      isDragging = true;
    });
    
    this.element.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    this.element.addEventListener('mouseleave', () => {
      isDragging = false;
    });
    
    this.element.addEventListener('mousemove', (e) => {
      if (isDragging) {
        this.handleMove(e);
      }
    });
  }

  handleMove(e) {
    e.preventDefault();
    
    const rect = this.element.getBoundingClientRect();
    let clientX, clientY;
    
    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    let position;
    if (this.orientation === 'horizontal') {
      position = ((clientX - rect.left) / rect.width) * 100;
    } else {
      position = ((clientY - rect.top) / rect.height) * 100;
    }
    
    position = Math.max(0, Math.min(100, position));
    this.setPosition(position);
  }

  setPosition(position) {
    this.position = position;
    this.element.style.setProperty('--position', `${position}%`);
    
    // Trigger custom event
    const event = new CustomEvent('compare-change', {
      detail: { position: position }
    });
    this.element.dispatchEvent(event);
  }

  reset() {
    this.setPosition(50);
  }

  setOrientation(orientation) {
    this.orientation = orientation;
    this.element.setAttribute('data-orientation', orientation);
    this.reset();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-compare-image').forEach(compare => {
    compare.compareInstance = new TechOnCompareImage(compare);
  });
});