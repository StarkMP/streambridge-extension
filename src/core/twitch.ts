import Sidebar from '../components/Sidebar';
import { Channel, ChannelInfo } from '../types';
import { hostname } from '../utils/constants';
import { getPlatform } from '../utils/db';

const selectors = {
  root: '.root-scrollable__content',
  wrapper: '.root-scrollable__wrapper',
  video: '.persistent-player video',
  iframe: '#stream-bridge',
};

const renderChannel = (db: Channel[]): void => {
  const href = window.location.href.toLowerCase();
  const channel = db.find((item) => href.includes(`/${item.twitch}`));
  const iframe = document.querySelector(selectors.iframe) as HTMLElement;
  const wrapper = document.querySelector(selectors.wrapper) as HTMLElement;

  if (!channel) {
    if (iframe && wrapper) {
      iframe.remove();

      wrapper.style.display = 'block';

      const video = document.querySelector(selectors.video) as HTMLVideoElement;

      if (video) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        video.play();
      }
    }

    return;
  }

  if (iframe) {
    iframe.remove();
  }

  const root = document.querySelector(selectors.root) as HTMLElement;
  const video = document.querySelector(selectors.video) as HTMLVideoElement;

  if (root && wrapper) {
    wrapper.style.display = 'none';

    if (video) {
      video.pause();
    }

    const link = `${channel.source.url}?twitch=${channel.twitch}`;
    const iframe = document.createElement('iframe');

    iframe.width = '100%';
    iframe.height = '100%';
    iframe.allow = 'autoplay';
    iframe.style.position = 'absolute';
    iframe.id = 'stream-bridge';
    iframe.setAttribute('src', link);

    root.appendChild(iframe);
  }
};

const renderSidebar = async (db: Channel[]): Promise<void> => {
  const channelsInfo: ChannelInfo[] = [];

  for await (const channel of db) {
    const platform = getPlatform(db, channel.twitch);

    if (channel && platform) {
      const info = await platform.getInfo(channel);

      if (info) {
        channelsInfo.push(info);
      }
    }
  }

  const intervalCb = (): void => {
    const twitchChannels = document.querySelector(
      '.side-nav-section:nth-of-type(2)'
    );

    if (!twitchChannels) {
      return;
    }

    const sidebar = document.querySelector('#stream-bridge-sidebar');

    if (sidebar) {
      sidebar.remove();
    }

    twitchChannels.insertAdjacentHTML('afterend', Sidebar(channelsInfo));
    clearInterval(interval);
  };

  const interval = setInterval(intervalCb, 250);
};

export const initTwitchExtension = (db: Channel[]): void => {
  if (window.location.hostname !== hostname) {
    return;
  }

  renderChannel(db);
  renderSidebar(db).catch(() => {});

  setInterval(() => {
    renderSidebar(db).catch(() => {});
  }, 60000);
};
