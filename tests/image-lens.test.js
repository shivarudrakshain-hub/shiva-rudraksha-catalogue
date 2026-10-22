import test from 'node:test';
import assert from 'node:assert/strict';
import { imageLensGeometry } from '../src/data/imageLens.js';
const base = { width: 400, height: 400, naturalWidth: 1600, naturalHeight: 1200 };
test('lens ignores empty contain margins and maps the painted image center', () => {
  assert.equal(imageLensGeometry({ ...base, x: 200, y: 20 }), null);
  const lens = imageLensGeometry({ ...base, x: 200, y: 200 });
  assert.deepEqual(lens, { size: 180, left: 110, top: 110, backgroundSize: '960px 720px', backgroundPosition: '-390px -270px' });
});
test('portrait and small photos keep the complete lens within painted bounds', () => {
  const lens = imageLensGeometry({ width: 300, height: 200, naturalWidth: 200, naturalHeight: 400, x: 101, y: 1 });
  assert.equal(lens.size, 100);
  assert.equal(lens.left, 100);
  assert.equal(lens.top, 0);
  assert.equal(imageLensGeometry({ width: 0, height: 400, naturalWidth: 1600, naturalHeight: 1200, x: 0, y: 0 }), null);
});
