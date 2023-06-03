import { initPlatformFrame } from './core/frame';
import { initTwitchExtension } from './core/twitch';
import channelsDb from './db/channels.json';
import { isFrame } from './utils/dom';

if (isFrame()) {
  initPlatformFrame(channelsDb);
} else {
  initTwitchExtension(channelsDb);

  let previousUrl = '';

  const observer = new MutationObserver(() => {
    if (location.href !== previousUrl) {
      previousUrl = location.href;

      initTwitchExtension(channelsDb);
    }
  });

  observer.observe(document, { subtree: true, childList: true });
}
