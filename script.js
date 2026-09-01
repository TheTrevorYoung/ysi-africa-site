const flagshipStyles = document.createElement('link');
flagshipStyles.rel = 'stylesheet';
flagshipStyles.href = 'flagship.css?v=20260901b';
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

// Build the approved visual atlas from static Base64 text parts.
// Using a Blob URL avoids malformed binary commits and long data-URL rendering issues.
const flagshipVisualTargets = document.querySelectorAll('.step-thumb, .detail-visual, .network-canvas');
if (flagshipVisualTargets.length) {
  const atlasParts = [
    'assets/flagship-approved-00.txt?v=20260901b',
    'assets/flagship-approved-01.txt?v=20260901b',
    'assets/flagship-approved-02.txt?v=20260901b',
    'assets/flagship-approved-03.txt?v=20260901b',
    'assets/flagship-approved-04.txt?v=20260901b'
  ];

  Promise.all(atlasParts.map(url =>
    fetch(url, { cache: 'no-store' }).then(response => {
      if (!response.ok) throw new Error(`${url} returned ${response.status}`);
      return response.text();
    })
  ))
    .then(parts => {
      let atlas = parts.join('').replace(/\s+/g, '');
      if (!atlas.startsWith('/9j/')) throw new Error('Approved atlas is not JPEG Base64 data');
      const pad = (4 - (atlas.length % 4)) % 4;
      if (pad) atlas += '='.repeat(pad);

      const binary = atob(atlas);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);

      const blob = new Blob([bytes], { type: 'image/jpeg' });
      const objectUrl = URL.createObjectURL(blob);
      const testImage = new Image();

      testImage.onload = () => {
        const imageValue = `url("${objectUrl}")`;
        flagshipVisualTargets.forEach(element => {
          element.style.backgroundImage = imageValue;
        });
        document.documentElement.classList.add('flagship-images-ready');
      };

      testImage.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        throw new Error('Reconstructed flagship atlas is not a readable JPEG');
      };

      testImage.src = objectUrl;
    })
    .catch(error => console.error('Unable to load flagship illustrations:', error));
}
