class TechOnOgCard {
  constructor(element) {
    this.element = element;
    this.url = element.dataset.url;
    this.variant = element.dataset.variant || 'default';
    this.theme = element.dataset.theme || 'light';
    this.noImage = element.dataset.noImage === 'true';
    
    this.element.setAttribute('data-variant', this.variant);
    this.element.setAttribute('data-theme', this.theme);
    this.element.setAttribute('data-no-image', this.noImage);
    
    this.init();
  }

  init() {
    if (this.url) {
      this.fetchOgData();
    }
    
    this.element.addEventListener('click', () => {
      if (this.url) {
        window.open(this.url, '_blank');
      }
    });
  }

  async fetchOgData() {
    this.element.classList.add('loading');
    
    // In a real implementation, you'd fetch from a backend service
    // This is a mock implementation
    setTimeout(() => {
      this.element.classList.remove('loading');
      this.renderMockData();
    }, 1500);
  }

  renderMockData() {
    const data = {
      title: 'Example Domain',
      description: 'This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.',
      image: 'https://picsum.photos/600/200',
      siteName: 'Example.com',
      favicon: '🔗',
      domain: 'example.com',
      date: '2024-01-15',
      author: 'John Doe',
      readingTime: '5 min read'
    };
    
    const imageEl = this.element.querySelector('.to-og-image');
    if (imageEl) {
      imageEl.src = data.image;
      imageEl.alt = data.title;
    }
    
    const titleEl = this.element.querySelector('.to-og-title');
    if (titleEl) {
      titleEl.textContent = data.title;
    }
    
    const descEl = this.element.querySelector('.to-og-description');
    if (descEl) {
      descEl.textContent = data.description;
    }
    
    const domainEl = this.element.querySelector('.to-og-domain');
    if (domainEl) {
      domainEl.textContent = data.domain;
    }
    
    const faviconEl = this.element.querySelector('.to-og-favicon');
    if (faviconEl) {
      faviconEl.textContent = data.favicon;
    }
    
    const metaItems = this.element.querySelectorAll('.to-og-meta-item');
    if (metaItems.length >= 3) {
      metaItems[0].innerHTML = '<span class="to-og-meta-icon">📅</span> ' + data.date;
      metaItems[1].innerHTML = '<span class="to-og-meta-icon">👤</span> ' + data.author;
      metaItems[2].innerHTML = '<span class="to-og-meta-icon">⏱️</span> ' + data.readingTime;
    }
  }

  setVariant(variant) {
    this.variant = variant;
    this.element.setAttribute('data-variant', variant);
  }

  setTheme(theme) {
    this.theme = theme;
    this.element.setAttribute('data-theme', theme);
  }

  setUrl(url) {
    this.url = url;
    this.fetchOgData();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-og-card').forEach(card => {
    card.ogCardInstance = new TechOnOgCard(card);
  });
});