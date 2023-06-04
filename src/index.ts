import { initPlatformFrame } from './core/frame';
import { initTwitchExtension } from './core/twitch';
import channelsDb from './db/channels.json';
import { hostname } from './utils/constants';
import { isTwitchChildFrame } from './utils/frame';

const init = (): void => {
  if (window.location.hostname === hostname) {
    initTwitchExtension(channelsDb);

    return;
  }

  if (!isTwitchChildFrame()) {
    return;
  }

  initPlatformFrame(channelsDb);
};

init();
