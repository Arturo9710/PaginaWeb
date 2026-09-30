/**
 * ==========================================================================
 * ARTURO REYES GERMÁN — PORTAFOLIO PROFESIONAL
 * Script Principal: Animaciones, Físicas 3D & Motor Interactivo Móvil/Desktop
 * ==========================================================================
 */

// 1. Inicializar iconos de Lucide de forma segura
if (typeof lucide !== 'undefined' && lucide.createIcons) {
  lucide.createIcons();
}

// 2. Asignación dinámica del año actual en el footer
const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// 3. Inicialización de Lenis Smooth Scroll Dinámico, Ágil & Reactivo
let lenis = null;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 0.75,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.1,
    touchMultiplier: 1.6,
  });
}

if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

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

  // ==================== CONTROLADOR DE VISTA DUAL (NEGOCIOS LOCALES VS TECH DEV) ====================
  const dualSwitchBtns = document.querySelectorAll('.dual-switch-btn');

  function setPortfolioView(mode, animate = true) {
    document.body.setAttribute('data-view', mode);
    localStorage.setItem('portfolio_view_mode', mode);

    dualSwitchBtns.forEach(btn => {
      if (btn.getAttribute('data-view-btn') === mode) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });

    if (animate && typeof gsap !== 'undefined') {
      const activeElements = document.querySelectorAll(
        mode === 'negocios' ? '.view-negocios' : '.view-tech'
      );
      if (activeElements.length > 0) {
        gsap.fromTo(activeElements,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out', clearProps: 'all' }
        );
      }
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
      if (typeof window.animateHeroScatterAssemble === 'function') {
        window.animateHeroScatterAssemble();
      } else if (typeof calculateCharPositions === 'function') {
        setTimeout(calculateCharPositions, 100);
      }
    }
  }

  // Detectar URL param ?view=tech o ?view=negocios o localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const paramView = urlParams.get('view');
  const initialView = paramView === 'tech' || paramView === 'negocios' 
    ? paramView 
    : (localStorage.getItem('portfolio_view_mode') || 'negocios');

  setPortfolioView(initialView, false);

  dualSwitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetMode = btn.getAttribute('data-view-btn');
      setPortfolioView(targetMode, true);
    });
  });

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

  // ==================== MODAL EDITORIAL: SOBRE MÍ (DRAWER MONOLOG) ====================
  const openAboutBtn = document.getElementById('open-about-btn');
  const mobileOpenAboutBtn = document.getElementById('mobile-open-about-btn');
  const closeAboutBtn = document.getElementById('close-about-btn');
  const aboutBackdrop = document.getElementById('about-modal-backdrop');
  const aboutPanel = document.getElementById('about-modal-panel');

  function openAboutModal() {
    if (aboutBackdrop && aboutPanel) {
      aboutBackdrop.classList.add('is-open');
      aboutPanel.classList.add('is-open');
      aboutPanel.scrollTop = 0;
      document.body.style.overflow = 'hidden';

      // Pausar Lenis smooth scroll global para permitir scroll nativo en el drawer
      if (typeof lenis !== 'undefined' && lenis.stop) {
        lenis.stop();
      }

      // Si el menú móvil estaba abierto, cerrarlo
      if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
        mobileDrawer.classList.remove('is-open');
        if (iconOpen) iconOpen.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
      }
    }
  }

  function closeAboutModal() {
    if (aboutBackdrop && aboutPanel) {
      aboutBackdrop.classList.remove('is-open');
      aboutPanel.classList.remove('is-open');
      document.body.style.overflow = '';

      // Reanudar Lenis smooth scroll en la página principal
      if (typeof lenis !== 'undefined' && lenis.start) {
        lenis.start();
      }
    }
  }

  if (openAboutBtn) openAboutBtn.addEventListener('click', openAboutModal);
  if (mobileOpenAboutBtn) mobileOpenAboutBtn.addEventListener('click', openAboutModal);
  if (closeAboutBtn) closeAboutBtn.addEventListener('click', closeAboutModal);
  if (aboutBackdrop) aboutBackdrop.addEventListener('click', closeAboutModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aboutPanel && aboutPanel.classList.contains('is-open')) {
      closeAboutModal();
    }
  });

  // ==================== BOLITA NARANJA SEGUIDORA DEL MOUSE & PÍLDORA INTERACTIVA ====================
  const cursorBall = document.getElementById("cursor-ball");
  const cursorBallText = document.getElementById("cursor-ball-text");

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

      // Hit-testing reactivo y determinista para píldora de texto y hover interactivo
      const cardContainer = e.target.closest("[data-cursor-text], .spatial-card-wrapper, .spatial-card");
      let cursorText = null;
      if (cardContainer) {
        cursorText = cardContainer.getAttribute("data-cursor-text") || 
                     cardContainer.querySelector("[data-cursor-text]")?.getAttribute("data-cursor-text") ||
                     cardContainer.closest(".spatial-card-wrapper")?.querySelector("[data-cursor-text]")?.getAttribute("data-cursor-text");
      }

      if (cursorText) {
        if (cursorBallText && cursorBallText.textContent !== cursorText) {
          cursorBallText.textContent = cursorText;
        }
        cursorBall.classList.remove("is-hover");
        cursorBall.classList.add("is-text-active");
      } else {
        if (cursorBall.classList.contains("is-text-active")) {
          cursorBall.classList.remove("is-text-active");
          if (cursorBallText) cursorBallText.textContent = "";
        }

        const interactiveEl = e.target.closest(
          "a, button, [role='button'], input, textarea, .nav-item-3d, .theme-btn-3d, .cta-btn-3d, .menu-item-editorial, header .tech-pill, footer .tech-pill, #theme-toggle-btn"
        );
        if (interactiveEl) {
          cursorBall.classList.add("is-hover");
        } else {
          cursorBall.classList.remove("is-hover");
        }
      }
    });

    document.addEventListener("mouseleave", () => {
      cursorBall.style.opacity = "0";
      cursorBall.classList.remove("is-hover", "is-text-active");
      if (cursorBallText) cursorBallText.textContent = "";
      isVisible = false;
    });

    gsap.ticker.add(() => {
      ballX += (mouseX - ballX) * 0.45;
      ballY += (mouseY - ballY) * 0.45;

      gsap.set(cursorBall, {
        x: ballX,
        y: ballY,
        force3D: true
      });
    });
  }

  // ==================== FUNCIÓN GENERAL PARA DIVIDIR TEXTO EN LETRAS SIN ROMPER PALABRAS ====================
  function splitTextIntoChars(element) {
    if (!element || element.dataset.charsSplit === "true") return;
    element.dataset.charsSplit = "true";

    const text = element.textContent.trim();
    if (!text) return;

    // Dividir primero por palabras para que se mantengan unidas limpiamente
    const words = text.split(/\s+/);
    const fragment = document.createDocumentFragment();

    words.forEach((wordText, wIdx) => {
      if (!wordText) return;
      const wordSpan = document.createElement("span");
      wordSpan.className = "inline-block whitespace-nowrap";

      const chars = wordText.split("");
      chars.forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.className = "char-node";
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
      });

      fragment.appendChild(wordSpan);
      if (wIdx < words.length - 1) {
        fragment.appendChild(document.createTextNode(" "));
      }
    });

    element.innerHTML = "";
    element.appendChild(fragment);
  }

  // ==================== ONDA MAGNÉTICA FLUIDA & PINTADO DE LETRAS (HERO) ====================
  const heroHeadings = document.querySelectorAll(".hero-wave-heading");
  let calculateCharPositions = () => {};

  if (heroHeadings.length > 0) {
    heroHeadings.forEach((heading) => {
      splitTextIntoChars(heading);
    });

    const radius = window.innerWidth < 768 ? 140 : 220;
    let charCoords = [];
    let leaveResetTimer = null;

    calculateCharPositions = function() {
      charCoords = [];
      const visibleHeadings = document.querySelectorAll(
        document.body.getAttribute('data-view') === 'tech'
          ? '.hero-wave-heading.view-tech'
          : '.hero-wave-heading.view-negocios'
      );

      visibleHeadings.forEach((heading) => {
        const allChars = heading.querySelectorAll(".char-node");
        allChars.forEach((char) => {
          const rect = char.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            charCoords.push({
              el: char,
              cx: rect.left + rect.width / 2,
              cy: rect.top + rect.height / 2,
              isPainted: char.dataset.painted === "true"
            });
          }
        });
      });
    };

    setTimeout(calculateCharPositions, 200);
    window.addEventListener("resize", calculateCharPositions);
    window.addEventListener("scroll", calculateCharPositions);

    function applyWave(clientX, clientY) {
      if (charCoords.length === 0) {
        calculateCharPositions();
      }

      charCoords.forEach((item) => {
        const dx = clientX - item.cx;
        const dy = clientY - item.cy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < radius) {
          const factor = Math.cos((distance / radius) * (Math.PI / 2));
          const pushDistance = (window.innerWidth < 768 ? 45 : 75) * factor;
          const pushX = -(dx / (distance || 1)) * pushDistance;
          const pushY = -(dy / (distance || 1)) * pushDistance;
          const rotationAngle = (-(dx / (distance || 1)) * 35) * factor;
          const scale = 1 + (0.45 * factor);

          const textShadow = factor > 0.25 
            ? `0 ${Math.round(14 * factor)}px ${Math.round(20 * factor)}px rgba(0, 0, 0, 0.2), 0 0 16px rgba(255, 85, 0, 0.6)` 
            : "none";

          gsap.to(item.el, {
            x: pushX,
            y: pushY,
            rotation: rotationAngle,
            scale: scale,
            textShadow: textShadow,
            color: "#ff5500",
            duration: 0.18,
            ease: "power2.out",
            overwrite: "auto"
          });
        } else {
          // Al alejarse el ratón de la letra, vuelve a su color negro de origen de forma fluida
          gsap.to(item.el, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            textShadow: "none",
            color: "",
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      });
    }

    function resetWave() {
      const allChars = document.querySelectorAll(".hero-wave-heading .char-node");
      gsap.to(allChars, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        textShadow: "none",
        color: "",
        duration: 0.6,
        stagger: {
          each: 0.012,
          from: "random"
        },
        ease: "power2.out",
        overwrite: "auto"
      });
    }

    // ==================== ANIMACIÓN CINEMÁTICA: DESORDEN Y ENSAMBLAJE PROGRESIVO ====================
    window.animateHeroScatterAssemble = function(onCompleteCallback) {
      const activeHeading = document.querySelector(
        document.body.getAttribute('data-view') === 'tech'
          ? '.hero-wave-heading.view-tech'
          : '.hero-wave-heading.view-negocios'
      );

      if (!activeHeading) return;
      const chars = activeHeading.querySelectorAll(".char-node");
      if (chars.length === 0) return;

      // Matar tweens previos sobre las letras
      gsap.killTweensOf(chars);

      // Estado inicial: dispersión caótica 3D en todas direcciones
      chars.forEach((char) => {
        const randomX = (Math.random() - 0.5) * (window.innerWidth < 768 ? 160 : 320);
        const randomY = (Math.random() - 0.5) * (window.innerWidth < 768 ? 120 : 200) - 40;
        const randomRotate = (Math.random() - 0.5) * 120;
        const randomScale = 0.2 + Math.random() * 0.5;

        gsap.set(char, {
          x: randomX,
          y: randomY,
          rotation: randomRotate,
          scale: randomScale,
          opacity: 0,
          filter: "blur(10px)",
          color: Math.random() > 0.5 ? "#ff5500" : ""
        });
      });

      // Animación de ensamblaje progresivo hacia su posición perfecta
      gsap.to(chars, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        color: "",
        duration: 1.35,
        stagger: {
          each: 0.025,
          from: "random",
          ease: "power2.inOut"
        },
        ease: "elastic.out(1, 0.75)",
        onComplete: () => {
          calculateCharPositions();
          if (typeof onCompleteCallback === "function") {
            onCompleteCallback();
          }
        }
      });
    };

    // Ejecutar ensamblaje inicial al cargar
    setTimeout(() => {
      if (typeof window.animateHeroScatterAssemble === "function") {
        window.animateHeroScatterAssemble();
      }
    }, 150);

    // Interacción Mouse & Touch en el bloque tipográfico del Hero
    const charBlock = document.querySelector(".interactive-char-block");
    if (charBlock) {
      charBlock.addEventListener("mousemove", (e) => {
        applyWave(e.clientX, e.clientY);
      });
      charBlock.addEventListener("mouseleave", resetWave);

      charBlock.addEventListener("touchmove", (e) => {
        if (e.touches && e.touches[0]) {
          applyWave(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      charBlock.addEventListener("touchend", resetWave);
    }
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

  // ==================== 3D TILT TÁCTIL, SOMBRA DINÁMICA & GLARE (ULTRA ESTABLE & FLUIDO) ====================
  const spatialCardWrappers = document.querySelectorAll(".spatial-card-wrapper");
  spatialCardWrappers.forEach((wrapper) => {
    const card = wrapper.querySelector(".spatial-card") || wrapper;
    const glare = card.querySelector(".card-glare");
    let tiltRaf = null;

    function applyCardTilt(clientX, clientY) {
      if (tiltRaf) cancelAnimationFrame(tiltRaf);

      tiltRaf = requestAnimationFrame(() => {
        // Usar la caja del wrapper estático en 2D para garantizar coordenadas estables y sin oscilación
        const rect = wrapper.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const clampedX = Math.max(0, Math.min(rect.width, x));
        const clampedY = Math.max(0, Math.min(rect.height, y));
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -((clampedY - centerY) / centerY) * 7.5;
        const rotateY = ((clampedX - centerX) / centerX) * 7.5;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          scale: 1.018,
          duration: 0.24,
          ease: "power2.out",
          transformOrigin: "center center",
          overwrite: "auto"
        });

        if (glare) {
          glare.style.opacity = "1";
          glare.style.background = `radial-gradient(circle 320px at ${clampedX}px ${clampedY}px, rgba(255, 255, 255, 0.22), transparent 70%)`;
        }
      });
    }

    function resetCardTilt() {
      if (tiltRaf) cancelAnimationFrame(tiltRaf);

      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto"
      });

      if (glare) {
        glare.style.opacity = "0";
      }
    }

    // Los eventos se escuchan en el WRAPPER (contenedor estático que no rota en 3D)
    wrapper.addEventListener("mouseenter", (e) => {
      wrapper.classList.add("is-hovered");
      card.classList.add("is-hovered");
      applyCardTilt(e.clientX, e.clientY);
    });

    wrapper.addEventListener("mousemove", (e) => {
      if (!wrapper.classList.contains("is-hovered")) {
        wrapper.classList.add("is-hovered");
        card.classList.add("is-hovered");
      }
      applyCardTilt(e.clientX, e.clientY);
    });

    wrapper.addEventListener("mouseleave", () => {
      wrapper.classList.remove("is-hovered");
      card.classList.remove("is-hovered");
      resetCardTilt();
    });

    // Interacción Touch en Móvil
    wrapper.addEventListener("touchstart", (e) => {
      if (e.touches && e.touches[0]) {
        wrapper.classList.add("is-hovered");
        card.classList.add("is-hovered");
        applyCardTilt(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    wrapper.addEventListener("touchend", () => {
      wrapper.classList.remove("is-hovered");
      card.classList.remove("is-hovered");
      resetCardTilt();
    });
  });

  // ==================== MODAL CINEMÁTICO AL CENTRO PARA TARJETAS (EFECTO MANTEQUILLA) ====================
  const cardZoomBackdrop = document.getElementById("card-zoom-backdrop");
  const cardZoomContainer = document.getElementById("card-zoom-modal-container");
  const cardZoomContent = document.getElementById("card-zoom-content");
  const cardZoomCloseBtn = document.getElementById("card-zoom-close-btn");
  const zoomableCards = document.querySelectorAll("#stack .spatial-card, #servicios .spatial-card");

  function openCardZoom(sourceCard) {
    if (!cardZoomContainer || !cardZoomBackdrop || !cardZoomContent) return;

    // 1. Obtener contenido enriquecido para pantalla grande si existe en <template>, o clonar tarjeta
    cardZoomContent.innerHTML = "";
    const richTemplate = sourceCard.querySelector("template.modal-rich-data");
    
    if (richTemplate) {
      const contentFragment = richTemplate.content.cloneNode(true);
      cardZoomContent.appendChild(contentFragment);
    } else {
      const elevatedContent = sourceCard.querySelector(".card-elevated-content");
      if (elevatedContent) {
        const cloned = elevatedContent.cloneNode(true);
        cloned.style.transform = "none";
        cardZoomContent.appendChild(cloned);
      }
    }

    // Re-crear iconos vectoriales
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // 2. Activar backdrop y contenedor
    cardZoomBackdrop.classList.add("is-open");
    cardZoomContainer.classList.add("is-open");
    document.body.style.overflow = "hidden";

    // Pausar Lenis smooth scroll global para permitir scroll nativo en el modal
    if (typeof lenis !== "undefined" && lenis.stop) {
      lenis.stop();
    }

    const panel = cardZoomContainer.querySelector(".card-zoom-modal-panel");
    if (!panel) return;

    // Reset de scroll interno del modal
    panel.scrollTop = 0;

    // 3. Animación Cinemática de Pantalla Grande Ultra Suave como Mantequilla (GSAP Expo)
    gsap.fromTo(panel,
      { 
        scale: 0.92, 
        y: 40, 
        opacity: 0,
        filter: "blur(6px)"
      },
      { 
        scale: 1, 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)",
        duration: 0.75, 
        ease: "power4.out", 
        overwrite: "auto" 
      }
    );
  }

  function closeCardZoom() {
    if (!cardZoomContainer || !cardZoomBackdrop) return;
    const panel = cardZoomContainer.querySelector(".card-zoom-modal-panel");

    if (panel) {
      gsap.to(panel, {
        scale: 0.94,
        y: 30,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: () => {
          cardZoomBackdrop.classList.remove("is-open");
          cardZoomContainer.classList.remove("is-open");
          document.body.style.overflow = "";
          if (cardZoomContent) cardZoomContent.innerHTML = "";
          // Reanudar Lenis smooth scroll en la página principal
          if (typeof lenis !== "undefined" && lenis.start) {
            lenis.start();
          }
        }
      });
    } else {
      cardZoomBackdrop.classList.remove("is-open");
      cardZoomContainer.classList.remove("is-open");
      document.body.style.overflow = "";
      if (typeof lenis !== "undefined" && lenis.start) {
        lenis.start();
      }
    }
  }

  zoomableCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Evitar que abra si se hace clic en un enlace directo interno
      if (e.target.closest("a")) return;
      openCardZoom(card);
    });
  });

  if (cardZoomCloseBtn) cardZoomCloseBtn.addEventListener("click", closeCardZoom);
  if (cardZoomBackdrop) cardZoomBackdrop.addEventListener("click", closeCardZoom);

  // Click afuera en el contenedor (cubre toda el área exterior al panel)
  if (cardZoomContainer) {
    cardZoomContainer.addEventListener("click", (e) => {
      // Si el clic fue directamente en el fondo del contenedor y no dentro del panel
      if (e.target === cardZoomContainer) {
        closeCardZoom();
      }
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cardZoomContainer && cardZoomContainer.classList.contains("is-open")) {
      closeCardZoom();
    }
  });

  // ==================== MOVIMIENTO REACTIVO LATERAL (DE UN LADO A OTRO) AL SCROLL ====================
  const orbWrapper1 = document.querySelector('.ambient-glow-wrapper-1');
  const orbWrapper2 = document.querySelector('.ambient-glow-wrapper-2');
  const orbWrapper3 = document.querySelector('.ambient-glow-wrapper-3');

  if (orbWrapper1 || orbWrapper2 || orbWrapper3) {
    let currentScrollY = window.scrollY || 0;
    let targetVelocityImpulse = 0;
    let smoothVelocity = 0;

    const navbar3d = document.querySelector('.navbar-3d-island');

    // Escuchar eventos de scroll fluido de Lenis
    if (typeof lenis !== 'undefined') {
      lenis.on('scroll', ({ scroll, velocity }) => {
        currentScrollY = scroll;
        // Impulso dinámico suave proporcional a la velocidad del scroll
        targetVelocityImpulse = Math.max(-70, Math.min(70, velocity * 3));

        if (navbar3d) {
          if (scroll > 30) {
            navbar3d.classList.add('is-scrolled');
          } else {
            navbar3d.classList.remove('is-scrolled');
          }
        }
      });
    } else {
      window.addEventListener('scroll', () => {
        currentScrollY = window.scrollY;
        if (navbar3d) {
          if (window.scrollY > 30) {
            navbar3d.classList.add('is-scrolled');
          } else {
            navbar3d.classList.remove('is-scrolled');
          }
        }
      }, { passive: true });
    }

    // Cache de dimensiones para evitar reprocesamiento forzado (Forced Synchronous Layout / Reflow)
    let cachedDocHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    let cachedInnerWidth = window.innerWidth;
    let cachedHorizontalRange = cachedInnerWidth < 768 
      ? Math.min(cachedInnerWidth * 0.7, 340)
      : Math.min(cachedInnerWidth * 0.65, 820);

    window.addEventListener('resize', () => {
      cachedDocHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      cachedInnerWidth = window.innerWidth;
      cachedHorizontalRange = cachedInnerWidth < 768 
        ? Math.min(cachedInnerWidth * 0.7, 340)
        : Math.min(cachedInnerWidth * 0.65, 820);
    }, { passive: true });

    // Loop de renderizado a 60/120fps con GSAP Ticker para oscilación horizontal ultra fluida
    gsap.ticker.add(() => {
      // Amortiguación elástica del impulso de inercia
      targetVelocityImpulse += (0 - targetVelocityImpulse) * 0.08;
      smoothVelocity += (targetVelocityImpulse - smoothVelocity) * 0.12;

      const scrollProgress = Math.min(1, Math.max(0, currentScrollY / cachedDocHeight));
      const horizontalRange = cachedHorizontalRange;

      // 1. Esfera Naranja Principal: Viaja de Derecha a Izquierda y vuelve de forma ondulante
      if (orbWrapper1) {
        // Onda horizontal sinusoidal continua a lo largo del scroll
        const waveX = -Math.sin(scrollProgress * Math.PI * 2.8) * horizontalRange;
        const x1 = waveX - (smoothVelocity * 0.8);
        const y1 = (currentScrollY * 0.10) + smoothVelocity;
        const scale1 = 1 + Math.min(0.08, Math.abs(smoothVelocity) * 0.0012);

        gsap.set(orbWrapper1, {
          x: x1,
          y: y1,
          scale: scale1,
          force3D: true
        });
      }

      // 2. Esfera Secundaria Índigo / Celeste: Cruza en dirección contraria (Izquierda a Derecha)
      if (orbWrapper2) {
        const waveX2 = Math.sin(scrollProgress * Math.PI * 2.5) * (horizontalRange * 0.85);
        const x2 = waveX2 + (smoothVelocity * 0.5);
        const y2 = -(currentScrollY * 0.06) - (smoothVelocity * 0.5);

        gsap.set(orbWrapper2, {
          x: x2,
          y: y2,
          force3D: true
        });
      }

      // 3. Esfera Terciaria Inferior: Movimiento ondulante coordinado
      if (orbWrapper3) {
        const waveX3 = Math.cos(scrollProgress * Math.PI * 2.2) * (horizontalRange * 0.6);
        const x3 = waveX3 + (smoothVelocity * 0.4);
        const y3 = (currentScrollY * 0.08) + (smoothVelocity * 0.6);

        gsap.set(orbWrapper3, {
          x: x3,
          y: y3,
          force3D: true
        });
      }
    });
  }

  // ==================== ANIMACIONES EN CASCADA AL HACER SCROLL (GSAP + SCROLLTRIGGER) ====================
  // Regla obligatoria de DESIGN_SYSTEM.md: Stagger y Fade Up a 60fps en móvil y escritorio
  const animateSections = [
    { target: "#stack .spatial-card-wrapper", stagger: 0.1 },
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

  // ==================== PINTADO INTERACTIVO DE LETRAS EN TÍTULOS DE SECCIONES ====================
  function setupSectionTitlePainting() {
    const sectionHeadings = document.querySelectorAll("section:not(#hero) h2");
    sectionHeadings.forEach((heading) => {
      splitTextIntoChars(heading);

      const chars = heading.querySelectorAll(".char-node");
      if (chars.length === 0) return;

      let resetTimer = null;

      heading.addEventListener("mousemove", (e) => {
        chars.forEach((char) => {
          const rect = char.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) return;
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

          // Al pasar el mouse por las palabras se pintan de naranja, y al alejarse vuelven a negro
          if (dist < 55) {
            gsap.to(char, {
              color: "#ff5500",
              y: -3,
              textShadow: "0 0 14px rgba(255, 85, 0, 0.45)",
              duration: 0.16,
              ease: "power2.out",
              overwrite: "auto"
            });
          } else {
            gsap.to(char, {
              color: "",
              y: 0,
              textShadow: "none",
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        });
      });

      heading.addEventListener("mouseleave", () => {
        gsap.to(chars, {
          color: "",
          y: 0,
          textShadow: "none",
          duration: 0.4,
          stagger: 0.01,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
    });
  }

  // Ejecutar inicialización de títulos interactivos
  setupSectionTitlePainting();

  // ==================== ACCIÓN DE BOTONES HERO & NAVEGACIÓN SUAVE ====================
  const heroBtnWa = document.getElementById("hero-btn-whatsapp");
  if (heroBtnWa) {
    heroBtnWa.addEventListener("click", (e) => {
      e.preventDefault();
      const href = heroBtnWa.getAttribute("href") || 
        "https://wa.me/527224495978?text=Hola%20Arturo,%20quiero%20cotizar%20una%20p%C3%A1gina%20web%20para%20mi%20negocio.%20%C2%BFMe%20puedes%20dar%20informes%20y%20paquetes?";
      window.open(href, "_blank");
    });
  }

  const heroBtnServicios = document.getElementById("hero-btn-servicios");
  if (heroBtnServicios) {
    heroBtnServicios.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof lenis !== "undefined") {
        lenis.scrollTo("#servicios", { offset: -70 });
      } else {
        const target = document.querySelector("#servicios");
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  const heroTechMail = document.getElementById("hero-tech-btn-mail");
  if (heroTechMail) {
    heroTechMail.addEventListener("click", (e) => {
      e.preventDefault();
      const href = heroTechMail.getAttribute("href");
      if (href) window.location.href = href;
    });
  }

  const heroTechWa = document.getElementById("hero-tech-btn-wa");
  if (heroTechWa) {
    heroTechWa.addEventListener("click", (e) => {
      e.preventDefault();
      const href = heroTechWa.getAttribute("href");
      if (href) window.open(href, "_blank");
    });
  }

  // Scroll suave global para cualquier enlace con hash (#seccion)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetHash = this.getAttribute("href");
      if (targetHash && targetHash.length > 1 && targetHash.startsWith("#")) {
        const targetElement = document.querySelector(targetHash);
        if (targetElement) {
          e.preventDefault();
          if (typeof lenis !== "undefined") {
            lenis.scrollTo(targetElement, { offset: -70 });
          } else {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    });
  });

});
