import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE_PATH } from '../src/data/site.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'dist');
const output = path.join(root, 'dist-cloudflare');
const mounted = path.join(output, BASE_PATH.replace(/^\/+|\/+$/g, ''));
if (!existsSync(path.join(source, 'index.html'))) throw new Error('Run pnpm build first.');

// Only the generated public tree is uploaded. Never stage the project directory.
rmSync(output, { recursive: true, force: true });
mkdirSync(mounted, { recursive: true });
let count = 0;
function copyDirectory(from, to) {
  for (const entry of readdirSync(from, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || ['_headers', '_redirects'].includes(entry.name)) continue;
    if (entry.isSymbolicLink()) throw new Error('Symbolic links cannot be published.');
    if (/\.(?:map|pem|key)$/i.test(entry.name)) throw new Error('Private or source-map file in build.');
    const target = path.join(to, entry.name);
    if (entry.isDirectory()) {
      mkdirSync(target, { recursive: true });
      copyDirectory(path.join(from, entry.name), target);
    } else if (entry.isFile()) {
      cpSync(path.join(from, entry.name), target);
      count++;
    }
  }
}
copyDirectory(source, mounted);
for (const name of ['_headers', '.assetsignore']) {
  cpSync(path.join(root, 'public', name), path.join(output, name));
}
console.log(`Prepared ${count} public assets at ${BASE_PATH}; metadata and local configuration excluded.`);
