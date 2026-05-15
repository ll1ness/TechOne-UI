// ============================================
// TechOn UI - Main JavaScript
// Mobile Navigation, Smooth Scroll, Scroll to Top
// ============================================

// ============================================
// Build Check - Verify build exists before loading
// ============================================
function checkBuildExists() {
  if (document.getElementById('techon-ui-styles') || document.querySelector('script[src*="techon-ui.min.js"]')) {
    console.log('TechOne UI build found ✓');
    return;
  }

  const script = document.createElement('script');
  script.src = './build/techon-ui.min.js';

  script.onload = function() {
    console.log('TechOne UI build loaded ✓');
  };

  script.onerror = function() {
    showBuildMissingOverlay();
  };

  document.head.appendChild(script);
}

function showBuildMissingOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'build-missing-overlay';
  overlay.innerHTML = `
    <style>
      #build-missing-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #0a0a0f;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        font-family: 'Courier New', monospace;
      }
      .build-missing-card {
        background: #12121a;
        border: 1px solid #27272a;
        border-radius: 8px;
        padding: 32px;
        max-width: 480px;
        text-align: center;
      }
      .build-missing-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }
      .build-missing-title {
        color: #ef4444;
        font-size: 20px;
        margin: 0 0 8px;
        letter-spacing: 0.05em;
      }
      .build-missing-desc {
        color: #a1a1aa;
        font-size: 14px;
        margin: 0 0 24px;
        line-height: 1.6;
      }
      .build-missing-code {
        background: #0a0a0f;
        border: 1px solid #27272a;
        border-radius: 4px;
        padding: 12px 16px;
        margin: 0 0 24px;
        text-align: left;
      }
      .build-missing-code code {
        color: #10b981;
        font-size: 13px;
      }
      .build-missing-note {
        color: #71717a;
        font-size: 12px;
        margin: 0;
      }
    </style>
    <div class="build-missing-card">
      <div class="build-missing-icon">⚠</div>
      <h1 class="build-missing-title">СБОРКА НЕ НАЙДЕНА</h1>
      <p class="build-missing-desc">
        Файл <code style="color:#f59e0b">build/techon-ui.min.js</code> отсутствует.
        Перед запуском сайта необходимо собрать проект.
      </p>
      <div class="build-missing-code">
        <code>bash build.sh</code>
      </div>
      <p class="build-missing-note">
        После сборки обновите страницу (Ctrl+R / Cmd+R)
      </p>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
}

if (document.getElementById('techon-ui-styles')) {
  console.log('TechOne UI build found ✓');
} else if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkBuildExists);
} else {
  checkBuildExists();
}

// Mobile Navigation Toggle (Hamburger Menu)
function setupMobileNav() {
  const toggle = document.querySelector('.site-nav__toggle');
  const nav = document.querySelector('.site-nav');

  if (!toggle || !nav) return;

  // Set initial ARIA states
  toggle.setAttribute('aria-expanded', 'false');
  nav.setAttribute('aria-hidden', 'true');

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

    toggle.setAttribute('aria-expanded', !isExpanded);
    nav.setAttribute('aria-hidden', isExpanded);

    // Prevent body scroll when menu is open
    if (!isExpanded) {
      document.body.style.overflow = 'hidden';
      // Add overlay effect
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    }
  });

  // Close menu when clicking on a link
  const navLinks = nav.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
      }
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.click();
      toggle.focus();
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (toggle.getAttribute('aria-expanded') === 'true') {
      const isClickInside = nav.contains(e.target) || toggle.contains(e.target);
      if (!isClickInside) {
        toggle.click();
      }
    }
  });

  // Handle touch gestures for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  nav.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  nav.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - close menu
      if (toggle.getAttribute('aria-expanded') === 'true') {
        toggle.click();
      }
    }
  }
}

// Плавный скролл по якорям
function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();

      if ('scrollIntoView' in targetElement) {
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      } else {
        window.location.hash = targetId;
      }
    });
  });
}

// Подсветка активного пункта меню по секции
function setupActiveNav() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.site-nav__list a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const sectionById = {};
  sections.forEach((section) => {
    sectionById[`#${section.id}`] = section;
  });

  function updateActiveLink() {
    let currentId = null;
    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
    const offset = headerHeight + 20;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top - offset <= 0 && rect.bottom > offset) {
        currentId = `#${section.id}`;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href === currentId) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink, { passive: true });
}

// Scroll to top button functionality
function setupScrollToTop() {
  const scrollBtn = document.querySelector('.to-scroll-top');
  if (!scrollBtn) return;

  const threshold = parseInt(scrollBtn.getAttribute('data-threshold')) || 400;

  function toggleVisibility() {
    if (window.pageYOffset > threshold) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();
}

// Текущий год в подвале
function setupFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (!yearEl) return;
  yearEl.textContent = new Date().getFullYear().toString();
}

// Lazy loading for images (fallback for browsers that don't support native)
function setupLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach((img) => {
      img.classList.add('loaded');
    });
  } else {
    // Fallback for older browsers
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach((img) => {
        imageObserver.observe(img);
      });
    } else {
      // Last resort: load all images immediately
      lazyImages.forEach((img) => {
        img.classList.add('loaded');
      });
    }
  }
}

// Prevent horizontal scroll on resize
function preventHorizontalScroll() {
  let lastScrollX = window.scrollX;
  window.addEventListener('scroll', () => {
    if (Math.abs(window.scrollX - lastScrollX) > 5) {
      window.scrollTo(0, lastScrollX);
    }
  }, { passive: false });
}

// Responsive font size adjustment based on viewport
function setupResponsiveTypography() {
  function adjustFontSize() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    
    // Adjust base font size for very small screens
    if (vw < 480) {
      document.documentElement.style.fontSize = '14px';
    } else if (vw < 768) {
      document.documentElement.style.fontSize = '15px';
    } else if (vw < 1024) {
      document.documentElement.style.fontSize = '16px';
    } else {
      document.documentElement.style.fontSize = '16px';
    }
  }

  // Initial adjustment
  adjustFontSize();
  
  // Adjust on resize
  window.addEventListener('resize', debounce(adjustFontSize, 100));
}

// Handle viewport meta tag for responsive design
function setupViewportMeta() {
  const viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) return;

  function updateViewport() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    if (isMobile) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1.0, user-scalable=no');
    } else {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');
    }
  }

  updateViewport();
  window.addEventListener('resize', debounce(updateViewport, 250));
}

// Optimize images for different screen sizes
function setupResponsiveImages() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Set appropriate srcset if not already set
    if (!img.srcset) {
      const src = img.src;
      const sizes = {
        mobile: '(max-width: 767px) 100vw',
        tablet: '(max-width: 1023px) 50vw',
        desktop: '33vw'
      };
      
      img.srcset = `${src} 100w, ${src} 50w, ${src} 33w`;
      img.sizes = sizes.mobile;
    }
  });
}

// Handle device-specific optimizations
function setupDeviceOptimizations() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isMobile && isTouchDevice) {
    // Optimize for touch devices
    document.body.classList.add('touch-device');
    
    // Increase tap targets
    const buttons = document.querySelectorAll('button, .to-button, a[href]');
    buttons.forEach(btn => {
      btn.style.minHeight = '48px';
      btn.style.minWidth = '48px';
    });
  }
  
  if (window.innerWidth <= 768) {
    document.body.classList.add('mobile-device');
  } else if (window.innerWidth <= 1024) {
    document.body.classList.add('tablet-device');
  } else {
    document.body.classList.add('desktop-device');
  }
}

// Performance monitoring for responsive features
function setupResponsivePerformance() {
  let resizeTimeout;
  
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Log resize events for debugging (can be removed in production)
      console.log(`Window resized to: ${window.innerWidth}x${window.innerHeight}`);
      
      // Trigger responsive updates
      setupDeviceOptimizations();
    }, 250);
  }
  
  window.addEventListener('resize', handleResize);
  
  // Initial setup
  handleResize();
}

// Handle orientation changes
window.addEventListener('orientationchange', () => {
  // Close mobile menu on orientation change
  const toggle = document.querySelector('.site-nav__toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav && toggle.getAttribute('aria-expanded') === 'true') {
    toggle.click();
  }
});

// Performance: Debounce resize events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounced resize handler
window.addEventListener('resize', debounce(() => {
  // Ensure mobile menu is closed on larger screens
  if (window.innerWidth >= 768) {
    const toggle = document.querySelector('.site-nav__toggle');
    const nav = document.querySelector('.site-nav');
    if (toggle && nav) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }
}, 250));

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setupMobileNav();
  setupSmoothScroll();
  setupActiveNav();
  setupScrollToTop();
  setupFooterYear();
  setupLazyLoading();
  preventHorizontalScroll();
});
