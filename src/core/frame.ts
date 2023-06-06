import platforms from '../streaming-platforms';
import { Channel } from '../types';

const renderFrame = (channel: Channel, platformId: string): void => {
  platforms.forEach((item) => {
    if (item.id === platformId) {
      item.render(channel);
    }
  });
};

export const initPlatformFrame = (db: Channel[]): void => {
  const channel = db.find(
    (item) =>
      window.location.hostname.includes(item.source.id) &&
      window.location.href.includes(item.source.channelId)
  );

  if (!channel) {
    return;
  }

  // SPA handling
  let previousUrl = '';

  const observer = new MutationObserver(() => {
    if (location.href !== previousUrl) {
      previousUrl = location.href;

      renderFrame(channel, channel.source.id);
    }
  });

  observer.observe(document, { subtree: true, childList: true });

  // render DOM
  renderFrame(channel, channel.source.id);
};
