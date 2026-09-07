// Bright contextual imagery for core YSI Africa pages.
// Public context images are visually useful but must not be confused with YSI field evidence.
(() => {
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (path === 'index.html' || path === '') return;

  const publicImages = {
    lumley: {
      src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lumley%20Beach%20Freetown.JPG?width=1500',
      alt: 'Bright daytime view of Lumley Beach in Freetown, Sierra Leone',
      label: 'Lumley Beach · Freetown',
      note: 'Hussein Kefel, CC BY-SA 3.0. Public context image, not YSI field evidence.'
    },
    coast: {
      src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Beach%20in%20Freetown%2C%20Sierra%20Leone%20%2814176784751%29.jpg?width=1500',
      alt: 'Bright Freetown coastline with the peninsula in the background',
      label: 'Freetown coastline',
      note: 'Erik Cleves Kristensen, CC BY 2.0. Public context image, not YSI project evidence.'
    },
    mangrove: {
      src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mangroves%20swamp.jpg?width=1500',
      alt: 'Mangrove wetland near Lumley Beach west of Freetown',
      label: 'Freetown coastal mangrove context',
      note: 'Kazoo93, CC BY-SA 4.0. Wider environmental context, not site specific Aberdeen Creek evidence.'
    },
    aberdeen: {
      src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Aberdeen%20beach%20road.jpg?width=1500',
      alt: 'Daytime view of Aberdeen Beach Road in Freetown',
      label: 'Aberdeen · Freetown',
      note: 'Victor Turay, CC BY-SA 4.0. Public context image, not a claim about current YSI project conditions.'
    },
    field: {
      src: '/assets/images/lumley-field-2026-04-23.webp',
      alt: 'YSI shoreline cleanup work at Lumley Beach in Freetown',
      label: 'YSI field evidence · Lumley Beach',
      note: 'YSI documentary field image, 23 April 2026.'
    }
  };

  const pageSets = {
    'about.html': {
      eyebrow: 'YSI in place',
      title: 'The places behind the mission.',
      copy: 'YSI is built around real environmental conditions in Freetown. Field action, coastlines and wetlands shape the systems we are developing.',
      images: ['lumley', 'field', 'mangrove']
    },
    'flagship.html': {
      eyebrow: 'Freetown waste recovery',
      title: 'A waste system is a place, not a diagram.',
      copy: 'Phase 0 starts with the places where waste moves, leaks and reaches the coast. Measurement and routing decisions must reflect those real conditions.',
      images: ['field', 'coast', 'lumley']
    },
    'aberdeen.html': {
      eyebrow: 'Aberdeen Creek context',
      title: 'Protecting a wetland starts with seeing the setting.',
      copy: 'YSI is building the first phase around baseline evidence, leakage pathways, ecological conditions and authority coordination before physical intervention.',
      images: ['mangrove', 'aberdeen', 'coast']
    },
    'evidence.html': {
      eyebrow: 'Evidence in context',
      title: 'What we can show matters.',
      copy: 'YSI separates documentary field evidence from contextual imagery. That distinction keeps public claims clear while still showing the places behind the work.',
      images: ['field', 'lumley', 'coast']
    },
    'funders.html': {
      eyebrow: 'Funding the system',
      title: 'Fund measurable environmental work in real places.',
      copy: 'YSI is building from field experience toward stronger measurement, recovery testing, coastal protection and replicable operating models.',
      images: ['field', 'mangrove', 'coast']
    },
    'governance.html': {
      eyebrow: 'Accountability in practice',
      title: 'Strong field work needs strong institutional systems.',
      copy: 'Governance, evidence controls and financial discipline sit behind every credible environmental project YSI intends to prove and scale.',
      images: ['lumley', 'field', 'mangrove']
    }
  };

  const data = pageSets[path];
  if (!data || document.querySelector('.inner-visual-band')) return;

  const main = document.querySelector('main');
  if (!main) return;
  const firstSection = main.querySelector(':scope > section:first-of-type');
  if (!firstSection) return;

  const section = document.createElement('section');
  section.className = 'section inner-visual-band';
  section.setAttribute('aria-label', `${data.title} Visual context`);
  section.innerHTML = `
    <div class="wrap">
      <div class="inner-visual-head">
        <div><p class="eyebrow">${data.eyebrow}</p><h2>${data.title}</h2></div>
        <p>${data.copy}</p>
      </div>
      <div class="inner-visual-grid">
        ${data.images.map(key => {
          const image = publicImages[key];
          return `<figure class="inner-visual-card ${key === 'field' ? 'field-evidence-image' : ''}">
            <img src="${image.src}" alt="${image.alt}" loading="lazy" decoding="async">
            <figcaption><strong>${image.label}</strong><span>${image.note}</span></figcaption>
          </figure>`;
        }).join('')}
      </div>
    </div>`;

  firstSection.insertAdjacentElement('afterend', section);

  if (!document.getElementById('inner-visual-band-styles')) {
    const style = document.createElement('style');
    style.id = 'inner-visual-band-styles';
    style.textContent = `
      .inner-visual-band{background:#fff;padding-top:64px;padding-bottom:72px;border-bottom:1px solid #e4ece5}
      .inner-visual-head{display:grid;grid-template-columns:.8fr 1.2fr;gap:56px;align-items:end;margin-bottom:28px}
      .inner-visual-head h2{margin-bottom:0;font-size:clamp(2rem,4vw,3.5rem)}
      .inner-visual-head>p{margin:0;color:var(--muted);max-width:760px}
      .inner-visual-grid{display:grid;grid-template-columns:1.15fr .85fr .85fr;gap:14px}
      .inner-visual-card{margin:0;position:relative;min-height:320px;overflow:hidden;border-radius:18px;background:#edf2ed;box-shadow:0 12px 34px rgba(4,61,43,.06)}
      .inner-visual-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(1.09) saturate(1.03)}
      .inner-visual-card.field-evidence-image img{filter:brightness(1.12) saturate(1.02)}
      .inner-visual-card figcaption{position:absolute;left:11px;right:11px;bottom:11px;background:rgba(255,255,255,.94);border-radius:10px;padding:10px 12px;line-height:1.35}
      .inner-visual-card figcaption strong,.inner-visual-card figcaption span{display:block}
      .inner-visual-card figcaption strong{color:var(--green);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;margin-bottom:3px}
      .inner-visual-card figcaption span{color:#59655f;font-size:.67rem}
      @media(max-width:1040px){.inner-visual-head{grid-template-columns:1fr}.inner-visual-grid{grid-template-columns:1fr 1fr}.inner-visual-card:first-child{grid-column:1/3;min-height:420px}}
      @media(max-width:760px){.inner-visual-band{padding-top:46px;padding-bottom:52px}.inner-visual-head{gap:16px}.inner-visual-grid{grid-template-columns:1fr}.inner-visual-card,.inner-visual-card:first-child{grid-column:auto;min-height:300px;border-radius:14px}}
    `;
    document.head.appendChild(style);
  }
})();