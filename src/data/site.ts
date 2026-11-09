/** Deployment location shared by Vite, the app and the build scripts. */
export const SITE_ORIGIN = 'https://v2ai.org';
export const BASE_PATH = '/vibe-design/';
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH.replace(/\/$/, '')}`;

/** Resolve a file in public/ against the deployment base path. */
export function publicUrl(path: string): string {
  return `${BASE_PATH}${path.replace(/^\/+/, '')}`;
}
