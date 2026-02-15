class TechOnContextMenu {
  constructor(options = {}) {
    this.options = options;
    this.menu = null;
    this.target = null;
    this.init();
  }

  init() {
    this.createMenu();
    this.bindEvents();
  }

  createMenu() {
    this.menu = document.createElement('div');
    this.menu.className = 'to-context-menu';
    
    if (this.options.theme) {
      this.menu.setAttribute('data-theme', this.options.theme);
    }
    
    document.body.appendChild(this.menu);
  }

  bindEvents() {
    // Prevent default context menu
    document.addEventListener('contextmenu', (e) => {
      const target = e.target.closest('[data-context-menu]');
      
      if (target) {
        e.preventDefault();
        this.show(e, target);
      }
    });

    // Hide on click outside
    document.addEventListener('click', () => {
      this.hide();
    });

    // Hide on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hide();
      }
    });

    // Hide on scroll
    window.addEventListener('scroll', () => {
      this.hide();
    });

    // Hide on resize
    window.addEventListener('resize', () => {
      this.hide();
    });
  }

  show(e, target) {
    this.target = target;
    this.buildMenu(target.dataset.contextMenu);
    
    const x = e.clientX;
    const y = e.clientY;
    
    this.menu.style.left = `${x}px`;
    this.menu.style.top = `${y}px`;
    this.menu.classList.add('visible');
    
    // Ensure menu stays within viewport
    const rect = this.menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      this.menu.style.left = `${window.innerWidth - rect.width}px`;
    }
    if (rect.bottom > window.innerHeight) {
      this.menu.style.top = `${window.innerHeight - rect.height}px`;
    }
  }

  hide() {
    this.menu.classList.remove('visible');
  }

  buildMenu(menuType) {
    this.menu.innerHTML = '';
    
    const items = this.getMenuItems(menuType);
    items.forEach(item => this.addMenuItem(item));
  }

  addMenuItem(item) {
    if (item.divider) {
      const divider = document.createElement('div');
      divider.className = 'to-context-menu-divider';
      this.menu.appendChild(divider);
      return;
    }

    const itemEl = document.createElement('div');
    itemEl.className = 'to-context-menu-item';
    
    if (item.disabled) {
      itemEl.classList.add('disabled');
    }
    
    if (item.icon) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'to-context-menu-icon';
      iconSpan.textContent = item.icon;
      itemEl.appendChild(iconSpan);
    }
    
    const textSpan = document.createElement('span');
    textSpan.textContent = item.label;
    itemEl.appendChild(textSpan);
    
    if (item.shortcut) {
      const shortcutSpan = document.createElement('span');
      shortcutSpan.className = 'to-context-menu-shortcut';
      shortcutSpan.textContent = item.shortcut;
      itemEl.appendChild(shortcutSpan);
    }
    
    if (!item.disabled) {
      itemEl.addEventListener('click', () => {
        if (item.action) {
          item.action(this.target);
        }
        this.hide();
      });
    }
    
    this.menu.appendChild(itemEl);
  }

  getMenuItems(menuType) {
    // Default menu items based on type
    const menus = {
      'default': [
        { label: 'Cut', shortcut: 'Ctrl+X', icon: '✂️' },
        { label: 'Copy', shortcut: 'Ctrl+C', icon: '📋' },
        { label: 'Paste', shortcut: 'Ctrl+V', icon: '📌' },
        { divider: true },
        { label: 'Delete', shortcut: 'Del', icon: '🗑️' },
        { divider: true },
        { label: 'Select All', shortcut: 'Ctrl+A', icon: '✓' }
      ],
      
      'link': [
        { label: 'Open Link', icon: '🔗' },
        { label: 'Open in New Tab', icon: '↗️' },
        { divider: true },
        { label: 'Copy Link Address', icon: '📋' },
        { label: 'Copy Link Text', icon: '✂️' },
        { divider: true },
        { label: 'Save Link As...', icon: '💾' }
      ],
      
      'image': [
        { label: 'Save Image', icon: '💾' },
        { label: 'Copy Image', icon: '📋' },
        { label: 'Copy Image Address', icon: '🔗' },
        { divider: true },
        { label: 'Open Image in New Tab', icon: '↗️' },
        { divider: true },
        { label: 'Search Image', icon: '🔍' }
      ],
      
      'text': [
        { label: 'Cut', shortcut: 'Ctrl+X', icon: '✂️' },
        { label: 'Copy', shortcut: 'Ctrl+C', icon: '📋' },
        { label: 'Paste', shortcut: 'Ctrl+V', icon: '📌' },
        { divider: true },
        { label: 'Select All', shortcut: 'Ctrl+A', icon: '✓' }
      ],
      
      'folder': [
        { label: 'Open', icon: '📂' },
        { label: 'Open in New Tab', icon: '↗️' },
        { divider: true },
        { label: 'Cut', icon: '✂️' },
        { label: 'Copy', icon: '📋' },
        { label: 'Paste', icon: '📌' },
        { divider: true },
        { label: 'Rename', icon: '✏️' },
        { label: 'Delete', icon: '🗑️' }
      ]
    };
    
    return menus[menuType] || menus.default;
  }

  addCustomMenu(menuType, items) {
    this.menus[menuType] = items;
  }
}

// Global instance
const contextMenu = new TechOnContextMenu();