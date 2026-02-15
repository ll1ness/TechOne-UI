class TechOnLogo {
  constructor(element) {
    this.element = element;
    this.size = element.dataset.size || 'm';
    this.layout = element.dataset.layout || 'horizontal';
    this.color = element.dataset.color || 'dark';
    this.src = element.dataset.src;
    this.alt = element.dataset.alt || 'logo';
    this.text = element.dataset.text;
    this.bordered = element.dataset.bordered === 'true';
    this.rounded = element.dataset.rounded === 'true';
    this.background = element.dataset.background === 'true';
    
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-layout', this.layout);
    this.element.setAttribute('data-color', this.color);
    this.element.setAttribute('data-bordered', this.bordered);
    this.element.setAttribute('data-rounded', this.rounded);
    this.element.setAttribute('data-background', this.background);
    
    this.init();
  }

  init() {
    if (this.src && !this.element.querySelector('.to-logo-image')) {
      const imageContainer = document.createElement('span');
      imageContainer.className = 'to-logo-image';
      
      if (this.src.endsWith('.svg')) {
        // For SVG, we could fetch and inject, but for demo use img
        const img = document.createElement('img');
        img.src = this.src;
        img.alt = this.alt;
        imageContainer.appendChild(img);
      } else {
        // Simple emoji/icon fallback
        imageContainer.textContent = this.src;
      }
      
      this.element.appendChild(imageContainer);
    }
    
    if (this.text && !this.element.querySelector('.to-logo-text')) {
      const textSpan = document.createElement('span');
      textSpan.className = 'to-logo-text';
      textSpan.textContent = this.text;
      
      if (this.layout === 'horizontal') {
        this.element.appendChild(textSpan);
      } else {
        this.element.insertBefore(textSpan, this.element.firstChild);
      }
    }
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }

  setLayout(layout) {
    this.layout = layout;
    this.element.setAttribute('data-layout', layout);
  }

  setColor(color) {
    this.color = color;
    this.element.setAttribute('data-color', color);
  }

  setText(text) {
    this.text = text;
    const textSpan = this.element.querySelector('.to-logo-text');
    if (textSpan) {
      textSpan.textContent = text;
    } else if (text) {
      this.init();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-logo').forEach(logo => {
    logo.logoInstance = new TechOnLogo(logo);
  });
});