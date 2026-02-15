class TechOnToast {
  constructor() {
    this.container = null;
    this.toasts = [];
    this.defaultDuration = 5000;
    this.maxToasts = 5;
    this.position = 'bottom-right';
    
    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.className = 'to-toast-container';
    this.container.setAttribute('data-position', this.position);
    document.body.appendChild(this.container);
  }

  show(options) {
    const {
      variant = 'info',
      title = '',
      description = '',
      duration = this.defaultDuration,
      icon = true,
      action = null,
      onClose = null
    } = options;

    const toast = document.createElement('div');
    toast.className = 'to-toast';
    toast.setAttribute('data-variant', variant);
    
    // Icon
    if (icon) {
      const iconMap = {
        success: '✓',
        danger: '✕',
        warning: '⚠',
        info: 'ℹ'
      };
      
      const iconEl = document.createElement('span');
      iconEl.className = 'to-toast-icon';
      iconEl.textContent = iconMap[variant] || '•';
      toast.appendChild(iconEl);
    }
    
    // Content
    const contentEl = document.createElement('div');
    contentEl.className = 'to-toast-content';
    
    if (title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'to-toast-title';
      titleEl.textContent = title;
      contentEl.appendChild(titleEl);
    }
    
    if (description) {
      const descEl = document.createElement('div');
      descEl.className = 'to-toast-description';
      descEl.textContent = description;
      contentEl.appendChild(descEl);
    }
    
    toast.appendChild(contentEl);
    
    // Action button
    if (action) {
      const actionEl = document.createElement('button');
      actionEl.className = 'to-toast-action';
      actionEl.textContent = action.label;
      actionEl.addEventListener('click', () => {
        action.onClick();
        this.close(toast);
      });
      toast.appendChild(actionEl);
    }
    
    // Close button
    const closeEl = document.createElement('button');
    closeEl.className = 'to-toast-close';
    closeEl.innerHTML = '✕';
    closeEl.addEventListener('click', () => this.close(toast));
    toast.appendChild(closeEl);
    
    // Add to container
    this.container.appendChild(toast);
    this.toasts.push(toast);
    
    // Auto close
    if (duration > 0) {
      setTimeout(() => this.close(toast), duration);
    }
    
    // Limit max toasts
    if (this.toasts.length > this.maxToasts) {
      const oldest = this.toasts.shift();
      this.close(oldest);
    }
    
    return toast;
  }

  success(title, description, duration) {
    return this.show({ variant: 'success', title, description, duration });
  }

  error(title, description, duration) {
    return this.show({ variant: 'danger', title, description, duration });
  }

  warning(title, description, duration) {
    return this.show({ variant: 'warning', title, description, duration });
  }

  info(title, description, duration) {
    return this.show({ variant: 'info', title, description, duration });
  }

  close(toast) {
    if (!toast) return;
    
    toast.setAttribute('data-closing', 'true');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
        const index = this.toasts.indexOf(toast);
        if (index > -1) this.toasts.splice(index, 1);
      }
    }, 300);
  }

  closeAll() {
    this.toasts.forEach(toast => this.close(toast));
  }

  setPosition(position) {
    this.position = position;
    this.container.setAttribute('data-position', position);
  }
}

// Create global instance
const toast = new TechOnToast();