import { Channel } from '../types';
import { hostname } from '../utils/constants';

const selectors = {
  root: '.root-scrollable__content',
  wrapper: '.root-scrollable__wrapper',
  video: '.persistent-player video',
  iframe: '#twitch-union',
};

const overrideTwitchDOM = (channel: Channel): void => {
  const iframeElement = document.querySelector(selectors.iframe) as HTMLElement;

  if (iframeElement) {
    iframeElement.remove();
  }

  const root = document.querySelector(selectors.root) as HTMLElement;
  const wrapper = document.querySelector(selectors.wrapper) as HTMLElement;
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
    iframe.style.position = 'absolute';
    iframe.id = 'twitch-union';
    iframe.setAttribute('src', link);

    root.appendChild(iframe);
  }
};

export const initTwitchExtension = (db: Channel[]): void => {
  if (window.location.hostname !== hostname) {
    return;
  }

  const href = window.location.href.toLowerCase();

  const channel = db.find((item) => href.includes(`/${item.twitch}`));

  if (!channel) {
    const iframe = document.querySelector(selectors.iframe) as HTMLElement;
    const wrapper = document.querySelector(selectors.wrapper) as HTMLElement;

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

  overrideTwitchDOM(channel);
};
