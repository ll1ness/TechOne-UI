class TechOnAvatar {
  constructor(element) {
    this.element = element;
    this.size = element.dataset.size || 'm';
    this.value = element.dataset.value;
    this.src = element.dataset.src;
    this.icon = element.dataset.icon;
    this.empty = element.dataset.empty === 'true';
    this.loading = element.dataset.loading === 'true';
    
    this.element.setAttribute('data-size', this.size);
    
    if (this.empty) {
      this.element.setAttribute('data-empty', 'true');
    }
    
    if (this.loading) {
      this.element.setAttribute('data-loading', 'true');
    }
    
    if (this.src) {
      const img = document.createElement('img');
      img.src = this.src;
      img.alt = 'avatar';
      this.element.innerHTML = '';
      this.element.appendChild(img);
    } else if (this.icon) {
      this.element.innerHTML = `<span class="to-icon">${this.icon}</span>`;
    } else if (this.value && !this.empty) {
      this.element.textContent = this.value.charAt(0).toUpperCase();
    }
    
    this.initStatusIndicator();
  }

  initStatusIndicator() {
    const statusData = this.element.dataset.statusIndicator;
    if (!statusData) return;
    
    try {
      const status = JSON.parse(statusData);
      const indicator = document.createElement('span');
      indicator.className = 'to-avatar-status';
      indicator.setAttribute('data-color', status.color);
      this.element.appendChild(indicator);
    } catch (e) {}
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }

  setLoading(loading) {
    this.loading = loading;
    this.element.setAttribute('data-loading', loading);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-avatar').forEach(avatar => {
    avatar.avatarInstance = new TechOnAvatar(avatar);
  });
});