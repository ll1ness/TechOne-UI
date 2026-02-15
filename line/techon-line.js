class TechOnLine {
  constructor(element) {
    this.element = element;
    this.orientation = element.dataset.orientation || 'horizontal';
    this.length = element.dataset.length || '100';
    this.thickness = element.dataset.thickness || 'thin';
    this.style = element.dataset.style || 'solid';
    this.color = element.dataset.color || 'default';
    this.radius = element.dataset.radius || 'none';
    this.margin = element.dataset.margin || 'm';
    this.gradient = element.dataset.gradient === 'true';
    this.animated = element.dataset.animated === 'true';
    
    this.element.setAttribute('data-orientation', this.orientation);
    this.element.setAttribute('data-length', this.length);
    this.element.setAttribute('data-thickness', this.thickness);
    this.element.setAttribute('data-style', this.style);
    this.element.setAttribute('data-color', this.color);
    this.element.setAttribute('data-radius', this.radius);
    this.element.setAttribute('data-margin', this.margin);
    this.element.setAttribute('data-gradient', this.gradient);
    this.element.setAttribute('data-animated', this.animated);
  }

  setOrientation(orientation) {
    this.orientation = orientation;
    this.element.setAttribute('data-orientation', orientation);
  }

  setLength(length) {
    this.length = length;
    this.element.setAttribute('data-length', length);
  }

  setColor(color) {
    this.color = color;
    this.element.setAttribute('data-color', color);
  }

  setThickness(thickness) {
    this.thickness = thickness;
    this.element.setAttribute('data-thickness', thickness);
  }

  setStyle(style) {
    this.style = style;
    this.element.setAttribute('data-style', style);
  }

  setAnimated(animated) {
    this.animated = animated;
    this.element.setAttribute('data-animated', animated);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-line').forEach(line => {
    line.lineInstance = new TechOnLine(line);
  });
});