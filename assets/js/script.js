'use strict';



/**
 * add Event on elements
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header & back top btn show when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 80) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);



/**
 * project filter functionality
 */

const filterBtns = document.querySelectorAll("[data-filter-btn]");
const projectCards = document.querySelectorAll(".project-card");

const filterProjects = function () {
  const filterValue = this.textContent.toLowerCase().trim();
  
  // Update active button
  filterBtns.forEach(btn => btn.classList.remove("active"));
  this.classList.add("active");
  
  // Filter project cards
  projectCards.forEach(card => {
    const category = card.getAttribute("data-category");
    
    if (filterValue === "all projects" || category === filterValue) {
      card.parentElement.style.display = "block";
    } else {
      card.parentElement.style.display = "none";
    }
  });
}

if (filterBtns.length > 0) {
  addEventOnElem(filterBtns, "click", filterProjects);
}



/**
 * testimonials slider functionality
 */

const testimonialsSlider = function () {
  const track = document.querySelector('.testimonial-track');
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const indicators = document.querySelectorAll('.indicator');
  
  if (!track || !cards.length) return;
  
  let currentIndex = 0;
  const cardWidth = 100; // percentage
  
  // Update slider position
  const updateSlider = function () {
    track.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
    
    // Update active indicator
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  };
  
  // Next slide
  const nextSlide = function () {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider();
  };
  
  // Previous slide
  const prevSlide = function () {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateSlider();
  };
  
  // Go to specific slide
  const goToSlide = function (index) {
    currentIndex = index;
    updateSlider();
  };
  
  // Auto-play functionality
  let autoPlayInterval;
  
  const startAutoPlay = function () {
    autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  };
  
  const stopAutoPlay = function () {
    clearInterval(autoPlayInterval);
  };
  
  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });
  }
  
  // Indicator click events
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      stopAutoPlay();
      goToSlide(index);
      startAutoPlay();
    });
  });
  
  // Pause autoplay on hover
  const sliderContainer = document.querySelector('.testimonials-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
  }
  
  // Touch/swipe support
  let startX = 0;
  let endX = 0;
  
  if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      stopAutoPlay();
    });
    
    sliderContainer.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      
      startAutoPlay();
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (document.querySelector('.testimonials-slider:hover')) {
      if (e.key === 'ArrowLeft') {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
      } else if (e.key === 'ArrowRight') {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
      }
    }
  });
  
  // Initialize
  startAutoPlay();
  updateSlider();
};

// Initialize testimonials slider when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', testimonialsSlider);
} else {
  testimonialsSlider();
}



/**
 * value proposition animated counters
 */

const animatedCounters = function () {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (!statNumbers.length) return;
  
  const animateCounter = function (element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 fps
    const increment = target / (duration / (1000 / steps));
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 1000 / steps);
  };
  
  // Intersection Observer for scroll-triggered animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  });
  
  statNumbers.forEach(num => observer.observe(num));
};



/**
 * technology showcase interactions
 */

const techShowcase = function () {
  const techNodes = document.querySelectorAll('.tech-node');
  
  if (!techNodes.length) return;
  
  techNodes.forEach(node => {
    node.addEventListener('mouseenter', function() {
      const techName = this.getAttribute('data-tech');
      // Could add tooltip or additional info here
      this.style.setProperty('--tooltip-content', `'${techName}'`);
    });
    
    node.addEventListener('click', function() {
      const techName = this.getAttribute('data-tech');
      // Could trigger modal or additional information
      console.log(`Clicked on ${techName}`);
    });
  });
};



/**
 * parallax scrolling effects
 */

const parallaxEffects = function () {
  const valueSection = document.querySelector('.value-proposition');
  
  if (!valueSection) return;
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (valueSection) {
      valueSection.style.backgroundPosition = `center ${rate}px`;
    }
  });
};



/**
 * initialize all advanced features
 */

const initAdvancedFeatures = function () {
  animatedCounters();
  techShowcase();
  parallaxEffects();
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdvancedFeatures);
} else {
  initAdvancedFeatures();
}