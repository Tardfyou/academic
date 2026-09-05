(() => {
  const links = [...document.querySelectorAll('.profile nav a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  let scheduled = false;

  function updateCurrentSection() {
    scheduled = false;
    const readingLine = Math.min(window.innerHeight * 0.3, 220);
    let current = 0;
    sections.forEach((section, index) => {
      if (section && section.getBoundingClientRect().top <= readingLine) current = index;
    });
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
      current = links.length - 1;
    }
    links.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateCurrentSection);
  }
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate, { once: true });
  updateCurrentSection();

  const profile = document.querySelector('.profile');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let lightFrame = 0;
  if (profile && finePointer.matches) {
    profile.addEventListener('pointermove', event => {
      if (reducedMotion.matches) return;
      window.cancelAnimationFrame(lightFrame);
      lightFrame = window.requestAnimationFrame(() => {
        const bounds = profile.getBoundingClientRect();
        profile.style.setProperty('--light-x', `${event.clientX - bounds.left}px`);
        profile.style.setProperty('--light-y', `${event.clientY - bounds.top}px`);
      });
    });
    profile.addEventListener('pointerleave', () => {
      window.cancelAnimationFrame(lightFrame);
      profile.style.removeProperty('--light-x');
      profile.style.removeProperty('--light-y');
    });
  }
})();
