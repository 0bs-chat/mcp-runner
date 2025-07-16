import { TabShareExtension } from '../lib/tabShare';
import { PopupMessage } from '../../shared/types';

export default defineBackground(() => {
  const tabShare = new TabShareExtension();
  chrome.runtime.onMessage.addListener((message: PopupMessage, sender, sendResponse) => {
    return tabShare.onMessage(message, sender, sendResponse);
  });
});