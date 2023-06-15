import Sidebar from '../components/Sidebar';
import { Channel, ChannelInfo, UserStorage } from '../types';
import { getChannel, getPlatform } from '../utils/db';
import { onElementLoaded } from '../utils/dom';

const selectors = {
  root: '.root-scrollable__content',
  homeRoot: '.home__scrollable-content',
  wrapper: '.root-scrollable__wrapper',
  video: '.persistent-player video',
  iframe: '#stream-bridge',
  errorWrapper: '.core-error',
};

let channelStatusObserver: MutationObserver | void;

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

  if (channelStatusObserver) {
    channelStatusObserver.disconnect();
  }

  channelStatusObserver = onElementLoaded(selectors.errorWrapper, () => {
    const root = document.querySelector(selectors.root) as HTMLElement;
    const video = document.querySelector(selectors.video) as HTMLVideoElement;

    if (root && wrapper) {
      wrapper.style.display = 'none';
      root.style.overflow = 'hidden';

      const sidebars = document.querySelectorAll('.simplebar-track');

      if (sidebars.length > 0) {
        sidebars.forEach((el) => {
          (el as HTMLElement).style.display = 'none';
        });
      }

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
      channelStatusObserver = void 0;
    }
  });
};

export const renderSidebar = async (db: Channel[]): Promise<void> => {
  const channelsInfo: ChannelInfo[] = [];

  const storage = (await chrome.storage.local.get()) as UserStorage;

  if (storage.followed) {
    for await (const twitch of storage.followed) {
      const platform = getPlatform(db, twitch);

      if (!platform) {
        continue;
      }

      const channel = getChannel(db, twitch);

      if (!channel) {
        continue;
      }

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

  onElementLoaded('[role="group"]', (el) => {
    const sidebar = Sidebar(channelsInfo);

    el.insertAdjacentHTML('afterend', sidebar);
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
