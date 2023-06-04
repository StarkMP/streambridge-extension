import Sidebar from '../components/Sidebar';
import { Channel, ChannelInfo } from '../types';
import { getPlatform } from '../utils/db';
import { onElementLoaded } from '../utils/dom';

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

    const link = channel.source.url;
    const iframe = document.createElement('iframe');

    iframe.width = '100%';
    iframe.height = '100%';
    iframe.allow = 'autoplay; fullscreen';
    iframe.style.position = 'absolute';
    iframe.id = 'stream-bridge';
    iframe.setAttribute('src', link);

    root.appendChild(iframe);
  }
};

export const renderSidebar = async (db: Channel[]): Promise<void> => {
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

  const sidebar = document.querySelector('#stream-bridge-sidebar');

  if (sidebar) {
    sidebar.remove();
  }

  onElementLoaded('.side-nav-section:nth-of-type(2)', (el) => {
    el.insertAdjacentHTML('afterend', Sidebar(channelsInfo));
  });
};

export const initTwitchExtension = (db: Channel[]): void => {
  // SPA handling
  let previousUrl = '';

  const observer = new MutationObserver(() => {
    if (location.href !== previousUrl) {
      previousUrl = location.href;

      renderChannel(db);
    }
  });

  observer.observe(document, { subtree: true, childList: true });

  // render DOM
  renderChannel(db);
  renderSidebar(db).catch(() => {});

  // update DOM
  setInterval(() => {
    renderSidebar(db).catch(() => {});
  }, 60000);
};
