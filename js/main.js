/**
 * ==========================================================================
 * ARTURO REYES GERMÁN — PORTAFOLIO PROFESIONAL
 * Script Principal: Animaciones, Físicas 3D & Motor Interactivo Móvil/Desktop
 * ==========================================================================
 */

// 1. Inicializar iconos de Lucide
lucide.createIcons();

// 2. Asignación dinámica del año actual en el footer
const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// 3. Inicialización de Lenis Smooth Scroll Instantáneo & Reactivo
const lenis = new Lenis({
  duration: 0.6,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1.15,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {

  // ==================== CONTROLADOR DE MODO OSCURO / NOCHE ====================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle-btn');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  const mobileSunIcon = document.getElementById('mobile-theme-icon-sun');
  const mobileMoonIcon = document.getElementById('mobile-theme-icon-moon');
  const themeText = document.getElementById('theme-text');
  const mobileThemeText = document.getElementById('mobile-theme-text');

  function updateThemeUI(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (sunIcon) sunIcon.classList.remove('hidden');
      if (moonIcon) moonIcon.classList.add('hidden');
      if (mobileSunIcon) mobileSunIcon.classList.remove('hidden');
      if (mobileMoonIcon) mobileMoonIcon.classList.add('hidden');
      if (themeText) themeText.textContent = 'Día';
      if (mobileThemeText) mobileThemeText.textContent = 'Modo Día';
    } else {
      document.documentElement.classList.remove('dark');
      if (sunIcon) sunIcon.classList.add('hidden');
      if (moonIcon) moonIcon.classList.remove('hidden');
      if (mobileSunIcon) mobileSunIcon.classList.add('hidden');
      if (mobileMoonIcon) mobileMoonIcon.classList.remove('hidden');
      if (themeText) themeText.textContent = 'Noche';
      if (mobileThemeText) mobileThemeText.textContent = 'Modo Noche';
    }
  }

  // Inicializar estado de iconos
  updateThemeUI(document.documentElement.classList.contains('dark'));

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeUI(isDark);
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);

  // ==================== MENÚ HAMBURGUESA MÓVIL (SUIZO) ====================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        mobileDrawer.classList.add('is-open');
        iconOpen.classList.add('hidden');
        iconClose.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      } else {
        mobileDrawer.classList.remove('is-open');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
        document.body.style.overflow = '';
      }
    };

    mobileMenuBtn.addEventListener('click', () => toggleMenu());

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });
  }

  // ==================== BOLITA NARANJA SEGUIDORA DEL MOUSE ====================
  const cursorBall = document.getElementById("cursor-ball");

  if (cursorBall && window.matchMedia("(pointer: fine)").matches) {
    gsap.set(cursorBall, {
      xPercent: -50,
      yPercent: -50,
      force3D: true
    });

    const pointerVisualOffsetX = 6;
    const pointerVisualOffsetY = 10;

    let mouseX = window.innerWidth / 2 + pointerVisualOffsetX;
    let mouseY = window.innerHeight / 2 + pointerVisualOffsetY;
    let ballX = mouseX;
    let ballY = mouseY;
    let isVisible = false;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX + pointerVisualOffsetX;
      mouseY = e.clientY + pointerVisualOffsetY;

      if (!isVisible) {
        cursorBall.style.opacity = "1";
        isVisible = true;
      }
    });

    document.addEventListener("mouseleave", () => {
      cursorBall.style.opacity = "0";
      isVisible = false;
    });

    gsap.ticker.add(() => {
      ballX += (mouseX - ballX) * 0.25;
      ballY += (mouseY - ballY) * 0.25;

      gsap.set(cursorBall, {
        x: ballX,
        y: ballY,
        force3D: true
      });
    });

    const interactives = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, .spatial-card, .menu-item-editorial, .tech-pill"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", () => cursorBall.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursorBall.classList.remove("is-hover"));
    });
  }

  // ==================== ONDA MAGNÉTICA FLUIDA (MOUSE + TOUCH) ====================
  const heroHeading = document.getElementById("hero-wave-heading");
  if (heroHeading) {
    function splitTextIntoChars(element) {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
      const textNodes = [];
      let node;
      while ((node = walker.nextNode())) {
        if (node.nodeValue.trim().length > 0) {
          textNodes.push(node);
        }
      }

      textNodes.forEach((textNode) => {
        const chars = textNode.nodeValue.split("");
        const fragment = document.createDocumentFragment();
        chars.forEach((char) => {
          if (char === " ") {
            fragment.appendChild(document.createTextNode(" "));
          } else {
            const span = document.createElement("span");
            span.className = "char-node";
            span.textContent = char;
            fragment.appendChild(span);
          }
        });
        textNode.parentNode.replaceChild(fragment, textNode);
      });
    }

    splitTextIntoChars(heroHeading);

    const allChars = heroHeading.querySelectorAll(".char-node");
    const radius = window.innerWidth < 768 ? 140 : 220;

    let charCoords = [];
    function calculateCharPositions() {
      charCoords = [];
      allChars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        charCoords.push({
          el: char,
          cx: rect.left + rect.width / 2,
          cy: rect.top + rect.height / 2
        });
      });
    }

    setTimeout(calculateCharPositions, 200);
    window.addEventListener("resize", calculateCharPositions);
    window.addEventListener("scroll", calculateCharPositions);

    function applyWave(clientX, clientY) {
      charCoords.forEach((item) => {
        const dx = clientX - item.cx;
        const dy = clientY - item.cy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < radius) {
          const factor = Math.cos((distance / radius) * (Math.PI / 2));
          const pushX = -(dx / distance) * (window.innerWidth < 768 ? 16 : 26) * factor;
          const pushY = -(dy / distance) * (window.innerWidth < 768 ? 16 : 26) * factor;
          const scale = 1 + (0.35 * factor);

          const textShadow = factor > 0.25 
            ? `0 ${Math.round(12 * factor)}px ${Math.round(16 * factor)}px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(255, 85, 0, 0.25)` 
            : "none";

          gsap.to(item.el, {
            x: pushX,
            y: pushY,
            scale: scale,
            textShadow: textShadow,
            color: factor > 0.35 ? "#ff5500" : "",
            duration: 0.12,
            ease: "power2.out",
            overwrite: "auto"
          });
        } else {
          gsap.to(item.el, {
            x: 0,
            y: 0,
            scale: 1,
            textShadow: "none",
            color: "",
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      });
    }

    function resetWave() {
      allChars.forEach((char) => {
        gsap.to(char, {
          x: 0,
          y: 0,
          scale: 1,
          textShadow: "none",
          color: "",
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto"
        });
      });
    }

    // Interacción Mouse
    heroHeading.addEventListener("mousemove", (e) => {
      applyWave(e.clientX, e.clientY);
    });
    heroHeading.addEventListener("mouseleave", resetWave);

    // Interacción Táctil en Móvil (Touch Events)
    heroHeading.addEventListener("touchmove", (e) => {
      if (e.touches && e.touches[0]) {
        applyWave(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    heroHeading.addEventListener("touchend", resetWave);
  }

  // ==================== PARALLAX ESPACIAL 3D (MOUSE + TOUCH) ====================
  const heroContainer = document.querySelector(".hero-spatial-container");
  const heroLayers = document.querySelectorAll(".hero-parallax-layer");
  if (heroContainer && heroLayers.length > 0) {
    function applyHeroParallax(clientX, clientY) {
      const rect = heroContainer.getBoundingClientRect();
      const xRel = (clientX - rect.left) / rect.width - 0.5;
      const yRel = (clientY - rect.top) / rect.height - 0.5;

      heroLayers.forEach((layer) => {
        const depth = parseFloat(layer.getAttribute("data-depth")) || 25;
        gsap.to(layer, {
          x: xRel * depth,
          y: yRel * depth,
          rotationY: xRel * 8,
          rotationX: -yRel * 8,
          duration: 0.14,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
    }

    function resetHeroParallax() {
      heroLayers.forEach((layer) => {
        gsap.to(layer, {
          x: 0,
          y: 0,
          rotationY: 0,
          rotationX: 0,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
    }

    heroContainer.addEventListener("mousemove", (e) => {
      applyHeroParallax(e.clientX, e.clientY);
    });
    heroContainer.addEventListener("mouseleave", resetHeroParallax);

    // Soporte táctil en Hero
    heroContainer.addEventListener("touchmove", (e) => {
      if (e.touches && e.touches[0]) {
        applyHeroParallax(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
    heroContainer.addEventListener("touchend", resetHeroParallax);
  }

  // ==================== 3D TILT TÁCTIL, SOMBRA DINÁMICA & GLARE ====================
  const spatialCards = document.querySelectorAll(".spatial-card");
  spatialCards.forEach((card) => {
    const glare = card.querySelector(".card-glare");

    function applyCardTilt(clientX, clientY) {
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * 12;
      const rotateY = ((x - centerX) / centerX) * 12;

      const shadowX = -((x - centerX) / centerX) * 18;
      const shadowY = Math.max(12, ((y - centerY) / centerY) * 16 + 24);
      const isDark = card.classList.contains("spatial-card-dark");
      const shadowColor = isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(15, 23, 42, 0.16)";
      const glowColor = isDark ? "rgba(255, 85, 0, 0.35)" : "rgba(255, 85, 0, 0.22)";

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.02,
        z: 18,
        boxShadow: `${shadowX}px ${shadowY}px 50px -10px ${shadowColor}, 0 12px 28px -6px ${glowColor}`,
        duration: 0.24,
        ease: "power2.out",
        transformPerspective: 1000,
        overwrite: "auto"
      });

      if (glare) {
        glare.style.opacity = "1";
        glare.style.background = `radial-gradient(circle 260px at ${x}px ${y}px, rgba(255, 85, 0, 0.2), transparent 70%)`;
      }
    }

    function resetCardTilt() {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        z: 0,
        boxShadow: "",
        duration: 0.65,
        ease: "power3.out",
        overwrite: "auto"
      });

      if (glare) {
        glare.style.opacity = "0";
      }
    }

    // Interacción Mouse
    card.addEventListener("mousemove", (e) => applyCardTilt(e.clientX, e.clientY));
    card.addEventListener("mouseleave", resetCardTilt);

    // Interacción Touch en Móvil
    card.addEventListener("touchstart", (e) => {
      if (e.touches && e.touches[0]) {
        applyCardTilt(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    card.addEventListener("touchend", resetCardTilt);
  });

  // ==================== ANIMACIONES EN CASCADA AL HACER SCROLL (GSAP + SCROLLTRIGGER) ====================
  // Regla obligatoria de DESIGN_SYSTEM.md: Stagger y Fade Up a 60fps en móvil y escritorio
  const animateSections = [
    { target: "#stack .grid > div, #stack article", stagger: 0.1 },
    { target: "#servicios .spatial-card-wrapper", stagger: 0.12 },
    { target: "#proyectos .spatial-card-wrapper", stagger: 0.15 },
    { target: "#proceso .spatial-card-wrapper", stagger: 0.1 }
  ];

  animateSections.forEach(({ target, stagger }) => {
    const elements = document.querySelectorAll(target);
    if (elements.length > 0) {
      gsap.from(elements, {
        scrollTrigger: {
          trigger: elements[0],
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 35,
        opacity: 0,
        duration: 0.75,
        stagger: stagger,
        ease: "power2.out",
        clearProps: "all"
      });
    }
  });

});
