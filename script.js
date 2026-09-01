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
// Decode it into a normal JPEG Blob first. This avoids long data-URL background issues
// seen on some mobile browsers and keeps the approved graphics undistorted.
const flagshipVisualTargets = document.querySelectorAll('.step-thumb, .detail-visual, .network-canvas');
if (flagshipVisualTargets.length) {
  const localParts = [
    'assets/flagship-approved-00.txt',
    'assets/flagship-approved-01.txt',
    'assets/flagship-approved-02.txt',
    'assets/flagship-approved-03.txt',
    'assets/flagship-approved-04.txt'
  ];

  const rawBase = 'https://raw.githubusercontent.com/TheTrevorYoung/ysi-africa-site/main/assets/';
  const rawParts = localParts.map(path => rawBase + path.split('/').pop());

  const getParts = urls => Promise.all(urls.map(url =>
    fetch(url, { cache: 'no-store' }).then(response => {
      if (!response.ok) throw new Error(`${url} returned ${response.status}`);
      return response.text();
    })
  ));

  const applyAtlas = parts => {
    const atlas = parts.join('').replace(/\s+/g, '');
    if (!atlas.startsWith('/9j/')) throw new Error('Approved flagship atlas is not JPEG data');

    const binary = atob(atlas);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);

    const blob = new Blob([bytes], { type: 'image/jpeg' });
    const objectUrl = URL.createObjectURL(blob);
    const preload = new Image();

    preload.onload = () => {
      const imageUrl = `url("${objectUrl}")`;
      flagshipVisualTargets.forEach(element => {
        element.style.backgroundImage = imageUrl;
      });
      document.documentElement.classList.add('flagship-images-ready');
    };

    preload.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      console.error('Approved flagship atlas could not be decoded as an image.');
    };

    preload.src = objectUrl;
  };

  getParts(localParts)
    .catch(() => getParts(rawParts))
    .then(applyAtlas)
    .catch(error => {
      console.error('Unable to load approved flagship visuals:', error);
    });
}
