(() => {
  const nav = document.querySelector('.profile nav');
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let scheduled = false;

  function setCurrent(index) {
    links.forEach((link, i) => {
      if (i === index) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });

  }
  function updateCurrentSection() {
    scheduled = false;
    const readingLine = Math.min(window.innerHeight * 0.3, 220);
    let current = 0;
    sections.forEach((section, index) => {
      if (section && section.getBoundingClientRect().top <= readingLine) current = index;
    });
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = links.length - 1;
    setCurrent(current);
  }
  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateCurrentSection);
  }
  links.forEach((link, index) => link.addEventListener('click', () => setCurrent(index)));
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate, { once: true });
  document.fonts.ready.then(scheduleUpdate);
  updateCurrentSection();
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const titleObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        titleObserver.unobserve(entry.target);
      });
    }, { threshold: 0.65, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.section-heading h2').forEach(title => titleObserver.observe(title));
  }

  document.querySelectorAll('details.abstract').forEach(details => {
    const summary = details.querySelector('summary');
    let desiredOpen = details.open;
    let animation = null;
    details.dataset.expanded = String(desiredOpen);
    function settle() {
      if (animation) {
        animation.onfinish = null;
        animation.cancel();
        animation = null;
      }
      details.open = desiredOpen;
      details.style.height = '';
      details.style.overflow = '';
      scheduleUpdate();
    }
    summary.addEventListener('click', event => {
      event.preventDefault();
      const startHeight = details.getBoundingClientRect().height;
      desiredOpen = !desiredOpen;
      details.dataset.expanded = String(desiredOpen);
      if (animation) {
        animation.onfinish = null;
        animation.cancel();
      }
      if (reducedMotion.matches || !details.animate) { settle(); return; }
      details.style.height = '';
      details.open = true;
      const border = parseFloat(getComputedStyle(details).borderTopWidth) + parseFloat(getComputedStyle(details).borderBottomWidth);
      const summaryMargin = parseFloat(getComputedStyle(summary).marginTop) + parseFloat(getComputedStyle(summary).marginBottom);
      const endHeight = desiredOpen ? details.getBoundingClientRect().height : summary.offsetHeight + summaryMargin + border;
      details.style.overflow = 'hidden';
      details.style.height = `${startHeight}px`;
      animation = details.animate({ height: [`${startHeight}px`, `${endHeight}px`] }, { duration: desiredOpen ? 300 : 240, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });
      animation.onfinish = settle;
    });
    window.addEventListener('resize', settle);
    reducedMotion.addEventListener('change', settle);
  });
})();
