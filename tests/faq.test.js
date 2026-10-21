import test from 'node:test';
import assert from 'node:assert/strict';
import { questions } from '../src/components/faqData.js';
import { categories, filterQuestions } from '../src/components/faqSearch.js';

test('all FAQs including lifestyle guidance and energization steps remain accessible', () => {
  assert.equal(questions.length, 69);
  assert.equal(new Set(questions.map(q => q.id)).size, questions.length);
  assert.equal(new Set(questions.map(q => q.question)).size, questions.length);
  assert.deepEqual(filterQuestions(), questions);
  assert.ok(questions.every(q => q.question.trim() && q.answer.trim() && q.category.trim()));
  assert.equal(questions.filter(q => q.id >= 33 && q.id <= 62).length, 30);
});

test('every category partitions the full library without hiding entries', () => {
  const partition = categories.slice(1).flatMap(category => filterQuestions('', category));
  assert.equal(partition.length, questions.length);
  assert.equal(new Set(partition.map(q => q.id)).size, questions.length);
  assert.equal(filterQuestions('', 'Diet & Lifestyle').length, 5);
});

test('search covers restored questions, answers, categories, whitespace and case', () => {
  assert.ok(filterQuestions('  TRACKING   ').some(q => q.id === 56));
  assert.ok(filterQuestions('soft pouch').some(q => q.id === 49));
  assert.equal(filterQuestions('diet lifestyle').length, 5);
  assert.ok(filterQuestions('meat', 'Diet & Lifestyle').some(q => q.id === 63));
  assert.ok(filterQuestions('alcohol', 'Diet & Lifestyle').some(q => q.id === 64));
  assert.ok(filterQuestions('beef Nandi', 'Diet & Lifestyle').some(q => q.id === 65));
  assert.ok(filterQuestions('smoking', 'Diet & Lifestyle').some(q => q.id === 66));
  assert.ok(filterQuestions('intercourse', 'Diet & Lifestyle').some(q => q.id === 67));
  assert.ok(filterQuestions('intimacy uncomfortable').some(q => q.id === 67));
  assert.equal(filterQuestions('alcohol', 'Orders & Shipping').length, 0);
  assert.equal(filterQuestions('no-such-question-xyz').length, 0);
  assert.equal(filterQuestions('   ', 'All').length, 69);
});

test('energization steps are searchable in Spiritual Guidance', () => {
  const faq = filterQuestions('energize consecrate', 'Spiritual Guidance').find(q => q.id === 68);
  assert.ok(faq);
  assert.ok(faq.answer.includes('Om Namah Shivaya 108 times'));
  assert.ok(faq.answer.includes('1.') && faq.answer.includes('5.'));
});
