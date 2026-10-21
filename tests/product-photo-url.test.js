import test from 'node:test';
import assert from 'node:assert/strict';
import { productPhotoUrl } from '../src/data/productPhotoUrl.js';
test('replaced bead photos get one stable version tag across paths and queries', () => {
  for (const src of ['images/products/bead/front.avif', './images/products/bead/front.avif', '/images/products/bead/front.avif', 'https://shivarudraksha.in/images/products/bead/front.avif?size=large#photo']) {
    const output = productPhotoUrl(src, 'front');
    const parsed = new URL(output, 'https://example.test/');
    assert.equal(parsed.searchParams.get('product_bg'), 'golden-v1');
    assert.equal(productPhotoUrl(output, 'front'), output);
    if (src.includes('size=')) { assert.equal(parsed.searchParams.get('size'), 'large'); assert.equal(parsed.hash, '#photo'); }
  }
});
test('certificate and X-ray photos refresh in galleries and fallbacks', () => {
  for (const slot of ['certificate', 'xray']) {
    const src = `/images/products/bead/${slot}.avif`;
    assert.equal(productPhotoUrl(src, slot), `${src}?product_bg=golden-v1`);
    assert.equal(productPhotoUrl(productPhotoUrl(src, slot), slot), productPhotoUrl(src, slot));
  }
});

test('missing images, unknown slots, and unrelated uploads remain unchanged', () => {
  for (const [src, slot] of [['/uploads/bead.jpg','front'],['','top'],['/images/products/bead/front.avif','other']]) assert.equal(productPhotoUrl(src,slot),src);
});
