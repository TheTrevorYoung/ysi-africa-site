const flagshipStyles = document.createElement('link');
flagshipStyles.rel = 'stylesheet';
flagshipStyles.href = 'flagship.css';
document.head.appendChild(flagshipStyles);

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

// The optimized flagship atlas is currently stored as Base64 text in the
// repository. Convert that text into a browser-readable data URL at runtime.
// This keeps the visual gallery working while preserving the lightweight atlas.
const flagshipVisualTargets = document.querySelectorAll('.step-thumb, .detail-visual, .network-canvas');
if (flagshipVisualTargets.length) {
  fetch('assets/flagship-visual.jpg', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error(`Flagship visual asset returned ${response.status}`);
      return response.text();
    })
    .then(encoded => {
      const atlas = encoded.trim();
      if (!atlas.startsWith('/9j/')) throw new Error('Flagship visual atlas is not valid encoded JPEG data');
      const imageUrl = `url("data:image/jpeg;base64,${atlas}")`;
      flagshipVisualTargets.forEach(element => {
        element.style.backgroundImage = imageUrl;
      });
    })
    .catch(error => {
      console.error('Unable to load flagship visual atlas:', error);
    });
}
