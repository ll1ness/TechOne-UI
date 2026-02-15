class TechOnIconButton {
  constructor(element) {
    this.element = element;
    this.size = element.dataset.size || 'm';
    this.variant = element.dataset.variant || 'ghost';
    this.radius = element.dataset.radius || 'm';
    this.icon = element.dataset.icon;
    this.label = element.dataset.label || 'icon button';
    this.loading = element.dataset.loading === 'true';
    
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-variant', this.variant);
    this.element.setAttribute('data-radius', this.radius);
    this.element.setAttribute('data-loading', this.loading);
    this.element.setAttribute('aria-label', this.label);
    
    this.init();
  }

  init() {
    if (this.icon && !this.element.querySelector('.to-icon')) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'to-icon';
      
      const icons = {
        'menu': '☰',
        'close': '✕',
        'search': '🔍',
        'user': '👤',
        'settings': '⚙️',
        'home': '🏠',
        'heart': '❤️',
        'star': '⭐',
        'mail': '✉️',
        'bell': '🔔',
        'calendar': '📅',
        'clock': '⏰',
        'download': '⬇️',
        'upload': '⬆️',
        'edit': '✏️',
        'delete': '🗑️',
        'copy': '📋',
        'save': '💾',
        'print': '🖨️',
        'share': '📤',
        'plus': '+',
        'minus': '-',
        'check': '✓',
        'arrow-left': '←',
        'arrow-right': '→',
        'arrow-up': '↑',
        'arrow-down': '↓',
        'chevron-left': '‹',
        'chevron-right': '›',
        'chevron-up': '⌃',
        'chevron-down': '⌄'
      };
      
      iconSpan.textContent = icons[this.icon] || this.icon;
      this.element.appendChild(iconSpan);
    }
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }

  setVariant(variant) {
    this.variant = variant;
    this.element.setAttribute('data-variant', variant);
  }

  setLoading(loading) {
    this.loading = loading;
    this.element.setAttribute('data-loading', loading);
  }

  setDisabled(disabled) {
    if (disabled) {
      this.element.setAttribute('disabled', '');
    } else {
      this.element.removeAttribute('disabled');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-icon-button').forEach(button => {
    button.iconButtonInstance = new TechOnIconButton(button);
  });
});