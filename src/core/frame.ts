import services from '../streaming-services';
import { Channel } from '../types';

const overrideFrameDOM = (serviceId: string): void => {
  services.forEach((item) => {
    if (item.id === serviceId) {
      item.render();
    }
  });
};

export const initServiceFrame = (db: Channel[]): void => {
  if (!window.top) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const twitch = params.get('twitch');

  const channel = db.find((item) => item.twitch === twitch);

  if (!channel) {
    return;
  }

  overrideFrameDOM(channel.source.id);
};
