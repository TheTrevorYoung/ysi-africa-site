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

// Load the approved 4x4 flagship atlas assembled from the individual Drive graphics.
// The encoded atlas is split into small static text parts so GitHub Pages can serve it reliably.
const flagshipVisualTargets = document.querySelectorAll('.step-thumb, .detail-visual, .network-canvas');
if (flagshipVisualTargets.length) {
  const atlasParts = [
    'assets/flagship-approved-00.txt',
    'assets/flagship-approved-01.txt',
    'assets/flagship-approved-02.txt',
    'assets/flagship-approved-03.txt',
    'assets/flagship-approved-04.txt'
  ];

  Promise.all(atlasParts.map(url =>
    fetch(url, { cache: 'no-store' }).then(response => {
      if (!response.ok) throw new Error(`${url} returned ${response.status}`);
      return response.text();
    })
  ))
    .then(parts => {
      const atlas = parts.join('').replace(/\s+/g, '');
      if (!atlas.startsWith('/9j/') || !atlas.endsWith('==')) {
        throw new Error('Approved flagship atlas data is incomplete');
      }
      const imageUrl = `url("data:image/jpeg;base64,${atlas}")`;
      flagshipVisualTargets.forEach(element => {
        element.style.backgroundImage = imageUrl;
      });
    })
    .catch(error => {
      console.error('Unable to load approved flagship visuals:', error);
    });
}
