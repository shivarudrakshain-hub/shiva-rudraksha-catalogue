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

test('chatbot answers Mukhi questions and special beads from Vedic Knowledge Graph', () => {
  const reply7 = getChatReply('What is 7 Mukhi Rudraksha?');
  assert.ok(reply7.text.includes('7 Mukhi Rudraksha'));
  assert.ok(reply7.text.includes('Goddess Mahalakshmi'));
  assert.equal(reply7.category, 'Mukhi Guidance');

  const reply14 = getChatReply('Tell me about 14 mukhi');
  assert.ok(reply14.text.includes('14 Mukhi Rudraksha'));
  assert.ok(reply14.text.includes('Deva Mani'));

  const replyGauri = getChatReply('Tell me about Gauri Shankar Rudraksha');
  assert.ok(replyGauri.source.includes('Gauri Shankar') || replyGauri.text.includes('Gauri Shankar'));
  assert.ok(replyGauri.text.includes('Shiva and Parvati') || replyGauri.text.includes('Ardhanarishvara'));

  const replyGanesh = getChatReply('Ganesh Rudraksha benefits');
  assert.ok(replyGanesh.text.includes('Ganesh Rudraksha'));
  assert.ok(replyGanesh.text.includes('Vighnaharta') || replyGanesh.text.includes('trunk'));

  const replySiddha = getChatReply('What is Sarva Siddha Mala?');
  assert.ok(replySiddha.text.includes('Siddha Mala'));
  assert.ok(replySiddha.text.includes('1 to 14 Mukhi'));
});

test('chatbot answers astrology, doshas, and life intention questions', () => {
  const replyShani = getChatReply('Which Rudraksha for Shani Sade Sati?');
  assert.ok(replyShani.text.includes('7 Mukhi') && replyShani.text.includes('14 Mukhi'));
  assert.equal(replyShani.category, 'Vedic Astrology');

  const replyWealth = getChatReply('Which Rudraksha is best for wealth and financial abundance?');
  assert.ok(replyWealth.text.includes('Wealth') || replyWealth.text.includes('wealth'));
  assert.ok(replyWealth.text.includes('7 Mukhi') || replyWealth.text.includes('Mahalakshmi'));

  const replyMarriage = getChatReply('Which Rudraksha is recommended for marriage and relationship harmony?');
  assert.ok(replyMarriage.text.includes('Gauri Shankar') || replyMarriage.text.includes('2 Mukhi'));

  const replyRashi = getChatReply('Which Rudraksha for Aries Mesha?');
  assert.ok(replyRashi.text.includes('Aries'));
});

test('chatbot answers custom knowledge and company store information', () => {
  const replyCustom = getChatReply('Can I get a custom mala with silver capping?');
  assert.ok(replyCustom.text.includes('silver wire/capping') || replyCustom.text.includes('custom'));

  const replyDifference = getChatReply('What is the difference between Nepal and Indonesian beads?');
  assert.ok(replyDifference.source.includes('Nepal and Indonesia') || replyDifference.text.includes('Nepal'));

  const replyJava = getChatReply('Tell me about Java vs Nepal size differences');
  assert.ok(replyJava.text.includes('Nepal Rudraksha') && replyJava.text.includes('Indonesian (Java)'));

  const replyLocation = getChatReply('Where is your store located?');
  assert.ok(replyLocation.text.includes('Scarborough') && replyLocation.text.includes('Canada'));

  const replyShipping = getChatReply('What are your shipping delivery times?');
  assert.ok(replyShipping.text.includes('Canada') && replyShipping.text.includes('USA'));
});

test('chatbot answers website operations: stock, ordering, login, privileges and secrets', () => {
  // 1. Stock availability (matching user prompt screenshots)
  const replyAvailable = getChatReply('is it available for sale now?');
  assert.ok(replyAvailable.text.includes('Stock & Inventory Availability'), 'Should answer stock availability');
  assert.ok(replyAvailable.text.includes('in stock and available for sale'), 'Should confirm active catalogue items are available');
  assert.equal(replyAvailable.category, 'Stock & Inventory');
  assert.equal(replyAvailable.agentRequested, undefined);

  const replyStock = getChatReply('what if the customer is asking about the stock?');
  assert.ok(replyStock.text.includes('Stock & Inventory Availability'));
  assert.ok(replyStock.text.includes('Live Online Inventory'));

  // 2. Ordering process (matching user prompt screenshots)
  const replyOrder = getChatReply('can i order now?');
  assert.ok(replyOrder.text.includes('How to Place an Order Online'), 'Should answer how to order');
  assert.ok(replyOrder.text.includes('Add to Sacred Cart') && replyOrder.text.includes('Guest Checkout'), 'Should mention cart and guest checkout');
  assert.equal(replyOrder.category, 'Orders & Purchasing');

  const replyHowOrder = getChatReply('how to order');
  assert.ok(replyHowOrder.text.includes('Add to Sacred Cart'));

  // 3. Login, account and guest checkout
  const replyLogin = getChatReply('how to login');
  assert.ok(replyLogin.text.includes('No Login Required to Order (Guest Checkout)'), 'Should explain guest checkout');
  assert.ok(replyLogin.text.includes('/profile') || replyLogin.text.includes('Account'), 'Should explain Account button');
  assert.equal(replyLogin.category, 'Account & Access');

  const replyAccount = getChatReply('do i need an account to place an order?');
  assert.ok(replyAccount.text.includes('Guest Checkout'));

  // 4. Privileges, access boundaries & secrets (matching user request)
  const replyPrivileges = getChatReply('what are user privileges and what can be accessed?');
  assert.ok(replyPrivileges.text.includes('What is Public & Freely Accessible'), 'Should detail public features');
  assert.ok(replyPrivileges.text.includes('What is Strictly Confidential & Kept Secret'), 'Should detail secrets');
  assert.equal(replyPrivileges.category, 'Website Features & Privileges');

  const replySecrets = getChatReply('which one to keep secret and confidential?');
  assert.ok(replySecrets.text.includes('Confidential & Kept Secret'));
  assert.ok(replySecrets.text.includes('Admin Portal') && replySecrets.text.includes('Wholesale'));

  // 5. Tracking & Payments
  const replyTracking = getChatReply('how do i track my order?');
  assert.ok(replyTracking.text.includes('Order Tracking & Status'));

  const replyPayment = getChatReply('what payment methods are accepted?');
  assert.ok(replyPayment.text.includes('Credit & Debit Cards') && replyPayment.text.includes('USD'));
});

