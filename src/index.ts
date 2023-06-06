import { initPlatformFrame } from './core/frame';
import { initTwitchExtension } from './core/twitch';
import channelsDb from './db/channels.json';
import { hostname } from './utils/constants';
import { isFrame } from './utils/frame';

const init = (): void => {
  if (window.location.hostname === hostname) {
    initTwitchExtension(channelsDb);

    return;
  }

  if (!isFrame()) {
    return;
  }

  initPlatformFrame(channelsDb);
};

init();
