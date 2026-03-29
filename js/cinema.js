/* ============================================
   CINEMA.JS — GSAP powered cinematic effects
   ============================================ */

// Wait for everything to load
window.addEventListener('load', () => {

  // ---- 1. Page Loader ----
  const loader = document.getElementById('loader');
  setTimeout(() => {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        loader.style.display = 'none';
        initAnimations();
      }
    });
  }, 2000);

});

function initAnimations() {

  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // ---- 2. Scroll Progress Bar ----
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });

  // ---- 3. Hero Text Cinematic Reveal ----
  const heroTitle = document.querySelector('.hero-title');
  const heroTagline = document.querySelector('.hero-tagline');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroActions = document.querySelector('.hero-actions');

  gsap.set([heroTagline, heroTitle, heroSubtitle, heroActions], {
    opacity: 0,
    y: 60
  });

  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl
    .to(heroTagline,  { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
    .to(heroTitle,    { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.5')
    .to(heroSubtitle, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
    .to(heroActions,  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');

  // ---- 4. About Image Parallax ----
  const aboutImg = document.querySelector('.about-img');
  if (aboutImg) {
    const wrap = aboutImg.parentElement;
    wrap.classList.add('img-reveal-wrap');

    gsap.fromTo(aboutImg,
      { scale: 1.15, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Subtle parallax on scroll
    gsap.to(aboutImg, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  }

  // ---- 5. Section Titles Text Reveal ----
  const sectionTitles = document.querySelectorAll('.section-title');
  sectionTitles.forEach(title => {
    gsap.fromTo(title,
      { opacity: 0, y: 50, skewY: 2 },
      {
        opacity: 1, y: 0, skewY: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Section labels
  const sectionLabels = document.querySelectorAll('.section-label');
  sectionLabels.forEach(label => {
    gsap.fromTo(label,
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: label,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // ---- 6. About Text Lines Reveal ----
  const aboutDescs = document.querySelectorAll('.about-desc');
  aboutDescs.forEach((desc, i) => {
    gsap.fromTo(desc,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: desc,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // ---- 7. Stats Counter Animation ----
  const statNums = document.querySelectorAll('.stat-num');
  statNums.forEach(stat => {
    const original = stat.textContent;
    const numMatch = original.match(/[\d.]+/);
    if (!numMatch) return;

    const endVal = parseFloat(numMatch[0]);
    const prefix = original.split(numMatch[0])[0];
    const suffix = original.split(numMatch[0])[1] || '';
    const isDecimal = numMatch[0].includes('.');

    gsap.fromTo({ val: 0 },
      { val: 0 },
      {
        val: endVal,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        onUpdate: function() {
          const v = this.targets()[0].val;
          stat.textContent = prefix + (isDecimal ? v.toFixed(1) : Math.round(v)) + suffix;
        }
      }
    );
  });

  // ---- 8. Why Cards Stagger Reveal ----
  const whyCards = document.querySelectorAll('.why-card');
  gsap.fromTo(whyCards,
    { opacity: 0, y: 60, scale: 0.95 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.why-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );

  // ---- 9. Gallery Items Reveal ----
  const galleryItems = document.querySelectorAll('.gallery-item');
  gsap.fromTo(galleryItems,
    { opacity: 0, y: 50, scale: 0.96 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );

  // ---- 10. Menu Cards Stagger ----
  // Override the CSS animation — GSAP handles it now
  document.querySelectorAll('.menu-card').forEach(card => {
    card.style.opacity = '0';
  });

  // ---- 11. Magnetic Button Effect ----
  const magneticBtns = document.querySelectorAll('.btn-primary, .nav-cta');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });

  // ---- 12. Hero background subtle parallax ----
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });
  }

  // ---- 13. Contact section reveal ----
  const contactInfo = document.querySelector('.contact-info');
  const contactForm = document.querySelector('.contact-form-wrap');
  if (contactInfo && contactForm) {
    gsap.fromTo(contactInfo,
      { opacity: 0, x: -50 },
      {
        opacity: 1, x: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' }
      }
    );
    gsap.fromTo(contactForm,
      { opacity: 0, x: 50 },
      {
        opacity: 1, x: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' }
      }
    );
  }

  // ---- 14. Footer reveal ----
  gsap.fromTo('.footer-grid',
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
      scrollTrigger: { trigger: '.footer', start: 'top 90%' }
    }
  );
}

// ---- Re-animate menu cards when tab switches ----
// Override default renderMenu to add GSAP
const originalRenderMenu = window.renderMenu;
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setTimeout(() => {
      const cards = document.querySelectorAll('.menu-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power2.out'
        }
      );
    }, 50);
  });
});

// Initial menu card animation
setTimeout(() => {
  const cards = document.querySelectorAll('.menu-card');
  if (cards.length) {
    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.menu-grid', start: 'top 85%' }
      }
    );
  }
}, 2200);

