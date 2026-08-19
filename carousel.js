document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-carousel]').forEach((gallery) => {
    const track = gallery.querySelector('.ds-carousel-track');
    const slides = Array.from(gallery.querySelectorAll('.ds-carousel-slide'));
    const dots = Array.from(gallery.querySelectorAll('[data-carousel-dot]'));
    const prev = gallery.querySelector('[data-carousel-prev]');
    const next = gallery.querySelector('[data-carousel-next]');
    const status = gallery.querySelector('[data-carousel-status]');
    if (!track || slides.length === 0) return;

    let index = 0;
    let timer = null;

    const update = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      if (status) status.textContent = `${index + 1} / ${slides.length}`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    };

    const goTo = (i) => {
      index = (i + slides.length) % slides.length;
      update();
    };

    const stopAutoplay = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (slides.length < 2) return;
      timer = setInterval(() => goTo(index + 1), 5000);
    };

    prev?.addEventListener('click', () => { goTo(index - 1); startAutoplay(); });
    next?.addEventListener('click', () => { goTo(index + 1); startAutoplay(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAutoplay(); }));

    gallery.addEventListener('mouseenter', stopAutoplay);
    gallery.addEventListener('mouseleave', startAutoplay);

    update();
    startAutoplay();
  });
});
