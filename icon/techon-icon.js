class TechOnIcon {
  constructor(element) {
    this.element = element;
    this.name = element.dataset.name;
    this.size = element.dataset.size || 'm';
    this.color = element.dataset.color || 'default';
    this.rotate = element.dataset.rotate || '0';
    this.spin = element.dataset.spin === 'true';
    
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-color', this.color);
    this.element.setAttribute('data-rotate', this.rotate);
    this.element.setAttribute('data-spin', this.spin);
    
    this.init();
  }

  init() {
    if (this.name) {
      this.renderIcon();
    }
  }

  renderIcon() {
    const icons = {
      'check': '✓',
      'close': '✕',
      'menu': '☰',
      'search': '🔍',
      'user': '👤',
      'settings': '⚙️',
      'home': '🏠',
      'heart': '❤️',
      'star': '⭐',
      'mail': '✉️',
      'phone': '📞',
      'calendar': '📅',
      'clock': '⏰',
      'download': '⬇️',
      'upload': '⬆️',
      'arrow-left': '←',
      'arrow-right': '→',
      'arrow-up': '↑',
      'arrow-down': '↓',
      'chevron-left': '‹',
      'chevron-right': '›',
      'chevron-up': '⌃',
      'chevron-down': '⌄',
      'info': 'ℹ️',
      'warning': '⚠️',
      'error': '❌',
      'success': '✅',
      'plus': '+',
      'minus': '−',
      'edit': '✏️',
      'delete': '🗑️',
      'copy': '📋',
      'save': '💾',
      'print': '🖨️',
      'share': '📤',
      'external': '↗️'
    };

    this.element.textContent = icons[this.name] || this.name;
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }

  setColor(color) {
    this.color = color;
    this.element.setAttribute('data-color', color);
  }

  setSpin(spin) {
    this.spin = spin;
    this.element.setAttribute('data-spin', spin);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-icon').forEach(icon => {
    icon.iconInstance = new TechOnIcon(icon);
  });
});