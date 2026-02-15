class TechOnLogoCloud {
  constructor(element) {
    this.element = element;
    this.variant = element.dataset.variant || 'default';
    this.size = element.dataset.size || 'm';
    this.density = element.dataset.density || 'comfortable';
    this.bordered = element.dataset.bordered === 'true';
    this.shadow = element.dataset.shadow === 'true';
    this.animated = element.dataset.animated === 'true';
    this.grayscale = element.dataset.grayscale === 'true';
    
    this.element.setAttribute('data-variant', this.variant);
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-density', this.density);
    this.element.setAttribute('data-bordered', this.bordered);
    this.element.setAttribute('data-shadow', this.shadow);
    this.element.setAttribute('data-animated', this.animated);
    this.element.setAttribute('data-grayscale', this.grayscale);
    
    this.init();
  }

  init() {
    this.items = Array.from(this.element.querySelectorAll('.to-logo-cloud-item'));
  }

  addItem(logoData) {
    const item = document.createElement('div');
    item.className = 'to-logo-cloud-item';
    
    if (logoData.href) {
      const link = document.createElement('a');
      link.href = logoData.href;
      link.appendChild(this.createLogoContent(logoData));
      item.appendChild(link);
    } else {
      item.appendChild(this.createLogoContent(logoData));
    }
    
    this.element.appendChild(item);
    this.items.push(item);
  }

  createLogoContent(data) {
    const content = document.createElement('div');
    content.className = 'to-logo-content';
    
    if (data.src) {
      if (data.src.startsWith('http') || data.src.includes('.')) {
        const img = document.createElement('img');
        img.src = data.src;
        img.alt = data.alt || 'logo';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        content.appendChild(img);
      } else {
        // Emoji/icon fallback
        content.textContent = data.src;
        content.style.fontSize = '32px';
      }
    }
    
    if (data.text) {
      const textSpan = document.createElement('span');
      textSpan.textContent = data.text;
      textSpan.style.display = 'block';
      textSpan.style.marginTop = '8px';
      content.appendChild(textSpan);
    }
    
    return content;
  }

  setVariant(variant) {
    this.variant = variant;
    this.element.setAttribute('data-variant', variant);
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }

  setDensity(density) {
    this.density = density;
    this.element.setAttribute('data-density', density);
  }

  setGrayscale(grayscale) {
    this.grayscale = grayscale;
    this.element.setAttribute('data-grayscale', grayscale);
  }

  setAnimated(animated) {
    this.animated = animated;
    this.element.setAttribute('data-animated', animated);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-logo-cloud').forEach(cloud => {
    cloud.logoCloudInstance = new TechOnLogoCloud(cloud);
  });
});