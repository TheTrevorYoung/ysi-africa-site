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

// Institutional-funder navigation: Governance + For Funders.
if (nav) {
  let governanceLink = nav.querySelector('a[href="governance.html"]');
  if (!governanceLink) {
    governanceLink = document.createElement('a');
    governanceLink.href = 'governance.html';
    governanceLink.textContent = 'Governance';
    const currentCTA = nav.querySelector('.nav-cta');
    if (currentCTA) currentCTA.insertAdjacentElement('beforebegin', governanceLink);
    else nav.appendChild(governanceLink);
  }
  let funderLink = nav.querySelector('a[href="funders.html"]');
  if (!funderLink) {
    const currentCTA = nav.querySelector('.nav-cta');
    if (currentCTA) {
      currentCTA.href = 'funders.html';
      currentCTA.textContent = 'For Funders';
      funderLink = currentCTA;
    } else {
      funderLink = document.createElement('a');
      funderLink.className = 'nav-cta';
      funderLink.href = 'funders.html';
      funderLink.textContent = 'For Funders';
      nav.appendChild(funderLink);
    }
  }
}

// Homepage: institutional-funder hero actions.
const homeHeroActions = document.querySelector('.hero#top .actions');
if (homeHeroActions) {
  homeHeroActions.innerHTML = '<a class="btn btn-primary" href="funders.html">For funders</a><a class="btn btn-secondary" href="evidence.html">See the evidence</a>';
}

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
        <div class="engagement-head"><small>Engaged with</small><span>Documented contact/exchange — not partnership or endorsement</span></div>
        <div class="engagement-chips">
          <span><b>EPA Sierra Leone</b><em>Direct organizational correspondence</em></span>
          <span><b>NPAA</b><em>Current Aberdeen Creek contact</em></span>
          <span><b>Mangrove Action Project</b><em>Active technical exchange</em></span>
        </div>
      </div>
    </div>`;
  impactStrip.insertAdjacentElement('afterend', section);
}

// Homepage: make institutional capacity explicit before the closing contact CTA.
const homeContact = document.querySelector('section.contact#contact');
if (homeContact && !document.querySelector('.funder-readiness-home')) {
  const section = document.createElement('section');
  section.className = 'section funder-readiness-home';
  section.innerHTML = `
    <div class="wrap funder-readiness-card">
      <div>
        <p class="eyebrow">Governance & accountability</p>
        <h2>Can YSI receive institutional funding and account for it?</h2>
        <p>See the legal record, internal controls, safeguarding, monitoring architecture, leadership, open readiness items and downloadable funder materials in one place.</p>
      </div>
      <div class="funder-readiness-actions">
        <a class="btn btn-primary" href="governance.html">Governance & accountability</a>
        <a class="btn btn-secondary" href="funders.html">For funders</a>
      </div>
    </div>`;
  homeContact.insertAdjacentElement('beforebegin', section);
}

// Accuracy correction: 20,000+ kg is YSI's public impact claim, not independently verified.
document.querySelectorAll('.impact-item.verified small').forEach(el => {
  el.textContent = 'YSI public impact claim — methodology record under reconstruction';
});
document.querySelectorAll('.status-item').forEach(item => {
  const label = item.querySelector('b');
  if (label && label.textContent.trim() === 'Verified public impact') label.textContent = 'Public impact claim';
});
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

// Styles for institutional homepage elements inserted above.
if (!document.getElementById('institutional-site-styles')) {
  const style = document.createElement('style');
  style.id = 'institutional-site-styles';
  style.textContent = `
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
    @media(max-width:1040px){.institutional-proof-grid,.funder-readiness-card{grid-template-columns:1fr}.coverage-proof{border-right:0;border-bottom:1px solid var(--line)}}
    @media(max-width:760px){.engagement-chips{grid-template-columns:1fr}.engagement-head{display:block}.engagement-head span{display:block;margin-top:4px}.coverage-proof,.engagement-proof{padding:20px}.funder-readiness-card{padding:28px 24px}}
  `;
  document.head.appendChild(style);
}
