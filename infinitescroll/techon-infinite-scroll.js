class TechOnInfiniteScroll {
  constructor(element) {
    this.element = element;
    this.content = element.querySelector('.to-infinite-scroll-content');
    this.loader = element.querySelector('.to-infinite-scroll-loader');
    this.endMessage = element.querySelector('.to-infinite-scroll-end');
    this.errorMessage = element.querySelector('.to-infinite-scroll-error');
    
    this.threshold = parseInt(element.dataset.threshold) || 100;
    this.hasMore = element.dataset.hasMore !== 'false';
    this.loading = false;
    this.hasError = false;
    this.page = 1;
    this.loadMore = this.createLoadMoreFunction();
    
    this.init();
  }

  init() {
    if (!this.loader) {
      this.loader = document.createElement('div');
      this.loader.className = 'to-infinite-scroll-loader';
      const spinner = document.createElement('div');
      spinner.className = 'to-infinite-scroll-spinner';
      this.loader.appendChild(spinner);
      this.element.appendChild(this.loader);
    }
    
    this.loader.style.display = 'none';
    
    if (this.endMessage) {
      this.endMessage.style.display = 'none';
    }
    
    if (this.errorMessage) {
      this.errorMessage.style.display = 'none';
    }
    
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        root: null,
        rootMargin: `0px 0px ${this.threshold}px 0px`,
        threshold: 0
      }
    );
    
    this.observer.observe(this.loader);
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && this.hasMore && !this.loading && !this.hasError) {
        this.load();
      }
    });
  }

  createLoadMoreFunction() {
    // Default implementation - override by setting data-load-more attribute
    const customFunction = this.element.dataset.loadMore;
    if (customFunction && window[customFunction]) {
      return window[customFunction];
    }
    
    // Default: simulate loading more content
    return (page) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newContent = Array.from({ length: 5 }, (_, i) => {
            const item = document.createElement('div');
            item.className = 'infinite-item';
            item.innerHTML = `
              <div style="padding: 20px; background: #f5f5f5; border-radius: 8px; margin-bottom: 10px;">
                <h4>Item ${page * 5 + i + 1}</h4>
                <p>Loaded dynamically on page ${page}</p>
              </div>
            `;
            return item;
          });
          
          resolve({
            items: newContent,
            hasMore: page < 5 // Stop after 5 pages
          });
        }, 1000);
      });
    };
  }

  async load() {
    this.loading = true;
    this.hasError = false;
    this.loader.style.display = 'flex';
    
    if (this.errorMessage) {
      this.errorMessage.style.display = 'none';
    }
    
    try {
      const result = await this.loadMore(this.page);
      
      result.items.forEach(item => {
        if (typeof item === 'string') {
          this.content.insertAdjacentHTML('beforeend', item);
        } else {
          this.content.appendChild(item);
        }
      });
      
      this.hasMore = result.hasMore;
      this.page++;
      
      if (!this.hasMore && this.endMessage) {
        this.endMessage.style.display = 'block';
      }
      
    } catch (error) {
      this.hasError = true;
      if (this.errorMessage) {
        this.errorMessage.style.display = 'block';
      } else {
        const errorEl = document.createElement('div');
        errorEl.className = 'to-infinite-scroll-error';
        errorEl.innerHTML = `
          Error loading more items. 
          <button class="to-infinite-scroll-retry" onclick="this.closest('.to-infinite-scroll').infiniteScrollInstance.load()">Retry</button>
        `;
        this.element.appendChild(errorEl);
      }
    } finally {
      this.loading = false;
      this.loader.style.display = this.hasMore ? 'flex' : 'none';
    }
  }

  reset() {
    this.page = 1;
    this.hasMore = true;
    this.hasError = false;
    this.content.innerHTML = '';
    this.loader.style.display = 'flex';
    if (this.endMessage) {
      this.endMessage.style.display = 'none';
    }
    if (this.errorMessage) {
      this.errorMessage.style.display = 'none';
    }
  }

  setLoadMore(fn) {
    this.loadMore = fn;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-infinite-scroll').forEach(scroll => {
    scroll.infiniteScrollInstance = new TechOnInfiniteScroll(scroll);
  });
});