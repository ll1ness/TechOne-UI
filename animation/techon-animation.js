class TechOnAnimation {
  constructor(element) {
    this.element = element;
    this.trigger = element.querySelector('.to-animation-trigger');
    this.content = element.querySelector('.to-animation-content');
    this.triggerType = element.dataset.triggerType || 'hover';
    this.active = element.dataset.active === 'true';
    this.duration = parseInt(element.dataset.duration) || 300;
    this.easing = element.dataset.easing || 'ease-out';
    this.portal = element.dataset.portal === 'true';
    this.placement = element.dataset.placement || 'top';
    this.offset = parseInt(element.dataset.offset) || 8;
    
    if (!this.content) return;
    
    this.init();
  }

  init() {
    if (this.portal) {
      this.setupPortal();
    }

    this.setInitialStyles();
    
    if (!this.trigger) return;
    
    switch(this.triggerType) {
      case 'hover':
        this.setupHoverTrigger();
        break;
      case 'click':
        this.setupClickTrigger();
        break;
      case 'manual':
        this.setupManualTrigger();
        break;
    }
  }

  setInitialStyles() {
    const props = [];
    if (this.element.dataset.fade !== undefined) props.push('opacity');
    if (this.element.dataset.scale !== undefined || this.element.dataset.zoomIn !== undefined || this.element.dataset.zoomOut !== undefined) props.push('transform');
    if (this.element.dataset.blur !== undefined) props.push('filter');
    if (this.element.dataset.slideUp !== undefined || this.element.dataset.slideDown !== undefined || 
        this.element.dataset.slideLeft !== undefined || this.element.dataset.slideRight !== undefined) props.push('transform');
    
    if (props.length === 0) return;
    
    this.content.style.transitionProperty = props.join(', ');
    this.content.style.transitionDuration = `${this.duration}ms`;
    this.content.style.transitionTimingFunction = this.easing;
    
    this.applyAnimationState(false);
  }

  applyAnimationState(active) {
    const styles = {};
    
    if (this.element.dataset.fade !== undefined) {
      styles.opacity = active ? 1 : parseFloat(this.element.dataset.fade);
    }
    
    let transform = '';
    
    if (this.element.dataset.scale !== undefined) {
      transform = active ? 'scale(1)' : `scale(${this.element.dataset.scale})`;
    }
    
    if (this.element.dataset.zoomIn !== undefined) {
      transform = active ? 'scale(1)' : `scale(${1/parseFloat(this.element.dataset.zoomIn)})`;
    }
    
    if (this.element.dataset.zoomOut !== undefined) {
      transform = active ? 'scale(1)' : `scale(${this.element.dataset.zoomOut})`;
    }
    
    if (this.element.dataset.blur !== undefined) {
      styles.filter = active ? 'blur(0)' : `blur(${this.element.dataset.blur}px)`;
    }
    
    let translateX = 0, translateY = 0;
    if (this.element.dataset.slideUp !== undefined) {
      translateY = active ? 0 : -parseFloat(this.element.dataset.slideUp) * 20;
    }
    if (this.element.dataset.slideDown !== undefined) {
      translateY = active ? 0 : parseFloat(this.element.dataset.slideDown) * 20;
    }
    if (this.element.dataset.slideLeft !== undefined) {
      translateX = active ? 0 : -parseFloat(this.element.dataset.slideLeft) * 20;
    }
    if (this.element.dataset.slideRight !== undefined) {
      translateX = active ? 0 : parseFloat(this.element.dataset.slideRight) * 20;
    }
    
    if (translateX !== 0 || translateY !== 0) {
      transform = `${transform} translate(${translateX}px, ${translateY}px)`.trim();
    }
    
    if (transform) {
      styles.transform = transform;
    }
    
    Object.assign(this.content.style, styles);
  }

  setupHoverTrigger() {
    if (!this.trigger) return;
    this.trigger.addEventListener('mouseenter', () => {
      this.applyAnimationState(true);
    });
    
    this.trigger.addEventListener('mouseleave', () => {
      this.applyAnimationState(false);
    });
  }

  setupClickTrigger() {
    if (!this.trigger) return;
    this.trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.active = !this.active;
      this.applyAnimationState(this.active);
    });
  }

  setupManualTrigger() {
    if (this.active) {
      this.applyAnimationState(true);
    }
  }

  setupPortal() {
    const portal = document.createElement('div');
    portal.className = 'to-animation-portal';
    portal.style.position = 'fixed';
    portal.style.zIndex = '9999';
    portal.style.pointerEvents = 'none';
    portal.style.display = 'none';
    
    const contentClone = this.content.cloneNode(true);
    contentClone.classList.add('to-animation-content');
    portal.appendChild(contentClone);
    document.body.appendChild(portal);
    
    this.portalContent = contentClone;
    
    if (!this.trigger) return;
    
    this.trigger.addEventListener('mouseenter', () => {
      portal.style.display = 'block';
      this.updatePortalPosition();
      requestAnimationFrame(() => {
        this.applyPortalAnimation(true);
      });
    });
    
    this.trigger.addEventListener('mouseleave', () => {
      this.applyPortalAnimation(false);
      setTimeout(() => {
        portal.style.display = 'none';
      }, this.duration);
    });
    
    window.addEventListener('scroll', () => this.updatePortalPosition());
    window.addEventListener('resize', () => this.updatePortalPosition());
  }

  updatePortalPosition() {
    if (!this.portalContent || !this.trigger) return;
    
    const triggerRect = this.trigger.getBoundingClientRect();
    const contentRect = this.portalContent.getBoundingClientRect();
    
    let top = 0, left = 0;
    
    switch(this.placement) {
      case 'top':
        top = triggerRect.top - contentRect.height - this.offset;
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        break;
      case 'top-start':
        top = triggerRect.top - contentRect.height - this.offset;
        left = triggerRect.left;
        break;
      case 'top-end':
        top = triggerRect.top - contentRect.height - this.offset;
        left = triggerRect.right - contentRect.width;
        break;
      case 'bottom':
        top = triggerRect.bottom + this.offset;
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        break;
      case 'bottom-start':
        top = triggerRect.bottom + this.offset;
        left = triggerRect.left;
        break;
      case 'bottom-end':
        top = triggerRect.bottom + this.offset;
        left = triggerRect.right - contentRect.width;
        break;
    }
    
    this.portalContent.style.position = 'fixed';
    this.portalContent.style.top = `${top}px`;
    this.portalContent.style.left = `${left}px`;
  }

  applyPortalAnimation(active) {
    if (!this.portalContent) return;
    
    const styles = {
      transition: `all ${this.duration}ms ${this.easing}`
    };
    
    if (this.element.dataset.fade !== undefined) {
      styles.opacity = active ? 1 : parseFloat(this.element.dataset.fade);
    }
    
    let transform = '';
    if (this.element.dataset.scale !== undefined) {
      transform = active ? 'scale(1)' : `scale(${this.element.dataset.scale})`;
    }
    
    let translateY = 0;
    if (this.element.dataset.slideUp !== undefined) {
      translateY = active ? 0 : -parseFloat(this.element.dataset.slideUp) * 10;
    }
    if (this.element.dataset.slideDown !== undefined) {
      translateY = active ? 0 : parseFloat(this.element.dataset.slideDown) * 10;
    }
    
    if (translateY !== 0) {
      transform = `${transform} translateY(${translateY}px)`.trim();
    }
    
    if (transform) {
      styles.transform = transform;
    }
    
    Object.assign(this.portalContent.style, styles);
  }

  setActive(active) {
    if (this.triggerType === 'manual') {
      this.active = active;
      this.element.dataset.active = active;
      this.applyAnimationState(active);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-animation').forEach(anim => {
    anim.animationInstance = new TechOnAnimation(anim);
  });
});