import { Streamer } from '../types';
import { hostname } from '../utils/constants';

const overrideTwitchDOM = (streamer: Streamer): void => {
  const root = document.querySelector('.root-scrollable__content');

  if (root) {
    root.innerHTML = `
      <iframe id="twitch-union" title="Stream frame" src="${streamer.source.url}?twitch=${streamer.twitch}" style="
        position: absolute;
        width: 100%;
        height: 100%;
      ">
      </iframe>
    `;
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
