import './styles/twitch.scss';
import './styles/youtube.scss';

import { getChannel } from './api/methods/whitelist';
import { hostname, sidebarUpdateInterval } from './constants';
import Content from './core/content';
import IFrame from './core/iframe';
import Sidebar from './core/sidebar';
import { getLocalStorage } from './core/storage';
import { isExtensionFrame } from './utils/frame';

const init = async (): Promise<void> => {
  const { language } = await getLocalStorage();

  if (window.location.hostname === hostname) {
    new Content({ language });
    new Sidebar({
      updateInterval: sidebarUpdateInterval,
      language,
    });

    return;
  }

  if (!isExtensionFrame()) {
    return;
  }

  const { data } = await getChannel(window.name.replace('sb:', ''));

  new IFrame({ channel: data, language });
};

init().catch((err) => console.error(err));
