export function widgetUrl(config) {
  const { propertyId, widgetId } = config || {};
  if (!/^[a-f0-9]{24}$/i.test(propertyId || "") || !/^[a-z0-9]+$/i.test(widgetId || "")) {
    throw new Error("Live chat is not configured");
  }
  return `https://embed.tawk.to/${propertyId}/${widgetId}`;
}

export function createLiveChat({ window, document, fetch, configUrl, timeoutMs = 15000 }) {
  let loading;
  let onMinimize = () => {};
  async function load() {
    if (loading) return loading;
    loading = (async () => {
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), timeoutMs);
      let config;
      try {
        const response = await fetch(configUrl, { signal: controller.signal });
        if (!response.ok) throw new Error("Live chat configuration unavailable");
        config = await response.json();
      } finally {
        window.clearTimeout(timer);
      }
      const src = widgetUrl(config);
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        const api = {};
        window.Tawk_API = api;
        window.Tawk_LoadStart = new Date();
        const fail = () => {
          window.clearTimeout(timeout);
          api.onLoad = () => api.hideWidget?.();
          script.remove();
          reject(new Error("Live chat could not connect"));
        };
        const timeout = window.setTimeout(fail, timeoutMs);
        api.onBeforeLoad = () => api.hideWidget?.();
        api.onLoad = () => {
          window.clearTimeout(timeout);
          api.hideWidget();
          resolve(api);
        };
        api.onChatMinimized = () => {
          api.hideWidget();
          onMinimize();
        };
        script.async = true;
        script.src = src;
        script.charset = "UTF-8";
        script.crossOrigin = "anonymous";
        script.onerror = fail;
        document.head.appendChild(script);
      });
    })().catch((error) => {
      loading = undefined;
      throw error;
    });
    return loading;
  }
  return {
    async open(question, handleMinimize) {
      const api = await load();
      onMinimize = handleMinimize;
      api.showWidget();
      api.maximize();
      // Prefill only. The visitor still reviews and sends their own message.
      if (question && !api.isChatOngoing?.()) api.setChatInputMessage?.(question);
    },
  };
}

let client;
export function openLiveChat(question, onMinimize) {
  client ||= createLiveChat({ window, document, fetch: window.fetch.bind(window),
    configUrl: `${import.meta.env.BASE_URL}data/live-chat.json` });
  return client.open(question, onMinimize);
}
