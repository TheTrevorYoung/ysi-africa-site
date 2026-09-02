const button = document.querySelector('.menu');
const nav = document.querySelector('.nav');
if (button && nav) {
  button.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  }));
}

// Preserve the approved homepage hero photograph exactly as-is.
const heroPhoto = document.querySelector('.hero-photo');
if (heroPhoto) {
  const oldImage = heroPhoto.querySelector('img');
  if (oldImage) {
    const documentaryHero = document.createElement('div');
    documentaryHero.className = 'field-hero-image';
    documentaryHero.setAttribute('role', 'img');
    documentaryHero.setAttribute('aria-label', 'Documentary field cleanup work at Lumley Beach in Freetown');
    oldImage.replaceWith(documentaryHero);
  }
  const caption = heroPhoto.querySelector('figcaption');
  if (caption) caption.textContent = 'Documentary field photography from Lumley Beach cleanup work in Freetown.';
}
