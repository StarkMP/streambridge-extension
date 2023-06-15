import platforms from '../streaming-platforms';
import { Channel } from '../types';

export default class IFrame {
  private channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;

    this.initRouteObserver();
    this.render();
  }

  private initRouteObserver(): void {
    let previousUrl = '';

    const observer = new MutationObserver(() => {
      if (location.href !== previousUrl) {
        previousUrl = location.href;

        this.render();
      }
    });

    observer.observe(document, { subtree: true, childList: true });
  }

  private render(): void {
    for (const platform of platforms) {
      if (platform.id === this.channel.source.id) {
        platform.render(this.channel);
      }
    }
  }
}
