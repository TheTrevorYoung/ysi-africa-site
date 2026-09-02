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

// Surface the dedicated Aberdeen Creek development-stage project page across the site.
if (nav && !nav.querySelector('a[href="aberdeen.html"]')) {
  const link = document.createElement('a');
  link.href = 'aberdeen.html';
  link.textContent = 'Aberdeen';
  const evidenceLink = nav.querySelector('a[href="evidence.html"]');
  if (evidenceLink) evidenceLink.insertAdjacentElement('afterend', link);
}

// Keep the homepage Aberdeen project card aligned with the current project stage.
document.querySelectorAll('.project h3').forEach((heading) => {
  if (heading.textContent.trim() !== 'Aberdeen Creek Protection') return;
  const card = heading.closest('.project');
  if (!card) return;
  const pill = card.querySelector('.pill');
  if (pill) {
    pill.textContent = 'Development-stage project';
    pill.classList.remove('alt');
    pill.classList.add('dev');
  }
  const summary = card.querySelector('p');
  if (summary) summary.textContent = 'YSI is developing an evidence-led Aberdeen Creek protection, baseline and ecological recovery programme focused on authority coordination, site evidence, waste-leakage pathways and technically defensible restoration decisions.';
  if (!card.querySelector('a[href="aberdeen.html"]')) {
    const projectLink = document.createElement('a');
    projectLink.className = 'text-link';
    projectLink.href = 'aberdeen.html';
    projectLink.textContent = 'Explore the Aberdeen Creek project →';
    card.appendChild(projectLink);
  }
});

// Upgrade the evidence-page Aberdeen section from advocacy-only wording to current development-stage status.
document.querySelectorAll('h2').forEach((heading) => {
  if (heading.textContent.trim() !== 'Aberdeen Creek and coastal protection.') return;
  const section = heading.closest('section');
  const copy = section && section.querySelector('.body-copy');
  if (!copy) return;
  copy.innerHTML = '<p><strong>YSI is developing an evidence-led Aberdeen Creek protection, baseline and ecological recovery programme.</strong> The current phase focuses on authority coordination, site evidence, GIS and boundary information, waste-leakage pathways, ecological diagnosis and technical review before physical intervention.</p><p>YSI has current communication with NPAA concerning Aberdeen Creek and an active technical exchange with Mangrove Action Project. These relationships are described according to their actual status and are not presented as project approval or formal partnership.</p><p><a class="text-link" href="aberdeen.html">View the Aberdeen Creek project page →</a></p>';
  const eyebrow = section.querySelector('.eyebrow');
  if (eyebrow) eyebrow.textContent = 'Development-stage wetland project';
});