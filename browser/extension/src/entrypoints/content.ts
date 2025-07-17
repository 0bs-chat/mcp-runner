export default defineContentScript({
  main(ctx) {
    console.log(ctx)

    // Relay function: listens for window messages and relays to background
    window.addEventListener('message', async (event) => {
      // Only accept messages from the same window
      if (event.source !== window) return;
      const { type, payload, relayId } = event.data || {};
      if (type !== 'RELAY_TO_BACKGROUND') return;
      chrome.runtime.sendMessage(payload, (response) => {
        window.postMessage({
          type: 'RELAY_FROM_BACKGROUND',
          relayId,
          response,
        }, '*');
      });
    });
  },

  matches: ['<all_urls>'],
})

export function relayToBackground(payload: any): Promise<any> {
  return new Promise((resolve) => {
    const relayId = Math.random().toString(36).slice(2);
    function handleResponse(event: MessageEvent) {
      if (
        event.source === window &&
        event.data &&
        event.data.type === 'RELAY_FROM_BACKGROUND' &&
        event.data.relayId === relayId
      ) {
        window.removeEventListener('message', handleResponse);
        resolve(event.data.response);
      }
    }
    window.addEventListener('message', handleResponse);
    window.postMessage({ type: 'RELAY_TO_BACKGROUND', payload, relayId }, '*');
  });
}