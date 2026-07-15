/**
 * Resolve asset URLs for local dev and GitHub Pages subpaths.
 */
const ROOT = new URL('../', import.meta.url);

export function modelUrl(filename) {
  return new URL(`public/brainstem_glb/${filename}`, ROOT).href;
}
