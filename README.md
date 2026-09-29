# Arturo Reyes Germán — Portafolio Profesional

> **Ingeniero en Desarrollo de Software **  
> Single Page Application (SPA) comercial de alto impacto y conversión, diseñada bajo estándares editoriales suizos (*Swiss Style*) y directrices visuales de Silicon Valley.

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Stack Tecnológico & Dependencias](#-stack-tecnológico--dependencias)
- [Arquitectura de Interacción & Físicas 3D](#-arquitectura-de-interacción--físicas-3d)
- [Estructura del Portafolio](#-estructura-del-portafolio)
- [Detalle de Secciones](#-detalle-de-secciones)
- [Estructura de Archivos](#-estructura-de-archivos)
- [Instrucciones de Despliegue Local](#-instrucciones-de-despliegue-local)

---

## 🚀 Descripción General

Este proyecto es la plataforma web personal y comercial de **Arturo Reyes Germán**. Combina una estética editorial suiza en **fondo blanco puro (`#ffffff`)** con una arquitectura de físicas tridimensionales en tiempo real, micro-interacciones de alta fidelidad y un flujo de conversión sin fricción orientado a clientes empresariales y oportunidades de consultoría técnica.

---

## 🛠️ Stack Tecnológico & Dependencias

El portafolio está construido con una arquitectura ligera de **cero dependencias de compilación (*zero-build*)**, utilizando scripts y bibliotecas cargadas mediante CDN de alto rendimiento:

| Tecnología | Versión / CDN | Propósito en el Proyecto |
| :--- | :--- | :--- |
| **HTML5 Semántico** | Nativo W3C | Estructura semántica accesible (`header`, `main`, `section`, `article`, `footer`). |
| **Tailwind CSS** | CDN oficial | Sistema de diseño atómico, espaciado proporcional y paleta de colores. |
| **GSAP 3** | `3.12.5` | Motor de físicas: ondas de texto magnéticas, inclinación 3D, sombras proyectadas y parallax. |
| **ScrollTrigger** | `3.12.5` | Sincronización de eventos de scroll y viewport con animaciones GSAP. |
| **Lenis Scroll** | `1.1.18` | Scroll cinemático ultrasuave (*smooth scroll*) con respuesta táctil inmediata. |
| **Lucide Icons** | Latest | Iconografía SVG ligera, nítida y consistente. |
| **Google Fonts** | Web Fonts API | Jerarquía tipográfica suiza: *Plus Jakarta Sans*, *Inter* y *JetBrains Mono*. |

---

## 🎨 Sistema de Diseño & Tipografía

- **Filosofía**: Diseño Suizo Contemporáneo (*Swiss Editorial*), anti-cliché, contrastes limpios y espacio negativo generoso.
- **Paleta de Colores**:
  - `Fondo Primario`: Blanco puro `#ffffff`
  - `Superficies Secundarias`: `#f8fafc` / `#020617` (Tarjeta de contacto de alto contraste)
  - `Bordes de Precisión`: `#e2e8f0` (1px tajante)
  - `Acento de Marca`: Naranja de impacto `#ff5500`
  - `Texto Principal`: Slate profundo `#0f172a` y `#1e293b`
- **Tipografías**:
  - **Display / Titulares**: *Plus Jakarta Sans* (pesos 800/900 con `tracking-tighter`).
  - **Cuerpo Editorial**: *Inter* (pesos 400/500 con interlineado generoso `1.6-1.75`).
  - **Metadatos Técnicos & Código**: *JetBrains Mono* (pesos 500/700 para etiquetas y métricas).

---

## ⚡ Arquitectura de Interacción & Físicas 3D

1. **Hero Spatial Parallax**:
   - Las capas del Hero (titular monumental, insignias y métricas clave) flotan con profundidad tridimensional diferenciada (`data-depth`) respondiendo al movimiento del ratón en tiempo real.
2. **Onda Magnética de Caracteres (Pop-Out Text)**:
   - El titular `"Tecnología Sin Fricción Para Escalar"` fragmenta su texto en nodos individuales que detectan la proximidad del puntero, elevándose en el eje Z con escalado dinámico, color naranja y sombra de proyección profunda.
3. **Tarjetas 3D Tilt con Glare Dinámico (`.spatial-card`)**:
   - Inclinación espacial de hasta **14°** con perspectiva de `1000px`.
   - Elevación del contenido interno a **`translateZ(46px)`** para un efecto multicapa.
   - Reflejo de luz dinámico radial (*glare*) que persigue el puntero sobre la superficie de cada tarjeta.
   - Sombras volumétricas que se proyectan automáticamente en la dirección opuesta a la fuente de luz.
4. **Bolita Naranja Acompañante (`#cursor-ball`)**:
   - Puntero estándar de Windows activo para precisión nativa.
   - Esfera naranja seguidora con halo lumínico que orbita con inercia suave (`0.25`).
   - Compensación ergonómica visual (`+6px, +10px`) para abrazar el centro de gravedad del cursor de Windows sin estorbar la punta activa.
   - Expansión interactiva en hover a 40px sobre elementos clicables.

---

## 📐 Estructura del Portafolio

```text
├── Top Ticker          -> Aviso editorial de disponibilidad en tiempo real (2026 / LunTech)
├── Header              -> Marca con tracking suizo, navegación minimalista y CTA directo
├── 001. Hero           -> Titular monumental interactivo, propuesta de valor y métricas de impacto
├── 01. Trayectoria     -> Experiencia activa en producción como Ingeniero de Software en LunTech
├── 02. Stack & Arq.    -> Matriz tecnológica: Frontend, Backend, Infraestructura y Buenas Prácticas
├── 03. Servicios       -> Capacidades comerciales (Web Apps, Software a Medida, Rediseño UI/UX)
├── 04. Casos Modelo    -> Soluciones implementadas con métricas cuantificadas de ROI y retorno
├── 05. Metodología     -> Proceso predecible en 4 fases (Diagnóstico, Diseño, Ingeniería, Despliegue)
├── 06. Contacto        -> Tarjeta final de alta conversión con accesos directos a Email y WhatsApp
└── Footer              -> Información legal, año dinámico y accesos a perfiles profesionales
```

---

## 📁 Estructura de Archivos

```text
PaginaWeb/
├── index.html          # Estructura semántica HTML5 y maquetado con Tailwind CSS
├── css/
│   └── styles.css      # Estilos personalizados, resets de Lenis, físicas 3D y cursor
├── js/
│   └── main.js         # Motor JavaScript modular (Lenis, GSAP, Ticker, Físicas 3D, Onda Magnética)
├── README.md           # Documentación técnica exhaustiva del proyecto
├── DESIGN_SYSTEM.md    # Guía de estilo, directrices anti-cliché y estándares de Silicon Valley
└── AGENT.md            # Rol de arquitectura de software y lineamientos del asistente de desarrollo
```

---

## 💻 Instrucciones de Despliegue Local

### Opción 1: Mediante Servidor Local WAMP / XAMPP / Apache
1. Clona o copia la carpeta del proyecto dentro del directorio público de tu servidor web:
   ```text
   C:\wamp64\www\proyectosPersonales\PaginaWeb\
   ```
2. Inicia los servicios de Apache desde el panel de control de WAMP.
3. Abre tu navegador web e ingresa a:
   ```text
   http://localhost/proyectosPersonales/PaginaWeb/
   ```

### Opción 2: Mediante Visual Studio Code (Live Server)
1. Abre la carpeta del proyecto en **VS Code**.
2. Instala la extensión **Live Server** (si no la tienes instalada).
3. Haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**.

### Opción 3: Apertura Directa
Dado que todas las dependencias se importan a través de CDNs públicas con soporte CORS, puedes abrir el archivo `index.html` directamente haciendo doble clic desde el Explorador de Archivos de Windows en cualquier navegador moderno (Chrome, Edge, Firefox, Brave, Safari).

---

## 👤 Autor

**Arturo Reyes Germán**  
*Ingeniero en Desarrollo de Software en LunTech*  
- **Email:** [arturo.reyes.dev@gmail.com](mailto:arturo.reyes.dev@gmail.com)  
- **Disponibilidad:** Proyectos comerciales, consultoría técnica y arquitecturas escalables.
