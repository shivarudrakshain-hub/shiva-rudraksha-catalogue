import test from "node:test";
import assert from "node:assert/strict";
import { createLiveChat, widgetUrl } from "../src/components/faqLiveChat.js";

const config = { propertyId: "0123456789abcdef01234567", widgetId: "widget123" };
function fixture({ failScript = false, timeout = false, configured = true } = {}) {
  const calls = [];
  const window = { setTimeout, clearTimeout };
  let scripts = 0;
  const document = {
    createElement: () => ({ remove() { calls.push("remove"); } }),
    head: { appendChild(script) {
      scripts++;
      if (timeout) return;
      if (failScript) return queueMicrotask(() => script.onerror());
      Object.assign(window.Tawk_API, {
        hideWidget: () => calls.push("hide"),
        showWidget: () => calls.push("show"),
        maximize: () => calls.push("maximize"),
        setChatInputMessage: value => calls.push(["prefill", value]),
        isChatOngoing: () => false,
      });
      queueMicrotask(() => window.Tawk_API.onLoad());
    } },
  };
  const client = createLiveChat({ window, document,
    fetch: async () => ({ ok: true, json: async () => configured ? config : {} }),
    configUrl: "/data/live-chat.json", timeoutMs: 30 });
  return { client, calls, window, scripts: () => scripts };
}

test("only valid public tawk widget identifiers can build an embed URL", () => {
  assert.equal(widgetUrl(config), "https://embed.tawk.to/0123456789abcdef01234567/widget123");
  for (const input of [null, {}, { ...config, widgetId: "../../evil" }, { ...config, propertyId: "https://other.test" }]) {
    assert.throws(() => widgetUrl(input));
  }
});
test("load on demand once, prefill question, and return to FAQs when minimized", async () => {
  const f = fixture();
  assert.equal(f.scripts(), 0);
  let minimized = false;
  await f.client.open("Can you help?", () => { minimized = true; });
  assert.deepEqual(f.calls, ["hide", "show", "maximize", ["prefill", "Can you help?"]]);
  f.window.Tawk_API.onChatMinimized();
  assert.equal(minimized, true);
  await f.client.open("Another question", () => {});
  assert.equal(f.scripts(), 1);
});
test("do not overwrite a visitor's ongoing conversation", async () => {
  const f = fixture();
  await f.client.open("", () => {});
  f.window.Tawk_API.isChatOngoing = () => true;
  await f.client.open("Do not overwrite draft", () => {});
  assert.equal(f.calls.filter(Array.isArray).length, 0);
});
test("missing account configuration makes no provider request", async () => {
  const f = fixture({ configured: false });
  await assert.rejects(f.client.open("test", () => {}), /not configured/);
  assert.equal(f.scripts(), 0);
});
test("script failures and timeouts reject and permit another attempt", async () => {
  for (const option of [{ failScript: true }, { timeout: true }]) {
    const f = fixture(option);
    await assert.rejects(f.client.open("test", () => {}), /could not connect/);
    await assert.rejects(f.client.open("retry", () => {}), /could not connect/);
    assert.equal(f.scripts(), 2);
  }
});
