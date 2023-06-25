import './styles/twitch.scss';
import './styles/youtube.scss';

import { hostname, sidebarUpdateInterval } from './constants';
import Content from './core/content';
import IFrame from './core/iframe';
import Sidebar from './core/sidebar';
import { getLocalStorage } from './core/storage';
import db from './db/channels.json';
import { Channel } from './types';
import { isFrame } from './utils/frame';

const init = async (channelsData: Channel[]): Promise<void> => {
  const { language } = await getLocalStorage();

  if (window.location.hostname === hostname) {
    new Content({ channelsData, language });
    new Sidebar({
      channelsData,
      updateInterval: sidebarUpdateInterval,
      language,
    });

    return;
  }

  if (!isFrame()) {
    return;
  }

  const channel = channelsData.find(
    (item) =>
      window.location.hostname.includes(item.source.id) &&
      window.location.href.includes(item.source.channelId)
  );

  if (!channel) {
    return;
  }

  new IFrame({ channel, language });
};

init(db as Channel[]).catch((err) => console.error(err));
