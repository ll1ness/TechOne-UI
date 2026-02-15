class TechOnCarousel {
  constructor(element) {
    this.element = element;
    this.track = element.querySelector('.to-carousel-track');
    this.slides = Array.from(element.querySelectorAll('.to-carousel-slide'));
    this.prevBtn = element.querySelector('.to-carousel-control.prev');
    this.nextBtn = element.querySelector('.to-carousel-control.next');
    this.dots = Array.from(element.querySelectorAll('.to-carousel-dot'));
    
    this.currentIndex = 0;
    this.slideCount = this.slides.length;
    this.autoplay = element.dataset.autoplay === 'true';
    this.interval = parseInt(element.dataset.interval) || 3000;
    this.loop = element.dataset.loop === 'true';
    this.autoplayInterval = null;
    
    this.init();
  }

  init() {
    this.updateSlides();
    this.updateDots();
    
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }
    
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goTo(index));
    });
    
    if (this.autoplay) {
      this.startAutoplay();
      this.element.addEventListener('mouseenter', () => this.stopAutoplay());
      this.element.addEventListener('mouseleave', () => this.startAutoplay());
    }
  }

  updateSlides() {
    if (this.track) {
      this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }
  }

  updateDots() {
    this.dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  next() {
    if (this.currentIndex < this.slideCount - 1) {
      this.currentIndex++;
    } else if (this.loop) {
      this.currentIndex = 0;
    }
    this.updateSlides();
    this.updateDots();
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else if (this.loop) {
      this.currentIndex = this.slideCount - 1;
    }
    this.updateSlides();
    this.updateDots();
  }

  goTo(index) {
    if (index >= 0 && index < this.slideCount) {
      this.currentIndex = index;
      this.updateSlides();
      this.updateDots();
    }
  }

  startAutoplay() {
    if (this.autoplayInterval) return;
    this.autoplayInterval = setInterval(() => this.next(), this.interval);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-carousel').forEach(carousel => {
    carousel.carouselInstance = new TechOnCarousel(carousel);
  });
});