import wowJsUrl from 'wowjs/dist/wow.js?url';

let loadPromise = null;

/** @returns {Promise<typeof window.WOW>} */
export function loadWowScript() {
  if (typeof window !== 'undefined' && window.WOW) {
    return Promise.resolve(window.WOW);
  }

  if (!loadPromise) {
    loadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = wowJsUrl;
      script.async = true;
      script.onload = () => {
        if (window.WOW) {
          resolve(window.WOW);
          return;
        }
        reject(new Error('WOW.js failed to load'));
      };
      script.onerror = () => reject(new Error('WOW.js script error'));
      document.head.appendChild(script);
    });
  }

  return loadPromise;
}
