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
test('documents, missing images, and unrelated uploads remain unchanged', () => {
  for (const [src, slot] of [['images/products/bead/certificate.avif','certificate'],['images/products/bead/xray.avif','xray'],['images/products/bead/certificate.avif','front'],['/uploads/bead.jpg','front'],['','top']]) assert.equal(productPhotoUrl(src,slot),src);
});
