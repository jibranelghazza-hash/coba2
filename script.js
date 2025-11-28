
  /* =========================================================
     Mobile Menu Toggle
  ========================================================== */
  (function () {
    const hamburger = document.getElementById('hamburger');
    const panel = document.getElementById('mobilePanel');

    if (hamburger && panel) {
      hamburger.addEventListener('click', () => {
        panel.classList.toggle('show');
        const expanded = panel.classList.contains('show');
        panel.setAttribute('aria-hidden', !expanded);
      });

      // close on link click
      document.querySelectorAll('.mobile-panel a')
        .forEach(a => a.addEventListener('click', () => panel.classList.remove('show')));
    }
  })();


  /* =========================================================
     Fade-on-Scroll (IntersectionObserver)
  ========================================================== */
  (function () {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    }, { threshold: 0.18 });

    document.querySelectorAll('.fade-on-scroll')
      .forEach(el => obs.observe(el));
  })();


  /* =========================================================
     Card Click Toggle (Mobile Desc Reveal)
  ========================================================== */
  (function () {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('active');
      });
    });
  })();


  /* =========================================================
     Testimoni Slider (Controls + Dots + Autoplay)
  ========================================================== */
  (function () {
    const slidesEl = document.querySelector('.slides');
    const slides   = document.querySelectorAll('.slide');
    const prevBtn  = document.getElementById('prev');
    const nextBtn  = document.getElementById('next');
    const dotsWrap = document.getElementById('dots');

    let index = 0;
    const total = slides.length;
    let autoTimer = null;
    const AUTOPLAY_DELAY = 4500;

    /* Create Dots */
    for (let i = 0; i < total; i++) {
      const d = document.createElement('div');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.dataset.i = i;
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }

    /* Update Slide Position & Dots */
    function update() {
      slidesEl.style.transform = `translateX(-${index * 100}%)`;
      document.querySelectorAll('.dot').forEach((dot, i) =>
        dot.classList.toggle('active', i === index)
      );
    }

    /* Go to Specific Slide */
    function goTo(i) {
      index = (i + total) % total;
      update();
      restartTimer();
    }

    /* Prev / Next Buttons */
    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));

    /* Autoplay */
    function startTimer() {
      autoTimer = setInterval(() => goTo(index + 1), AUTOPLAY_DELAY);
    }

    function restartTimer() {
      if (autoTimer) clearInterval(autoTimer);
      startTimer();
    }

    /* Pause Autoplay on Hover */
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', () => {
      if (autoTimer) clearInterval(autoTimer);
    });
    slider.addEventListener('mouseleave', () => restartTimer());

    /* Init */
    update();
    startTimer();
    window.addEventListener('resize', update);

    /* Keyboard Accessibility */
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
    });
  })(); 
