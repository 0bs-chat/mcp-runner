export default defineContentScript({
  main() {
    console.log('Content script loaded');
  },
  matches: ['<all_urls>'],
});
