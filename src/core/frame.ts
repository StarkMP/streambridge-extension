import services from '../streaming-services';
import { Streamer } from '../types';

const overrideFrameDOM = (serviceId: string): void => {
  services.forEach((item) => {
    if (item.id === serviceId) {
      item.render();
    }
  });
};

export const initServiceFrame = (db: Streamer[]): void => {
  if (!window.top) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const twitch = params.get('twitch');

  const streamer = db.find((item) => item.twitch === twitch);

  if (!streamer) {
    return;
  }

  overrideFrameDOM(streamer.source.id);
};
