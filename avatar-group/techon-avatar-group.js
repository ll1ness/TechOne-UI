class TechOnAvatarGroup {
  constructor(element) {
    this.element = element;
    this.size = element.dataset.size || 'm';
    this.reverse = element.dataset.reverse === 'true';
    this.limit = parseInt(element.dataset.limit) || null;
    this.avatars = [];
    
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-reverse', this.reverse);
    
    this.init();
  }

  init() {
    const avatarsData = this.element.dataset.avatars;
    if (!avatarsData) return;
    
    try {
      const avatars = JSON.parse(avatarsData);
      this.renderAvatars(avatars);
    } catch (e) {}
  }

  renderAvatars(avatars) {
    this.element.innerHTML = '';
    const displayAvatars = this.limit ? avatars.slice(0, this.limit) : avatars;
    const remaining = this.limit ? avatars.length - this.limit : 0;
    
    displayAvatars.forEach(avatarData => {
      const avatar = this.createAvatar(avatarData);
      this.element.appendChild(avatar);
    });
    
    if (remaining > 0) {
      const countElement = document.createElement('span');
      countElement.className = 'to-avatar-group-count';
      countElement.textContent = `+${remaining}`;
      this.element.appendChild(countElement);
    }
  }

  createAvatar(data) {
    const avatar = document.createElement('div');
    avatar.className = 'to-avatar';
    avatar.setAttribute('data-size', this.size);
    
    if (data.src) {
      const img = document.createElement('img');
      img.src = data.src;
      img.alt = 'avatar';
      avatar.appendChild(img);
    } else if (data.value) {
      avatar.textContent = data.value.charAt(0).toUpperCase();
    } else if (data.empty) {
      avatar.setAttribute('data-empty', 'true');
    }
    
    if (data.statusIndicator) {
      const indicator = document.createElement('span');
      indicator.className = 'to-avatar-status';
      indicator.setAttribute('data-color', data.statusIndicator.color);
      avatar.appendChild(indicator);
    }
    
    return avatar;
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }

  setReverse(reverse) {
    this.reverse = reverse;
    this.element.setAttribute('data-reverse', reverse);
  }

  setLimit(limit) {
    this.limit = limit;
    const avatarsData = this.element.dataset.avatars;
    if (avatarsData) {
      try {
        const avatars = JSON.parse(avatarsData);
        this.renderAvatars(avatars);
      } catch (e) {}
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-avatar-group').forEach(group => {
    group.avatarGroupInstance = new TechOnAvatarGroup(group);
  });
});