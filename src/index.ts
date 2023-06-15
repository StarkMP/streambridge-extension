import './styles/twitch.scss';

import { hostname } from './constants';
import Content from './core/content';
import IFrame from './core/iframe';
import Sidebar from './core/sidebar';
import db from './db/channels.json';
import { Channel } from './types';
import { isFrame } from './utils/frame';

const init = (channelsData: Channel[]): void => {
  if (window.location.hostname === hostname) {
    new Content(channelsData);
    new Sidebar({ channelsData, updateInterval: 60000 });

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

init(db as Channel[]);
