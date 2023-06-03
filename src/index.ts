import { initPlatformFrame } from './core/frame';
import { initTwitchExtension } from './core/twitch';
import channelsDb from './db/channels.json';
import { hostname } from './utils/constants';
import { isFrame } from './utils/dom';

if (isFrame()) {
  initPlatformFrame(channelsDb);
} else {
  if (window.location.hostname === hostname) {
    initTwitchExtension(channelsDb);

    // SPA handling
    let previousUrl = '';

    const observer = new MutationObserver(() => {
      if (location.href !== previousUrl) {
        previousUrl = location.href;

        initTwitchExtension(channelsDb);
      }
    });

    observer.observe(document, { subtree: true, childList: true });
  }
}
