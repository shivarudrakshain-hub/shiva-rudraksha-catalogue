import test from 'node:test';
import assert from 'node:assert/strict';
import { findAnswer, getChatReply, isAgentRequest } from '../src/components/faqAnswers.js';

test('explicit agent requests show a handoff instead of failed FAQ matching', () => {
  for (const query of ['talk to agent', 'Talk to an agent please!', 'speak with a human', 'connect me to customer support', 'I want to chat with your team', 'live chat', 'customer service', 'Can I talk to an agent about cleaning?', 'live agent', 'talk to human', 'rep', 'owner', 'Can I speak to the owner?', 'I need a real person', 'human representative please', 'Can someone help me?', 'Please transfer me to an operator', 'contact staff', 'I want a live rep', 'speak with an advisor']) {
    const reply = getChatReply(query);
    assert.equal(reply.agentRequested, true, query);
    assert.equal(reply.unanswered, query);
    assert.equal(reply.source, undefined);
    assert.doesNotMatch(reply.text, /couldn.t find/);
  }
});
test('FAQ answers and unknown questions retain their existing behavior', () => {
  assert.equal(getChatReply('How do I clean Rudraksha?').source, 'How do I clean Rudraksha?');
  assert.equal(getChatReply('What is the weather tomorrow?').agentRequested, undefined);
  for (const query of ['How do I clean Rudraksha?', 'Does Rudraksha support meditation?', 'I do not want to talk to an agent']) assert.equal(isAgentRequest(query), false, query);
});
test('other common human-contact wording also offers the handoff', () => {
  for (const query of ['get me a person', 'human interaction', 'human assistance', 'speak to customer care', 'not a bot please', 'stop automated replies']) assert.equal(getChatReply(query).agentRequested, true, query);
});

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
