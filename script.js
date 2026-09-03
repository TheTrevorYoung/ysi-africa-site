// YSI Africa shared site behavior and institutional-funder journey.

const nav = document.querySelector('.nav');
const menuButton = document.querySelector('.menu');

// Standardize the principal navigation across every public page.
if (nav) {
  const onHome = /(^|\/)index\.html$/.test(location.pathname) || location.pathname === '/' || location.pathname.endsWith('/ysi-africa-site/');
  const links = [
    ['about.html', 'About Us', ''],
    [onHome ? '#work' : 'index.html#work', 'What We Do', ''],
    ['flagship.html', 'Waste Project', ''],
    ['aberdeen.html', 'Aberdeen', ''],
    ['evidence.html', 'Evidence', ''],
    ['governance.html', 'Governance & Accountability', ''],
    ['funders.html', 'For Funders', 'nav-cta'],
    ['contact.html', 'Contact Us', '']
  ];
  nav.innerHTML = links.map(([href, text, className]) => {
    const currentFile = location.pathname.split('/').pop() || 'index.html';
    const targetFile = href.split('#')[0].split('?')[0];
    const current = targetFile && currentFile === targetFile ? ' aria-current="page"' : '';
    return `<a${className ? ` class="${className}"` : ''} href="${href}"${current}>${text}</a>`;
  }).join('');
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

// Preserve the approved homepage documentary photograph.
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

// Homepage: move the institutional story from cleanup alone to system change.
const homeHero = document.querySelector('.hero#top');
if (homeHero) {
  const heading = homeHero.querySelector('h1');
  if (heading) heading.innerHTML = 'From cleanup to <span>system change.</span>';
  const intro = homeHero.querySelector('.intro');
  if (intro) intro.innerHTML = '<strong>YSI Africa (Young Sustainability Initiative)</strong> is a Sierra Leonean environmental organization using direct field experience to build measurable systems for waste interception, recovery, coastal protection and environmental learning. Its public record includes 20,000+ kg of waste removed through field activity in Freetown; the evidence page discloses the current proof status and the stronger monitoring standard now being built.';
  const actions = homeHero.querySelector('.actions');
  if (actions) actions.innerHTML = '<a class="btn btn-primary" href="funders.html">For Funders</a><a class="btn btn-secondary" href="evidence.html">See the Evidence</a>';
}

// Homepage: make the 20,000+ kg proof hook inspectable.
document.querySelectorAll('.impact-item.verified').forEach(item => {
  const small = item.querySelector('small');
  if (small) small.textContent = 'YSI public impact claim — evidence chain under reconstruction';
  if (!item.querySelector('.impact-evidence-link')) {
    const link = document.createElement('a');
    link.className = 'impact-evidence-link';
    link.href = 'evidence.html#impact-dossier';
    link.textContent = 'View the evidence →';
    item.appendChild(link);
  }
});

document.querySelectorAll('.status-item').forEach(item => {
  const label = item.querySelector('b');
  if (label && label.textContent.trim() === 'Verified public impact') label.textContent = 'Public impact claim';
});

// Homepage: independent coverage + accurately labeled institutional engagement.
const impactStrip = document.querySelector('.impact-strip');
if (impactStrip && !document.querySelector('.institutional-proof-strip')) {
  const section = document.createElement('section');
  section.className = 'institutional-proof-strip';
  section.setAttribute('aria-label', 'Independent coverage and institutional engagement');
  section.innerHTML = `
    <div class="wrap institutional-proof-grid">
      <div class="coverage-proof">
        <small>Independent coverage</small>
        <strong>South Africa Today</strong>
        <span>April 2026 coverage of sustained Lumley Beach cleanup work.</span>
        <a href="https://southafricatoday.net/africa/young-volunteers-clear-100-days-of-plastic-waste-from-freetowns-lumley-beach-in-fight-against-pollution/" target="_blank" rel="noopener">Read independent coverage →</a>
      </div>
      <div class="engagement-proof">
        <div class="engagement-head"><small>Institutional engagement</small><span>Documented contact/exchange — not partnership or endorsement</span></div>
        <div class="engagement-chips">
          <span><b>EPA Sierra Leone</b><em>Direct organizational correspondence</em></span>
          <span><b>NPAA</b><em>Current Aberdeen Creek contact</em></span>
          <span><b>Mangrove Action Project</b><em>Active technical exchange</em></span>
        </div>
      </div>
    </div>`;
  impactStrip.insertAdjacentElement('afterend', section);
}

// Homepage: make institutional capacity visible before the final contact section.
const homeContact = document.querySelector('section.contact#contact');
if (homeContact && !document.querySelector('.funder-readiness-home')) {
  const section = document.createElement('section');
  section.className = 'section funder-readiness-home';
  section.innerHTML = `
    <div class="wrap funder-readiness-card">
      <div>
        <p class="eyebrow">Governance & accountability</p>
        <h2>Can YSI receive institutional funding and account for it?</h2>
        <p>Review YSI's legal record, leadership, internal controls, safeguarding, monitoring architecture, open readiness items and forwardable funder materials in one place.</p>
      </div>
      <div class="funder-readiness-actions">
        <a class="btn btn-primary" href="governance.html">Governance & Accountability</a>
        <a class="btn btn-secondary" href="funders.html">For Funders</a>
      </div>
    </div>`;
  homeContact.insertAdjacentElement('beforebegin', section);
}

// Evidence page: turn the 20,000+ kg number into an inspectable evidence dossier now,
// while clearly showing what remains to be reconstructed.
const verifiedSection = document.querySelector('section#verified');
if (verifiedSection && !document.getElementById('impact-dossier')) {
  const section = document.createElement('section');
  section.className = 'section soft impact-dossier';
  section.id = 'impact-dossier';
  section.innerHTML = `
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">20,000+ kg evidence dossier</p>
        <h2>Turn the public claim into an auditable proof point.</h2>
        <p>This is the current evidence-chain status. YSI is publishing what is known and what still needs reconstruction rather than filling gaps with assumptions.</p>
      </div>
      <div class="dossier-grid">
        <article><b>01 · Location</b><strong>Lumley Beach, Freetown</strong><span>Documented YSI field activity and photography.</span></article>
        <article><b>02 · Activity</b><strong>Repeated cleanup and waste handling</strong><span>Collection, movement, sorting and field logistics are documented.</span></article>
        <article><b>03 · Period</b><strong>Calculation period under reconstruction</strong><span>The exact start/end dates used for the 20,000+ kg calculation have not yet been recovered.</span></article>
        <article><b>04 · Measurement method</b><strong>Original calculation record not yet recovered</strong><span>The historical mass-calculation source and method are being reconstructed.</span></article>
        <article><b>05 · Attribution</b><strong>YSI public impact claim</strong><span>The exact calculation and attribution chain is being rebuilt from available records.</span></article>
        <article><b>06 · Independent verification</b><strong>Not independently verified</strong><span>External media documents the field activity but does not independently verify the full mass calculation.</span></article>
      </div>
      <div class="dossier-note"><strong>Monitoring standard going forward:</strong> pilot and cleanup records will progressively use auditable weights, dates, sites, weighing method, material categories, destinations, responsible staff and supporting evidence so future public impact figures can be traced directly to source records.</div>
    </div>`;
  verifiedSection.insertAdjacentElement('afterend', section);
}

// Accuracy correction for legacy evidence-page wording.
const impactProof = document.querySelector('.impact-proof');
if (impactProof) {
  const label = impactProof.querySelector('small');
  if (label) label.textContent = 'YSI public impact claim';
  const p = impactProof.querySelector('p');
  if (p) p.textContent = 'YSI\'s historical 20,000+ kg figure is supported by extensive operating documentation, but the original mass-calculation source has not yet been recovered and the figure has not been independently verified.';
}

document.querySelectorAll('.legend-item').forEach(item => {
  const strong = item.querySelector('strong');
  const span = item.querySelector('span');
  if (strong && strong.textContent.trim() === 'Verified') {
    strong.textContent = 'Public claim';
    if (span) span.textContent = 'A stated YSI impact figure with its evidence status disclosed.';
  }
});

document.querySelectorAll('.proof-copy h2').forEach(h => {
  if (h.textContent.includes('One number we can defend')) h.textContent = 'One public claim is stronger when its evidence limits are visible.';
});

document.querySelectorAll('.proof-copy > p').forEach(p => {
  if (p.textContent.includes('does not inflate its public record')) {
    p.textContent = 'YSI does not inflate its public record with unsupported beneficiary totals, revenue figures, equipment claims, project outcomes or environmental results. The historical 20,000+ kg figure remains a YSI public impact claim while its original mass-calculation source is reconstructed; future claims will be tied to auditable weight and mass-balance records.';
  }
});

// Keep homepage Aberdeen project card aligned with the current project stage.
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

// Replace inaccurate NGO schema typing with a more precise nonprofit organization type at runtime.
document.querySelectorAll('script[type="application/ld+json"]').forEach(node => {
  try {
    const obj = JSON.parse(node.textContent);
    const replaceType = value => {
      if (Array.isArray(value)) return value.forEach(replaceType);
      if (!value || typeof value !== 'object') return;
      if (value['@type'] === 'NGO') value['@type'] = 'NonprofitOrganization';
      Object.values(value).forEach(replaceType);
    };
    replaceType(obj);
    node.textContent = JSON.stringify(obj);
  } catch (_) {}
});

// Shared styles for institutional additions.
if (!document.getElementById('institutional-site-styles')) {
  const style = document.createElement('style');
  style.id = 'institutional-site-styles';
  style.textContent = `
    .impact-evidence-link{display:block;margin-top:8px;color:var(--green);font-size:.72rem;font-weight:900;text-decoration:none}
    .institutional-proof-strip{background:#f8fbf8;border-bottom:1px solid var(--line)}
    .institutional-proof-grid{display:grid;grid-template-columns:.82fr 1.18fr}
    .coverage-proof,.engagement-proof{padding:24px 27px}
    .coverage-proof{border-right:1px solid var(--line)}
    .coverage-proof small,.engagement-head small{display:block;color:var(--green2);font-weight:900;text-transform:uppercase;letter-spacing:.09em;font-size:.66rem}
    .coverage-proof strong,.coverage-proof span{display:block}.coverage-proof strong{font-size:1.08rem;margin-top:5px}.coverage-proof span{color:var(--muted);font-size:.82rem;margin:3px 0 8px}
    .coverage-proof a{color:var(--green);font-weight:900;text-decoration:none;font-size:.78rem}
    .engagement-head{display:flex;align-items:baseline;justify-content:space-between;gap:15px;margin-bottom:11px}.engagement-head span{color:var(--muted);font-size:.7rem}
    .engagement-chips{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.engagement-chips>span{border:1px solid #d7e3d9;background:#fff;border-radius:11px;padding:12px}
    .engagement-chips b,.engagement-chips em{display:block}.engagement-chips b{color:var(--green);font-size:.78rem}.engagement-chips em{font-style:normal;color:var(--muted);font-size:.68rem;margin-top:3px}
    .funder-readiness-home{background:#fff}
    .funder-readiness-card{border:1px solid #cdddcf;background:linear-gradient(120deg,#eef7e9,#f5faf5);border-radius:22px;padding:42px;display:grid;grid-template-columns:1.2fr .8fr;gap:40px;align-items:center}
    .funder-readiness-card h2{font-size:clamp(2rem,3.5vw,3.15rem)}.funder-readiness-card p:last-child{color:var(--muted);max-width:760px}
    .funder-readiness-actions{display:grid;gap:10px;justify-items:start}
    .dossier-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:34px}
    .dossier-grid article{background:#fff;border:1px solid var(--line);border-radius:16px;padding:24px}
    .dossier-grid b,.dossier-grid strong,.dossier-grid span{display:block}.dossier-grid b{color:var(--green2);font-size:.7rem;letter-spacing:.08em;text-transform:uppercase}.dossier-grid strong{margin:9px 0 6px;color:var(--green);font-size:1rem}.dossier-grid span{color:var(--muted);font-size:.84rem;line-height:1.45}
    .dossier-note{margin-top:18px;border-left:4px solid var(--green);background:#fff;padding:18px 20px;border-radius:0 12px 12px 0;color:#405047}
    @media(max-width:1040px){.institutional-proof-grid,.funder-readiness-card{grid-template-columns:1fr}.coverage-proof{border-right:0;border-bottom:1px solid var(--line)}.dossier-grid{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:760px){.engagement-chips,.dossier-grid{grid-template-columns:1fr}.engagement-head{display:block}.engagement-head span{display:block;margin-top:4px}.coverage-proof,.engagement-proof{padding:20px}.funder-readiness-card{padding:28px 24px}}
  `;
  document.head.appendChild(style);
}
