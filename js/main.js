document.addEventListener("DOMContentLoaded", function () {
  var header = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  var year = document.getElementById("year");
  var navLinks = Array.from(document.querySelectorAll(".nav-link"));
  var navMenuLinks = Array.from(document.querySelectorAll("#navMenu a"));
  var revealTargets = Array.from(document.querySelectorAll("[data-reveal]"));

  function setMenuState(isOpen) {
    if (!navMenu || !navToggle) {
      return;
    }

    navMenu.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
    );
    document.body.classList.toggle("menu-open", isOpen);
  }

  function closeMenu() {
    setMenuState(false);
  }

  function openMenu() {
    setMenuState(true);
  }

  function toggleMenu() {
    if (!navMenu) {
      return;
    }

    if (navMenu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function handleScroll() {
    if (!header) {
      return;
    }

    header.classList.toggle("scrolled", window.scrollY > 12);
  }

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", isActive);
    });
  }

  if (navToggle) {
    navToggle.addEventListener("click", toggleMenu);
  }

  navMenuLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", function (event) {
    if (!navMenu || !navToggle) {
      return;
    }

    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (target) {
      revealObserver.observe(target);
    });

    var sections = Array.from(document.querySelectorAll("section[id]"));
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  } else {
    revealTargets.forEach(function (target) {
      target.classList.add("visible");
    });
  }
});
