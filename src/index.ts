import './styles/twitch.scss';
import './styles/youtube.scss';

import { getChannel } from './api';
import { hostname, sidebarUpdateInterval } from './constants';
import Content from './core/content';
import IFrame from './core/iframe';
import Sidebar from './core/sidebar';
import { getLocalStorage } from './core/storage';
import { isFrame } from './utils/frame';

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

  if (!isFrame()) {
    return;
  }

  getChannel()
    .then((res) => new IFrame({ channel: res.data, language }))
    .catch(() => {});
};

init().catch((err) => console.error(err));
