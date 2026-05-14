// luvz-cinema.js — Cinematic Hero System
// Depends on: GSAP 3.12.5, ScrollTrigger, Lenis 1.0.42 (loaded via CDN before this file)
// Must load after: app.js, luvz-chat.js
// Do not reference any app.js internals from this file.

(function () {
  'use strict';

  const IS_TOUCH  = 'ontouchstart' in window;
  const IS_MOBILE = window.innerWidth <= 768;
  const REDUCED   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Nav Transparency (fires for all users, before early return) ──
  const nav = document.getElementById('nav');
  if (nav) {
    const heroForNav = document.getElementById('hero');
    if (heroForNav) {
      const navIO = new IntersectionObserver(function ([entry]) {
        if (entry.isIntersecting) {
          nav.classList.add('luvz-cin-nav-transparent');
        } else {
          nav.classList.remove('luvz-cin-nav-transparent');
        }
      }, { threshold: 0.1 });
      navIO.observe(heroForNav);
    }
  }

  if (IS_MOBILE || REDUCED) return;

  // ── Element References ──
  const hero       = document.getElementById('hero');
  const glow       = document.querySelector('.luvz-cin-glow');
  const jewelry    = document.querySelector('.luvz-cin-jewelry');
  const wordmark   = document.querySelector('.luvz-cin-text');
  const transition = document.querySelector('.luvz-cin-transition');
  const mask       = document.querySelector('.luvz-cin-mask');

  if (!hero || !jewelry || !wordmark) return;

  // Set initial states IMMEDIATELY — before any plugin registration
  gsap.set(jewelry, { y: 40, opacity: 0, scale: 0.92 });
  gsap.set(wordmark, { opacity: 0 });
  gsap.set(glow, { opacity: 0 });

  // ── GSAP Setup ──
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ force3D: false });

  // ── Lenis Smooth Scroll (hero-scoped, not global) ──
  function createLenisConfig() {
    return {
      duration: 1.6,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smooth: true,
      smoothTouch: false,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
    };
  }

  let lenis = null;
  let lenisTickerFn = null;

  function startLenis() {
    if (lenis) return;
    lenis = new Lenis({
      ...createLenisConfig(),
      wrapper: window,
      content: document.documentElement,
    });
    lenisTickerFn = function (time) { lenis.raf(time * 1000); };
    gsap.ticker.add(lenisTickerFn);
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);
  }

  function stopLenis() {
    if (!lenis) return;
    gsap.ticker.remove(lenisTickerFn);
    lenis.destroy();
    lenis = null;
    lenisTickerFn = null;
    window.__luvzLenisOverlays.clear();
  }

  // LENIS DISABLED — scroll issue under investigation
  // Native scroll active. Re-enable after root cause found.
  // ScrollTrigger handles all scroll-driven animation independently.
  // startLenis();

  // ── Overlay State Manager ──
  window.__luvzLenisOverlays = window.__luvzLenisOverlays || new Set();

  window.__luvzOverlayOpen = function (id) {
    window.__luvzLenisOverlays.add(id);
    if (lenis && window.__luvzLenisOverlays.size === 1) {
      lenis.stop();
    }
  };

  window.__luvzOverlayClose = function (id) {
    window.__luvzLenisOverlays.delete(id);
    if (lenis && window.__luvzLenisOverlays.size === 0) {
      lenis.start();
    }
  };

  // ── Flags for hero visibility, micro-float, and cursor RAF ──
  let heroVisible = true;
  let microFloatTween = null;
  let cursorActive = false;
  let cursorRAF = null;

  // ── Hero IntersectionObserver: start/stop Lenis on hero visibility ──
  const heroIO = new IntersectionObserver(function ([entry]) {
    heroVisible = entry.isIntersecting;
    if (heroVisible) {
      // startLenis();  // Lenis disabled
      if (microFloatTween) microFloatTween.resume();
    } else {
      // stopLenis();  // Lenis disabled
      if (microFloatTween) microFloatTween.pause();
      cursorActive = false;
      if (cursorRAF) { cancelAnimationFrame(cursorRAF); cursorRAF = null; }
    }
  }, { threshold: 0 });

  heroIO.observe(hero);

  // ── Entrance Timeline: glow → jewelry → wordmark ──
  const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });

  entrance
    .to(glow, {
      opacity: 1,
      duration: 4.0,
      ease: 'power2.out',
    }, 0)

    .to(jewelry, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 3.8,
      ease: 'power3.out',
    }, 1.2)

    .to(wordmark, {
      opacity: 1,
      duration: 2.0,
      ease: 'power2.out',
    }, 3.5)

    .call(function () {
      // ── Micro-float: 6px sine breathe, 5.5s cycle ──
      microFloatTween = gsap.to('.luvz-cin-mask', {
        y: 10,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // ── ScrollTrigger pause guard: pause during active scroll, resume on scroll end ──
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        onUpdate: function () { if (microFloatTween) microFloatTween.pause(); },
        onLeave: function () { if (microFloatTween) microFloatTween.resume(); },
        onEnterBack: function () { if (microFloatTween) microFloatTween.resume(); },
      });
    });

  // ── Scroll Choreography: three planes separate on scroll ──
  const scrollTL = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: '+=120%',
      scrub: 1.2,
    }
  });

  scrollTL
    .to(jewelry, {
      y: -70,
      scale: 1.08,
      ease: 'none',
    }, 0)

    .to(wordmark, {
      opacity: 0,
      ease: 'none',
      duration: 0.35,
    }, 0)

    .to(glow, {
      opacity: 0.4,
      scale: 1.04,
      ease: 'none',
    }, 0)

    .to(transition, {
      opacity: 1,
      ease: 'none',
      duration: 0.25,
    }, 0.75);

  // ── PHASE 4: CURSOR SYSTEM ──
  const cursorDot = document.querySelector('.luvz-cin-cursor-dot');
  const cursorRing = document.querySelector('.luvz-cin-cursor-ring');


  if (cursorDot && cursorRing && !IS_TOUCH) {
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;
    const DOT_LERP = 0.12;
    const RING_LERP = 0.08;

    // Single merged mousemove listener: first-move activation and coordinate tracking
    hero.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!cursorActive) {
        cursorActive = true;
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        startCursorRAF();
      }
    });

    hero.addEventListener('mouseleave', () => {
      cursorActive = false;
      if (cursorRAF) { cancelAnimationFrame(cursorRAF); cursorRAF = null; }
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });

    hero.addEventListener('mouseenter', () => {
      if (heroVisible) {
        cursorDot.style.opacity = '1';
      }
    });

    function startCursorRAF() {
      if (cursorRAF) cancelAnimationFrame(cursorRAF);
      function tick() {
        if (!cursorActive || !heroVisible) return;
        dotX += (mouseX - dotX) * DOT_LERP;
        dotY += (mouseY - dotY) * DOT_LERP;
        ringX += (mouseX - ringX) * RING_LERP;
        ringY += (mouseY - ringY) * RING_LERP;
        cursorDot.style.transform = `translate3d(${dotX - 5}px, ${dotY - 5}px, 0)`;
        cursorRing.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;
        cursorRAF = requestAnimationFrame(tick);
      }
      cursorRAF = requestAnimationFrame(tick);
    }

    // ── Jewelry Hover System ──
    if (mask) {
      mask.addEventListener('mouseenter', () => {
        cursorRing.classList.add('is-hovering');
        gsap.to(cursorDot, { scale: 0.5, overwrite: true, duration: 0.3 });
      });

      mask.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('is-hovering');
        gsap.to(cursorDot, { scale: 1, overwrite: true, duration: 0.3 });
      });
    }
  }

})();
