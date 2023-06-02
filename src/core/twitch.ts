import { Streamer } from '../types';
import { hostname } from '../utils/constants';

const overrideTwitchDOM = (streamer: Streamer): void => {
  const root = document.querySelector(
    '.root-scrollable__content'
  ) as HTMLElement;
  const wrapper = document.querySelector(
    '.root-scrollable__wrapper'
  ) as HTMLElement;

  if (root && wrapper) {
    wrapper.style.display = 'none';

    const link = `${streamer.source.url}?twitch=${streamer.twitch}`;
    const iframe = document.createElement('iframe');

    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.position = 'absolute';
    iframe.id = 'twitch-union';
    iframe.setAttribute('src', link);

    root.appendChild(iframe);
  }
};

export const initTwitchExtension = (db: Streamer[]): void => {
  if (window.location.hostname !== hostname) {
    return;
  }

  const href = window.location.href.toLowerCase();

  const streamer = db.find((item) => href.includes(`/${item.twitch}`));

  if (!streamer) {
    return;
  }

  overrideTwitchDOM(streamer);
};
