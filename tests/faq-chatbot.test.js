import test from 'node:test';
import assert from 'node:assert/strict';
import { findAnswer } from '../src/components/faqAnswers.js';

test('chatbot retrieves ritual, milk, ghee, temple and second-energization answers', () => {
  const cases = [
    ['How do I energize my Rudraksha?', 68],
    ['energization', 68], ['energisation', 68], ['prana pratishtha', 68],
    ['Do I need to soak it in milk?', 69], ['How long in milk?', 69],
    ['How long in ghee?', 68], ['turmeric', 68],
    ['I cannot energize at home', 70], ['abhishek', 70], ['archana', 70],
    ['Can I energize again?', 71], ['second energization', 71],
    ['Can I offer a worn mala to an idol again?', 71]
  ];
  for (const [query, id] of cases) assert.equal(findAnswer(query)?.id, id, query);
});
test('chatbot keeps existing answers and unknown-question fallback', () => {
  assert.equal(findAnswer('Can I consume alcohol while wearing Rudraksha?')?.id, 64);
  assert.equal(findAnswer('How do I clean Rudraksha?')?.id, 20);
  assert.equal(findAnswer(''), null);
  assert.equal(findAnswer('What is the weather tomorrow?'), null);
});
