document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  // Navbar scroll shadow
  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Mobile menu toggle
  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  navMenu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
    });
  });

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
});
