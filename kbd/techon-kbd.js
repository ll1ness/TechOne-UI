class TechOnKbd {
  constructor(element) {
    this.element = element;
    this.size = element.dataset.size || 'm';
    this.variant = element.dataset.variant || 'default';
    this.radius = element.dataset.radius || 'm';
    this.value = element.dataset.value || element.textContent.trim();
    
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-variant', this.variant);
    this.element.setAttribute('data-radius', this.radius);
    
    this.init();
  }

  init() {
    // Format common key names
    const keyMap = {
      'cmd': '⌘',
      'command': '⌘',
      'option': '⌥',
      'alt': '⌥',
      'shift': '⇧',
      'ctrl': '⌃',
      'control': '⌃',
      'enter': '↵',
      'return': '↵',
      'tab': '⇥',
      'space': '␣',
      'delete': '⌫',
      'del': '⌫',
      'escape': '⎋',
      'esc': '⎋',
      'up': '↑',
      'down': '↓',
      'left': '←',
      'right': '→',
      'pageup': '⇞',
      'pagedown': '⇟',
      'home': '↖',
      'end': '↘',
      'capslock': '⇪'
    };

    const key = this.value.toLowerCase();
    if (keyMap[key]) {
      this.element.textContent = keyMap[key];
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

  setValue(value) {
    this.value = value;
    this.element.textContent = value;
    this.init();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-kbd').forEach(kbd => {
    kbd.kbdInstance = new TechOnKbd(kbd);
  });
});