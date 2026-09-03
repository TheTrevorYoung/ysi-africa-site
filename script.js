// YSI Africa shared site behavior.
// Homepage hierarchy follows the approved v1.1 direction: YSI Africa first,
// institutional funder pathway visible but secondary.

const nav = document.querySelector('.nav');
const menuButton = document.querySelector('.menu');

// Standardize the principal navigation across every public page.
// Governance remains accessible through About, For Funders, the footer and contextual links,
// rather than competing with YSI's environmental work in the principal menu.
if (nav) {
  const onHome = /(^|\/)index\.html$/.test(location.pathname) || location.pathname === '/' || location.pathname.endsWith('/ysi-africa-site/');
  const links = [
    ['about.html', 'About Us', ''],
    [onHome ? '#work' : 'index.html#work', 'What We Do', ''],
    ['flagship.html', 'Waste Project', ''],
    ['aberdeen.html', 'Aberdeen', ''],
    ['evidence.html', 'Evidence', ''],
    ['contact.html', 'Contact Us', ''],
    ['funders.html', 'For Funders & Partners', 'nav-cta']
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

// HOMEPAGE REBALANCE v1.1 -----------------------------------------------------
const homeHero = document.querySelector('.hero#top');
if (homeHero) {
  const heading = homeHero.querySelector('h1');
  if (heading) heading.innerHTML = 'From cleanup to <span>system change.</span>';

  const intro = homeHero.querySelector('.intro');
  if (intro) {
    intro.innerHTML = '<strong>YSI Africa (Young Sustainability Initiative)</strong> is a Sierra Leonean environmental organization using direct field experience to build practical systems across waste management, circular economy, coastal and wetland protection, and community environmental action. We move from field work to measurement, testing and evidence-led decisions about what should improve or scale.';
  }

  const actions = homeHero.querySelector('.actions');
  if (actions) {
    actions.innerHTML = '<a class="btn btn-primary" href="#work">Explore Our Work</a><a class="btn btn-secondary" href="evidence.html">See the Evidence</a>';
    let funderPath = homeHero.querySelector('.hero-funder-path');
    if (!funderPath) {
      funderPath = document.createElement('a');
      funderPath.className = 'hero-funder-path';
      actions.insertAdjacentElement('afterend', funderPath);
    }
    funderPath.href = 'funders.html';
    funderPath.textContent = 'For Funders & Partners →';
  }
}

// Keep the strongest quantitative proof point simple on the homepage;
// methodology and evidence limitations remain on the Evidence page.
document.querySelectorAll('.impact-item.verified').forEach(item => {
  const span = item.querySelector('span');
  const small = item.querySelector('small');
  if (span) span.textContent = 'Waste removed';
  if (small) small.textContent = 'Through documented field activity in Freetown';
  let link = item.querySelector('.impact-evidence-link');
  if (!link) {
    link = document.createElement('a');
    link.className = 'impact-evidence-link';
    item.appendChild(link);
  }
  link.href = 'evidence.html#impact-dossier';
  link.textContent = 'View evidence & methodology →';
});

// Keep project status clear and put the two current system-development projects
// directly after the documented Lumley Beach field work.
const projectStack = document.querySelector('#projects .project-stack');
if (projectStack) {
  const cards = Array.from(projectStack.querySelectorAll('.project'));
  const rank = card => {
    const name = (card.querySelector('h3')?.textContent || '').trim().toLowerCase();
    if (name.includes('lumley')) return 0;
    if (name === 'waste project' || name.includes('local waste')) return 1;
    if (name.includes('aberdeen')) return 2;
    return 9;
  };
  cards.sort((a, b) => rank(a) - rank(b)).forEach(card => projectStack.appendChild(card));
}

// Institutional engagement remains useful evidence, but it should follow the
// organization's mission, projects, About and evidence/accountability story.
let proofStrip = document.querySelector('.institutional-proof-strip');
if (!proofStrip && homeHero) {
  proofStrip = document.createElement('section');
  proofStrip.className = 'institutional-proof-strip';
  proofStrip.setAttribute('aria-label', 'Independent coverage and institutional engagement');
  proofStrip.innerHTML = `
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
}

const transparencySection = document.querySelector('section#transparency');
if (proofStrip && transparencySection) {
  transparencySection.insertAdjacentElement('afterend', proofStrip);
}

// Governance remains visible on the homepage, but as an organizational credibility
// signal rather than a funder due-diligence pitch.
const homeContact = document.querySelector('section.contact#contact');
let governanceHome = document.querySelector('.funder-readiness-home, .governance-home');
if (homeContact) {
  if (!governanceHome) {
    governanceHome = document.createElement('section');
  }
  governanceHome.className = 'section governance-home';
  governanceHome.innerHTML = `
    <div class="wrap governance-home-card">
      <div>
        <p class="eyebrow">Governance & accountability</p>
        <h2>Building strong systems behind the environmental work.</h2>
        <p>YSI Africa is building the governance, financial controls, safeguarding, monitoring and evidence systems required for responsible environmental work and institutional partnership.</p>
      </div>
      <div class="governance-home-actions">
        <a class="btn btn-secondary" href="governance.html">Learn about our governance →</a>
      </div>
    </div>`;

  if (proofStrip && proofStrip.isConnected) proofStrip.insertAdjacentElement('afterend', governanceHome);
  else homeContact.insertAdjacentElement('beforebegin', governanceHome);

  // Broad closing invitation: funding is one collaboration route, not the whole story.
  const eyebrow = homeContact.querySelector('.eyebrow');
  const heading = homeContact.querySelector('h2');
  const paragraph = homeContact.querySelector('p:not(.eyebrow)');
  const actions = homeContact.querySelector('.contact-actions');
  if (eyebrow) eyebrow.textContent = 'Work with YSI Africa';
  if (heading) heading.textContent = 'Practical environmental solutions need the right collaborators.';
  if (paragraph) paragraph.textContent = 'YSI Africa welcomes collaboration with communities, public institutions, environmental organizations, researchers, technical experts, responsible businesses and funding partners working toward practical environmental solutions in Sierra Leone.';
  if (actions) actions.innerHTML = '<a class="btn btn-primary light-btn" href="contact.html">Contact YSI</a><a class="btn btn-secondary light-outline-btn" href="funders.html">For Funders & Partners</a>';
}

// EVIDENCE PAGE ---------------------------------------------------------------
// Turn the 20,000+ kg number into an inspectable dossier on the Evidence page,
// where the detailed qualification belongs.
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

// Keep older Aberdeen project cards aligned if encountered on a legacy page.
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

// Replace inaccurate legacy NGO schema typing with a more precise nonprofit type at runtime.
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

// Shared styles for the homepage hierarchy correction and evidence dossier.
if (!document.getElementById('institutional-site-styles')) {
  const style = document.createElement('style');
  style.id = 'institutional-site-styles';
  style.textContent = `
    .hero-funder-path{display:inline-block;margin-top:14px;color:var(--green);font-weight:900;text-decoration:none;font-size:.84rem}
    .hero-funder-path:hover{text-decoration:underline}
    .impact-evidence-link{display:block;margin-top:8px;color:var(--green);font-size:.72rem;font-weight:900;text-decoration:none}
    .institutional-proof-strip{background:#f8fbf8;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
    .institutional-proof-grid{display:grid;grid-template-columns:.82fr 1.18fr}
    .coverage-proof,.engagement-proof{padding:24px 27px}
    .coverage-proof{border-right:1px solid var(--line)}
    .coverage-proof small,.engagement-head small{display:block;color:var(--green2);font-weight:900;text-transform:uppercase;letter-spacing:.09em;font-size:.66rem}
    .coverage-proof strong,.coverage-proof span{display:block}.coverage-proof strong{font-size:1.08rem;margin-top:5px}.coverage-proof span{color:var(--muted);font-size:.82rem;margin:3px 0 8px}
    .coverage-proof a{color:var(--green);font-weight:900;text-decoration:none;font-size:.78rem}
    .engagement-head{display:flex;align-items:baseline;justify-content:space-between;gap:15px;margin-bottom:11px}.engagement-head span{color:var(--muted);font-size:.7rem}
    .engagement-chips{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.engagement-chips>span{border:1px solid #d7e3d9;background:#fff;border-radius:11px;padding:12px}
    .engagement-chips b,.engagement-chips em{display:block}.engagement-chips b{color:var(--green);font-size:.78rem}.engagement-chips em{font-style:normal;color:var(--muted);font-size:.68rem;margin-top:3px}
    .governance-home{background:#fff}.governance-home-card{border:1px solid #d7e3d9;background:#f7faf7;border-radius:20px;padding:34px 38px;display:grid;grid-template-columns:1.3fr .7fr;gap:34px;align-items:center}.governance-home-card h2{font-size:clamp(1.9rem,3vw,2.75rem);margin-bottom:12px}.governance-home-card p:last-child{color:var(--muted);max-width:760px}.governance-home-actions{justify-self:end}.governance-home-actions .btn{white-space:nowrap}
    .light-outline-btn{border-color:rgba(255,255,255,.6)!important;color:#fff!important;background:transparent!important}
    .dossier-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:34px}
    .dossier-grid article{background:#fff;border:1px solid var(--line);border-radius:16px;padding:24px}
    .dossier-grid b,.dossier-grid strong,.dossier-grid span{display:block}.dossier-grid b{color:var(--green2);font-size:.7rem;letter-spacing:.08em;text-transform:uppercase}.dossier-grid strong{margin:9px 0 6px;color:var(--green);font-size:1rem}.dossier-grid span{color:var(--muted);font-size:.84rem;line-height:1.45}
    .dossier-note{margin-top:18px;border-left:4px solid var(--green);background:#fff;padding:18px 20px;border-radius:0 12px 12px 0;color:#405047}
    @media(max-width:1040px){.institutional-proof-grid,.governance-home-card{grid-template-columns:1fr}.coverage-proof{border-right:0;border-bottom:1px solid var(--line)}.governance-home-actions{justify-self:start}.dossier-grid{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:760px){.engagement-chips,.dossier-grid{grid-template-columns:1fr}.engagement-head{display:block}.engagement-head span{display:block;margin-top:4px}.coverage-proof,.engagement-proof{padding:20px}.governance-home-card{padding:26px 22px}.hero-funder-path{margin-top:12px}}
  `;
  document.head.appendChild(style);
}
