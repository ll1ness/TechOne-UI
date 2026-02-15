class TechOnNavIcon {
  constructor(element) {
    this.element = element;
    this.size = element.dataset.size || 'm';
    this.variant = element.dataset.variant || 'ghost';
    this.radius = element.dataset.radius || 'm';
    this.active = element.dataset.active === 'true';
    this.disabled = element.dataset.disabled === 'true';
    this.loading = element.dataset.loading === 'true';
    this.badge = element.dataset.badge === 'true';
    this.count = element.dataset.count;
    this.icon = element.dataset.icon;
    
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-variant', this.variant);
    this.element.setAttribute('data-radius', this.radius);
    this.element.setAttribute('data-active', this.active);
    this.element.setAttribute('data-disabled', this.disabled);
    this.element.setAttribute('data-loading', this.loading);
    this.element.setAttribute('data-badge', this.badge);
    
    if (this.count) {
      this.element.setAttribute('data-count', this.count);
    }
    
    this.init();
  }

  init() {
    if (this.icon && !this.element.querySelector('.to-icon')) {
      const icons = {
        'menu': '☰',
        'close': '✕',
        'search': '🔍',
        'user': '👤',
        'settings': '⚙️',
        'home': '🏠',
        'heart': '❤️',
        'star': '⭐',
        'bell': '🔔',
        'mail': '✉️',
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
        'chevron-down': '⌄',
        'more': '⋯',
        'grid': '▦',
        'list': '☰',
        'filter': '⚙️',
        'sort': '↕️'
      };
      
      const iconSpan = document.createElement('span');
      iconSpan.className = 'to-icon';
      iconSpan.textContent = icons[this.icon] || this.icon;
      this.element.appendChild(iconSpan);
    }
  }

  toggle() {
    this.active = !this.active;
    this.element.setAttribute('data-active', this.active);
  }

  setActive(active) {
    this.active = active;
    this.element.setAttribute('data-active', active);
  }

  setCount(count) {
    this.count = count;
    if (count) {
      this.element.setAttribute('data-count', count);
    } else {
      this.element.removeAttribute('data-count');
    }
  }

  setBadge(badge) {
    this.badge = badge;
    this.element.setAttribute('data-badge', badge);
  }

  setLoading(loading) {
    this.loading = loading;
    this.element.setAttribute('data-loading', loading);
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }

  setVariant(variant) {
    this.variant = variant;
    this.element.setAttribute('data-variant', variant);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-nav-icon').forEach(icon => {
    icon.navIconInstance = new TechOnNavIcon(icon);
  });
});