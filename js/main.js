document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const mobileMenuMedia = window.matchMedia('(max-width: 768px)');

  // Navbar scroll shadow
  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  function setMenuState(isOpen) {
    const isMobileViewport = mobileMenuMedia.matches;
    const shouldOpen = isMobileViewport && isOpen;

    navMenu.classList.toggle('open', shouldOpen);
    navToggle.classList.toggle('active', shouldOpen);
    navToggle.setAttribute('aria-expanded', String(shouldOpen));
    navMenu.setAttribute('aria-hidden', String(isMobileViewport ? !shouldOpen : false));
    document.body.classList.toggle('nav-open', shouldOpen);
  }

  function syncNavAccessibility() {
    setMenuState(navMenu.classList.contains('open'));
  }

  syncNavAccessibility();

  // Mobile menu toggle
  navToggle.addEventListener('click', function () {
    setMenuState(!navMenu.classList.contains('open'));
  });

  // Close mobile menu on link click
  navMenu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenuState(false);
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      setMenuState(false);
    }
  });

  window.addEventListener('resize', function () {
    syncNavAccessibility();
  }, { passive: true });

  // Fade-in on scroll (Intersection Observer)
  var fadeTargets = document.querySelectorAll(
    '.timeline-item, .skill-category, .cert-card, .article-group, .education-card, .language-card, .highlight-card'
  );

  fadeTargets.forEach(function (el) {
    el.classList.add('fade-in');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeTargets.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // Load the bundled animation data with the local lottie runtime so it also works from disk.
  var landingContainer = document.getElementById('lottie-landing');
  var heroLandingPageAnimation = window.heroLandingPageAnimation;

  if (landingContainer && typeof lottie !== 'undefined' && heroLandingPageAnimation) {
    var landingAnimation = lottie.loadAnimation({
      container: landingContainer,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: heroLandingPageAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet'
      }
    });

    var landingResizeTimer;
    window.addEventListener('resize', function () {
      window.clearTimeout(landingResizeTimer);
      landingResizeTimer = window.setTimeout(function () {
        landingAnimation.resize();
      }, 100);
    }, { passive: true });
  }
});
