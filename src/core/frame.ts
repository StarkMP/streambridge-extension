import platforms from '../streaming-platforms';
import { Channel } from '../types';

const renderFrame = (platformId: string): void => {
  platforms.forEach((item) => {
    if (item.id === platformId) {
      item.render();
    }
  });
};

export const initPlatformFrame = (db: Channel[]): void => {
  const channel = db.find((item) =>
    window.location.hostname.includes(item.source.id)
  );

  if (!channel) {
    return;
  }

  // SPA handling
  let previousUrl = '';

  const observer = new MutationObserver(() => {
    if (location.href !== previousUrl) {
      previousUrl = location.href;

      renderFrame(channel.source.id);
    }
  });

  observer.observe(document, { subtree: true, childList: true });

  // render DOM
  renderFrame(channel.source.id);
};
