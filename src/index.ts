import './styles/twitch.scss';
import './styles/youtube.scss';

import { hostname } from './constants';
import Content from './core/content';
import IFrame from './core/iframe';
import Sidebar from './core/sidebar';
import db from './db/channels.json';
import { detectLanguage } from './translations';
import { Channel, UserStorage } from './types';
import { isFrame } from './utils/frame';
import { getLocalStorage } from './utils/storage';

const init = async (channelsData: Channel[]): Promise<void> => {
  const storage = (await getLocalStorage()) as UserStorage;

  if (window.location.hostname === hostname) {
    new Content(channelsData);
    new Sidebar({
      channelsData,
      updateInterval: 60000,
      language: storage.language || detectLanguage(),
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

  new IFrame(channel);
};

init(db as Channel[]).catch((err) => console.error(err));
