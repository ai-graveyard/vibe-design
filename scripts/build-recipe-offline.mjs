import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'node_modules/.tmp/recipe-offline');
await build({ configFile: false, root, plugins: [react()], define: { 'process.env.NODE_ENV': '"production"' }, logLevel: 'warn', build: {
  outDir: out, emptyOutDir: true, copyPublicDir: false, cssCodeSplit: false,
  lib: { entry: path.join(root, 'src/recipes/offline.tsx'), name: 'DesignRecipe', formats: ['iife'], fileName: () => 'workbench.js', cssFileName: 'workbench' },
} });
const js = await readFile(path.join(out, 'workbench.js'), 'utf8');
const css = await readFile(path.join(out, 'workbench.css'), 'utf8');
const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer"><title>设计配方 · Vibe Design Offline</title><style>html,body{margin:0;padding:0}body{height:100vh}button,textarea,input{font:inherit}${css}</style></head><body><div id="root"></div><script>${js.replace(/<\/script/gi, '<\\/script')}</script></body></html>`;
await mkdir(path.join(root, 'public'), { recursive: true });
await writeFile(path.join(root, 'public/vibe-design-offline.html'), html);
await rm(out, { recursive: true, force: true });
console.log(`Offline recipe workbench: ${(Buffer.byteLength(html) / 1024).toFixed(0)} KiB, self-contained.`);
