/* ========================================
   Kuldeep Behera — Dark Portfolio
   JavaScript — Animations, Interactions, UX
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ========================
  // Preloader
  // ========================
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.querySelector('.hero').classList.add('loaded');
    }, 800);
  });

  // Fallback if load already fired
  if (document.readyState === 'complete') {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.querySelector('.hero').classList.add('loaded');
    }, 800);
  }

  // ========================
  // Custom Cursor
  // ========================
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card, .filter-btn');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });

  // ========================
  // Navbar scroll effect
  // ========================
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('[data-nav]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ========================
  // Mobile Navigation
  // ========================
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('[data-mobile-nav]');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ========================
  // Scroll Reveal Animations
  // ========================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve to allow re-animation if needed
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ========================
  // Portfolio Filters
  // ========================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active filter button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      portfolioItems.forEach((item, index) => {
        const category = item.dataset.category;
        if (filter === 'all' || category === filter) {
          item.style.display = '';
          item.style.animation = `fadeInUp 0.5s ${index * 0.08}s var(--ease-out) both`;
        } else {
          item.style.display = 'none';
          item.style.animation = '';
        }
      });
    });
  });

  // ========================
  // Product Tabs
  // ========================
  const productTabs = document.querySelectorAll('.product-tab');
  const productPanels = document.querySelectorAll('.products-panel');

  productTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      productTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetPanel = tab.dataset.productTab;

      // Toggle panels
      productPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `panel-${targetPanel}`) {
          panel.classList.add('active');

          // Re-observe reveal elements in the new panel
          panel.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            el.classList.remove('visible');
            revealObserver.observe(el);
            // Small delay for animation
            setTimeout(() => el.classList.add('visible'), 50);
          });
        }
      });
    });
  });

  // ========================
  // Lightbox
  // ========================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').src;
      lightboxImg.src = imgSrc;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ========================
  // Testimonial Slider
  // ========================
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  let autoSlideInterval;

  function goToSlide(index) {
    currentSlide = index;
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  testimonialDots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.slide));
      resetAutoSlide();
    });
  });

  function autoSlide() {
    autoSlideInterval = setInterval(() => {
      const next = (currentSlide + 1) % testimonialDots.length;
      goToSlide(next);
    }, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlide();
  }

  autoSlide();

  // ========================
  // Animated Counters (About Stats)
  // ========================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(stat => {
          const text = stat.textContent;
          const match = text.match(/(\d+)/);
          if (match) {
            const target = parseInt(match[0]);
            const suffix = text.replace(match[0], '');
            animateCounter(stat, target, suffix);
          }
        });
      }
    });
  }, { threshold: 0.5 });

  const aboutStats = document.querySelector('.about-stats');
  if (aboutStats) statsObserver.observe(aboutStats);

  function animateCounter(element, target, suffix) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    function update() {
      current += increment;
      if (current >= target) {
        element.textContent = target + suffix;
        return;
      }
      element.textContent = Math.floor(current) + suffix;
      requestAnimationFrame(update);
    }

    update();
  }

  // ========================
  // Contact Form
  // ========================
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.submit-btn');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = `
      <span style="display:inline-flex;align-items:center;gap:8px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Message Sent!
      </span>
    `;
    btn.style.background = '#2a7a4b';
    btn.style.borderColor = '#2a7a4b';
    btn.style.color = '#fff';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
      contactForm.reset();
    }, 3000);
  });

  // ========================
  // Smooth Scroll for anchor links
  // ========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 40;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================
  // Parallax Effect on Hero Image
  // ========================
  const heroBg = document.querySelector('.hero-bg img');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset < window.innerHeight) {
      const offset = window.pageYOffset * 0.35;
      heroBg.style.transform = `scale(1.05) translateY(${offset}px)`;
    }
  });

  // ========================
  // Fade-in keyframe injection for portfolio filter
  // ========================
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

});
