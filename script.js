const flagshipStyles = document.createElement('link');
flagshipStyles.rel = 'stylesheet';
flagshipStyles.href = 'flagship.css?v=20260901c';
document.head.appendChild(flagshipStyles);

const fieldPhotoStyles = document.createElement('link');
fieldPhotoStyles.rel = 'stylesheet';
fieldPhotoStyles.href = 'field-photos.css?v=20260902photofix1';
document.head.appendChild(fieldPhotoStyles);

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

const approvedFieldPhoto = 'assets/ysi-hero.jpg?v=20260902photofix1';

// Keep any existing field-evidence markup on the approved documentary asset.
document.querySelectorAll('.field-mosaic img').forEach((image) => {
  image.src = approvedFieldPhoto;
  image.alt = 'Documentary field cleanup work at Lumley Beach in Freetown';
});

document.querySelectorAll('.field-mosaic figcaption').forEach((caption) => {
  caption.textContent = 'Documentary field photography from Lumley Beach, Freetown.';
});

// Homepage: replace any legacy placeholder illustration with approved documentary photography.
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

// Homepage field-evidence section, retained for older cached versions that do not yet contain it in HTML.
const impactStrip = document.querySelector('.impact-strip');
if (impactStrip && !document.getElementById('field-evidence-title')) {
  impactStrip.insertAdjacentHTML('afterend', `
    <section class="section field-evidence" aria-labelledby="field-evidence-title">
      <div class="wrap field-evidence-grid">
        <div class="field-evidence-copy">
          <p class="eyebrow">Field evidence</p>
          <h2 id="field-evidence-title">The work starts in the field.</h2>
          <p class="lede">YSI's longer-term systems work is grounded in direct experience with the waste stream, public-space cleanup and material handling in Freetown.</p>
          <p>Documentary photography from Lumley Beach shows the practical field conditions behind YSI's move from cleanup toward stronger waste-management and resource-recovery systems.</p>
          <div class="field-proof"><strong>Documented field work</strong><span>Lumley Beach • Freetown</span></div>
        </div>
        <figure class="field-mosaic">
          <img src="${approvedFieldPhoto}" loading="lazy" alt="Documentary field cleanup work at Lumley Beach in Freetown">
          <figcaption>Documentary field photography from Lumley Beach, Freetown.</figcaption>
        </figure>
      </div>
    </section>`);
}

// Flagship page: documentary evidence directly before the 16-step operating loop, retained for older cached HTML.
const processSection = document.querySelector('.process-section');
if (processSection && !document.getElementById('flagship-field-title')) {
  processSection.insertAdjacentHTML('beforebegin', `
    <section class="section field-evidence flagship-field-evidence" aria-labelledby="flagship-field-title">
      <div class="wrap field-evidence-grid">
        <div class="field-evidence-copy">
          <p class="eyebrow">Field experience behind the concept</p>
          <h2 id="flagship-field-title">Cleanup exposes the waste stream. Measurement turns it into evidence.</h2>
          <p class="lede">YSI's Lumley Beach field work provides direct experience with mixed coastal waste, cleanup logistics, manual handling and material-recovery challenges.</p>
          <p>The flagship concept is designed to move beyond cleanup alone by measuring what arrives, characterizing it, testing realistic recovery pathways and documenting the operating evidence needed before replication.</p>
          <div class="field-proof"><strong>Actual field photography</strong><span>The 16-step graphics below remain concept illustrations.</span></div>
        </div>
        <figure class="field-mosaic">
          <img src="${approvedFieldPhoto}" loading="lazy" alt="Documentary field cleanup work at Lumley Beach in Freetown">
          <figcaption>Documentary field photography from Lumley Beach, Freetown.</figcaption>
        </figure>
      </div>
    </section>`);
}
