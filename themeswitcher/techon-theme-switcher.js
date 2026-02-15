class TechOnThemeSwitcher {
  constructor(element) {
    this.element = element;
    this.currentTheme = localStorage.getItem('techon-theme') || 'light';
    this.availableThemes = [
      { id: 'light', name: 'Light', icon: '☀️', preview: 'light' },
      { id: 'dark', name: 'Dark', icon: '🌙', preview: 'dark' },
      { id: 'high-contrast', name: 'High Contrast', icon: '⚫', preview: 'high-contrast' },
      { id: 'sepia', name: 'Sepia', icon: '📜', preview: 'sepia' }
    ];
    
    this.init();
    this.applyTheme(this.currentTheme);
  }

  init() {
    const type = this.element.dataset.type || 'buttons';
    
    if (type === 'buttons') {
      this.renderButtons();
    } else if (type === 'dropdown') {
      this.renderDropdown();
    }
  }

  renderButtons() {
    this.element.className = 'theme-switcher';
    
    this.availableThemes.forEach(theme => {
      const button = document.createElement('button');
      button.className = 'theme-switcher-button';
      if (theme.id === this.currentTheme) {
        button.classList.add('active');
      }
      
      button.innerHTML = `
        <span class="theme-switcher-icon">${theme.icon}</span>
        <span>${theme.name}</span>
      `;
      
      button.addEventListener('click', () => {
        this.setTheme(theme.id);
        this.element.querySelectorAll('.theme-switcher-button').forEach(btn => {
          btn.classList.remove('active');
        });
        button.classList.add('active');
      });
      
      this.element.appendChild(button);
    });
  }

  renderDropdown() {
    this.element.className = 'theme-switcher-dropdown';
    
    const currentThemeData = this.availableThemes.find(t => t.id === this.currentTheme);
    
    const trigger = document.createElement('button');
    trigger.className = 'theme-switcher-trigger';
    trigger.innerHTML = `
      <span class="theme-switcher-icon">${currentThemeData.icon}</span>
      <span>${currentThemeData.name}</span>
      <span style="margin-left: auto;">▼</span>
    `;
    
    const menu = document.createElement('div');
    menu.className = 'theme-switcher-menu';
    
    this.availableThemes.forEach(theme => {
      const option = document.createElement('div');
      option.className = 'theme-switcher-option';
      if (theme.id === this.currentTheme) {
        option.classList.add('active');
      }
      
      option.innerHTML = `
        <span class="theme-switcher-preview ${theme.preview}"></span>
        <span>${theme.name}</span>
        ${theme.id === this.currentTheme ? '<span style="margin-left: auto;">✓</span>' : ''}
      `;
      
      option.addEventListener('click', () => {
        this.setTheme(theme.id);
        menu.classList.remove('open');
        trigger.innerHTML = `
          <span class="theme-switcher-icon">${theme.icon}</span>
          <span>${theme.name}</span>
          <span style="margin-left: auto;">▼</span>
        `;
      });
      
      menu.appendChild(option);
    });
    
    trigger.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
    
    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target)) {
        menu.classList.remove('open');
      }
    });
    
    this.element.appendChild(trigger);
    this.element.appendChild(menu);
  }

  setTheme(themeId) {
    this.currentTheme = themeId;
    this.applyTheme(themeId);
    localStorage.setItem('techon-theme', themeId);
    
    // Dispatch event for other components
    const event = new CustomEvent('theme-change', {
      detail: { theme: themeId }
    });
    document.dispatchEvent(event);
  }

  applyTheme(themeId) {
    document.documentElement.setAttribute('data-theme', themeId);
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}

// Auto-initialize all theme switchers
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-theme-switcher').forEach(switcher => {
    switcher.themeSwitcherInstance = new TechOnThemeSwitcher(switcher);
  });
});

// Export for use in other components
window.TechOnThemeSwitcher = TechOnThemeSwitcher;