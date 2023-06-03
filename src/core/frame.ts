import platforms from '../streaming-platforms';
import { Channel } from '../types';

const overrideFrameDOM = (platformId: string): void => {
  platforms.forEach((item) => {
    if (item.id === platformId) {
      item.render();
    }
  });
};

export const initPlatformFrame = (db: Channel[]): void => {
  if (!window.top) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const twitch = params.get('twitch');

  if (!twitch) {
    return;
  }

  const channel = db.find((item) => item.twitch === twitch);

  if (!channel) {
    return;
  }

  overrideFrameDOM(channel.source.id);
};
