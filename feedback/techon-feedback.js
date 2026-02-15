class TechOnFeedback {
  constructor() {
    this.toastContainer = null;
    this.toasts = [];
    this.init();
  }

  init() {
    this.createToastContainer();
  }

  createToastContainer() {
    this.toastContainer = document.createElement('div');
    this.toastContainer.className = 'to-feedback-toast-container';
    document.body.appendChild(this.toastContainer);
  }

  toast(options) {
    const {
      type = 'info',
      title = '',
      message = '',
      duration = 5000,
      icon = true
    } = options;

    const toast = document.createElement('div');
    toast.className = `to-feedback-toast ${type}`;

    const iconMap = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };

    toast.innerHTML = `
      ${icon ? `<div class="to-feedback-toast-icon">${iconMap[type] || '•'}</div>` : ''}
      <div class="to-feedback-toast-content">
        ${title ? `<div class="to-feedback-toast-title">${title}</div>` : ''}
        ${message ? `<div class="to-feedback-toast-message">${message}</div>` : ''}
      </div>
      <button class="to-feedback-toast-close">✕</button>
    `;

    const closeBtn = toast.querySelector('.to-feedback-toast-close');
    closeBtn.addEventListener('click', () => this.closeToast(toast));

    this.toastContainer.appendChild(toast);
    this.toasts.push(toast);

    if (duration > 0) {
      setTimeout(() => this.closeToast(toast), duration);
    }

    return toast;
  }

  closeToast(toast) {
    toast.style.animation = 'to-feedback-slide-in 0.3s reverse';
    setTimeout(() => {
      toast.remove();
      this.toasts = this.toasts.filter(t => t !== toast);
    }, 300);
  }

  success(title, message, duration) {
    return this.toast({ type: 'success', title, message, duration });
  }

  error(title, message, duration) {
    return this.toast({ type: 'error', title, message, duration });
  }

  warning(title, message, duration) {
    return this.toast({ type: 'warning', title, message, duration });
  }

  info(title, message, duration) {
    return this.toast({ type: 'info', title, message, duration });
  }

  alert(options) {
    const {
      type = 'info',
      title = '',
      message = '',
      dismissible = true,
      icon = true
    } = options;

    const alert = document.createElement('div');
    alert.className = `to-feedback-alert ${type}`;

    const iconMap = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };

    alert.innerHTML = `
      ${icon ? `<div class="to-feedback-alert-icon">${iconMap[type] || '•'}</div>` : ''}
      <div class="to-feedback-alert-content">
        ${title ? `<div class="to-feedback-alert-title">${title}</div>` : ''}
        ${message ? `<div class="to-feedback-alert-message">${message}</div>` : ''}
      </div>
      ${dismissible ? '<button class="to-feedback-alert-close">✕</button>' : ''}
    `;

    if (dismissible) {
      const closeBtn = alert.querySelector('.to-feedback-alert-close');
      closeBtn.addEventListener('click', () => alert.remove());
    }

    return alert;
  }

  inline(type, message, icon = true) {
    const el = document.createElement('div');
    el.className = `to-feedback-inline ${type}`;

    const iconMap = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };

    el.innerHTML = `
      ${icon ? `<span>${iconMap[type] || '•'}</span>` : ''}
      <span>${message}</span>
    `;

    return el;
  }

  validation(type, message) {
    const el = document.createElement('div');
    el.className = `to-feedback-validation ${type}`;

    const iconMap = {
      success: '✓',
      error: '✕',
      warning: '⚠'
    };

    el.innerHTML = `<span>${iconMap[type] || '•'}</span> ${message}`;
    return el;
  }

  progress(value, max = 100, label = true) {
    const container = document.createElement('div');
    container.className = 'to-feedback-progress';

    const bar = document.createElement('div');
    bar.className = 'to-feedback-progress-bar';

    const fill = document.createElement('div');
    fill.className = 'to-feedback-progress-fill';
    fill.style.width = `${(value / max) * 100}%`;

    bar.appendChild(fill);
    container.appendChild(bar);

    if (label) {
      const text = document.createElement('div');
      text.className = 'to-feedback-progress-text';
      text.textContent = `${Math.round((value / max) * 100)}%`;
      container.appendChild(text);
    }

    return container;
  }

  empty(options = {}) {
    const {
      icon = '📭',
      title = 'No data',
      message = 'There is nothing to display yet.',
      action = null
    } = options;

    const el = document.createElement('div');
    el.className = 'to-feedback-empty';

    el.innerHTML = `
      <div class="to-feedback-empty-icon">${icon}</div>
      <div class="to-feedback-empty-title">${title}</div>
      <div class="to-feedback-empty-message">${message}</div>
      ${action ? `<button class="to-button" onclick="${action}">${action}</button>` : ''}
    `;

    return el;
  }

  skeleton(lines = 3) {
    const el = document.createElement('div');
    el.className = 'to-feedback-skeleton';

    for (let i = 0; i < lines; i++) {
      const line = document.createElement('div');
      line.className = 'to-feedback-skeleton-line';
      line.style.width = `${Math.random() * 40 + 60}%`;
      el.appendChild(line);
    }

    return el;
  }
}

const feedback = new TechOnFeedback();