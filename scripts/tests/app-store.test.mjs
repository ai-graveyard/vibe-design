import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeAppSettings } from '../../src/store/appStore.ts';

const current = {
  language: 'zh',
  theme: 'light',
  previewDevice: 'desktop',
  isDetailsPanelCollapsed: false,
};

test('valid persisted settings override defaults', () => {
  const restored = mergeAppSettings({ language: 'en', theme: 'dark', previewDevice: 'mobile', isDetailsPanelCollapsed: true }, current);
  assert.deepEqual(restored, { language: 'en', theme: 'dark', previewDevice: 'mobile', isDetailsPanelCollapsed: true });
});

test('invalid and partial persisted settings fall back field by field', () => {
  const restored = mergeAppSettings({ language: 'fr', theme: 'dark', previewDevice: 'watch', isDetailsPanelCollapsed: 'yes' }, current);
  assert.deepEqual(restored, { language: 'zh', theme: 'dark', previewDevice: 'desktop', isDetailsPanelCollapsed: false });
  assert.deepEqual(mergeAppSettings(null, current), current);
});
