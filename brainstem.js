import { initTheme } from './theme.js';
import { initPopup, showPopup, hidePopup } from './popup.js';
import { BrainstemScene } from './BrainstemScene.js';
import { getTheme } from './theme.js';

const loadingEl = document.getElementById('loading-banner');

let scene = null;

function updateLoading(loaded, total, done = false, failed = 0) {
  if (!loadingEl) return;

  if (done) {
    if (failed >= total || loaded === 0) {
      loadingEl.hidden = false;
      loadingEl.textContent =
        'Could not load 3D models. Ensure all .glb files are uploaded to the repo root and pushed to GitHub.';
      return;
    }
    loadingEl.hidden = true;
    return;
  }

  loadingEl.hidden = false;
  loadingEl.textContent = `Loading anatomical models… ${loaded}/${total}`;
}

initTheme((theme) => {
  scene?.setTheme(theme);
});

initPopup(() => {
  scene?.clearSelection();
});

scene = new BrainstemScene(document.getElementById('scene'), {
  theme: getTheme(),
  onSelect: (data) => showPopup(data.title, data.description),
  onLoadProgress: updateLoading,
});

window.addEventListener('error', (event) => {
  if (!loadingEl) return;
  loadingEl.hidden = false;
  loadingEl.textContent = `Failed to start viewer: ${event.message}`;
});
