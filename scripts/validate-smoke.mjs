import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';
import { openChrome } from './lib/chrome.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'output/smoke');
mkdirSync(output, { recursive: true });
const build = JSON.parse(readFileSync(path.join(root, 'dist/build-id.json'), 'utf8'));
const report = { status: 'testing', buildId: build.id, checks: [] };
const server = await preview({ root, preview: { host: '127.0.0.1', port: 0 }, logLevel: 'error' });
let browser;

try {
  const base = server.resolvedUrls.local[0].replace(/\/$/, '');
  browser = await openChrome();
  const waitFor = async (expression, label) => {
    const deadline = Date.now() + 15000;
    while (Date.now() < deadline) {
      if (await browser.evaluate(expression).catch(() => false)) return;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    throw new Error(`Smoke check timed out: ${label}`);
  };
  const healthy = async label => {
    assert.deepEqual(browser.errors, [], `${label}: no runtime exceptions`);
    const failedResources = await browser.evaluate(`performance.getEntriesByType('resource').filter(entry => entry.responseStatus >= 400).map(entry => new URL(entry.name).pathname)`);
    assert.deepEqual(failedResources, [], `${label}: no failed resources`);
    assert.equal(await browser.evaluate('document.documentElement.scrollWidth > innerWidth'), false, `${label}: no horizontal overflow`);
    report.checks.push(label);
  };

  await browser.viewport(1280, 900);
  await browser.navigate(`${base}/`);
  await waitFor(`document.querySelector('main h1')?.textContent.includes('DESIGN')`, 'home renders');
  await healthy('Desktop home renders');
  await browser.screenshot(path.join(output, 'home.png'));

  await browser.viewport(375, 812);
  await browser.navigate(`${base}/project?style=swiss`);
  await waitFor(`document.querySelectorAll('.project-direction').length === 3 && document.querySelector('.project-export-actions button')?.disabled === false`, 'project recommendations and export');
  await browser.evaluate(`document.querySelector('.project-direction-links button').click()`);
  await waitFor(`document.querySelectorAll('.project-shortlist-items button').length === 2`, 'shortlist interaction');
  await healthy('Mobile project recommendations, export readiness and shortlist work');
  await browser.screenshot(path.join(output, 'project-mobile.png'));

  await browser.viewport(1280, 900);
  await browser.navigate(`${base}/compare/apple/swiss?mode=content&scene=dashboard`);
  await waitFor(`document.querySelectorAll('iframe.demo-viewport-frame').length === 2 && [...document.querySelectorAll('iframe.demo-viewport-frame')].every(frame => frame.contentDocument?.readyState === 'complete' && frame.contentDocument.querySelector('h1')?.textContent.trim())`, 'comparison frames');
  const headings = await browser.evaluate(`[...document.querySelectorAll('iframe.demo-viewport-frame')].map(frame => frame.contentDocument.querySelector('h1').textContent.trim())`);
  assert.equal(headings[0], headings[1], 'Both comparison frames render the same scene content');
  await healthy('Deep comparison link renders both demos');
  await browser.screenshot(path.join(output, 'compare.png'));

  report.status = 'passed';
  console.log('Smoke checks passed: desktop home, mobile project interaction and deep-linked comparison.');
} catch (error) {
  report.status = 'failed';
  report.failure = { message: error.message, browserErrors: browser?.errors ?? [] };
  await browser?.screenshot(path.join(output, 'failure.png')).catch(() => {});
  throw error;
} finally {
  try {
    if (browser) await browser.close();
  } finally {
    server.httpServer.closeAllConnections();
    await new Promise(resolve => server.httpServer.close(resolve));
    report.finishedAt = new Date().toISOString();
    writeFileSync(path.join(output, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  }
}
