/**
 * ==========================================================================
 * ARTURO REYES GERMÁN — PORTAFOLIO PROFESIONAL
 * Script Principal: Animaciones, Físicas 3D & Motor Interactivo
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

  // ==================== BOLITA NARANJA SEGUIDORA DEL MOUSE ====================
  const cursorBall = document.getElementById("cursor-ball");

  if (cursorBall && window.matchMedia("(pointer: fine)").matches) {
    // Fijar anclaje al centro exacto con GSAP
    gsap.set(cursorBall, {
      xPercent: -50,
      yPercent: -50,
      force3D: true
    });

    // Compensación ergonómica del cursor de Windows:
    // La punta activa del cursor está en (0, 0), pero el cuerpo visible de la flecha desciende hacia (+6px, +10px).
    // Este offset sitúa la bolita centrada respecto a la flecha visual sin quedar flotando arriba.
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

    // Suave seguimiento orgánico con GSAP Ticker
    gsap.ticker.add(() => {
      ballX += (mouseX - ballX) * 0.25;
      ballY += (mouseY - ballY) * 0.25;

      gsap.set(cursorBall, {
        x: ballX,
        y: ballY,
        force3D: true
      });
    });

    // Expansión fluida al interactuar con elementos
    const interactives = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, .spatial-card, .menu-item-editorial, .tech-pill"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", () => cursorBall.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursorBall.classList.remove("is-hover"));
    });
  }

  // ==================== ONDA MAGNÉTICA FLUIDA POR CARACTERES (GSAP) ====================
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
    const radius = 220;

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

    heroHeading.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      charCoords.forEach((item) => {
        const dx = mouseX - item.cx;
        const dy = mouseY - item.cy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < radius) {
          const factor = Math.cos((distance / radius) * (Math.PI / 2));
          const pushX = -(dx / distance) * 26 * factor;
          const pushY = -(dy / distance) * 26 * factor;
          const scale = 1 + (0.45 * factor);

          const textShadow = factor > 0.25 
            ? `0 ${Math.round(14 * factor)}px ${Math.round(20 * factor)}px rgba(0, 0, 0, 0.18), 0 2px 4px rgba(255, 85, 0, 0.25)` 
            : "none";

          gsap.to(item.el, {
            x: pushX,
            y: pushY,
            scale: scale,
            textShadow: textShadow,
            color: factor > 0.4 ? "#ff5500" : "",
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
    });

    heroHeading.addEventListener("mouseleave", () => {
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
    });
  }

  // ==================== PARALLAX ESPACIAL 3D DEL HERO ====================
  const heroContainer = document.querySelector(".hero-spatial-container");
  const heroLayers = document.querySelectorAll(".hero-parallax-layer");
  if (heroContainer && heroLayers.length > 0) {
    heroContainer.addEventListener("mousemove", (e) => {
      const rect = heroContainer.getBoundingClientRect();
      const xRel = (e.clientX - rect.left) / rect.width - 0.5;
      const yRel = (e.clientY - rect.top) / rect.height - 0.5;

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
    });

    heroContainer.addEventListener("mouseleave", () => {
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
    });
  }

  // ==================== 3D TILT TÁCTIL, SOMBRA DINÁMICA & GLARE (EFECTO EXTENDIDO) ====================
  const spatialCards = document.querySelectorAll(".spatial-card");
  spatialCards.forEach((card) => {
    const glare = card.querySelector(".card-glare");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Inclinación más amplia y prolongada (14 grados)
      const rotateX = -((y - centerY) / centerY) * 14;
      const rotateY = ((x - centerX) / centerX) * 14;

      // Sombra física proyectada con más recorrido
      const shadowX = -((x - centerX) / centerX) * 22;
      const shadowY = Math.max(16, ((y - centerY) / centerY) * 20 + 32);
      const isDark = card.classList.contains("spatial-card-dark");
      const shadowColor = isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(15, 23, 42, 0.18)";
      const glowColor = isDark ? "rgba(255, 85, 0, 0.4)" : "rgba(255, 85, 0, 0.25)";

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.025,
        z: 22,
        boxShadow: `${shadowX}px ${shadowY}px 65px -12px ${shadowColor}, 0 16px 36px -8px ${glowColor}`,
        duration: 0.28,
        ease: "power2.out",
        transformPerspective: 1000,
        overwrite: "auto"
      });

      if (glare) {
        glare.style.opacity = "1";
        glare.style.background = `radial-gradient(circle 320px at ${x}px ${y}px, rgba(255, 85, 0, 0.2), transparent 70%)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        z: 0,
        boxShadow: "",
        duration: 0.85,
        ease: "power3.out",
        overwrite: "auto"
      });

      if (glare) {
        glare.style.opacity = "0";
      }
    });
  });

});
