import platforms from '../streaming-platforms';
import { Channel, Languages } from '../types';

export default class IFrame {
  private readonly channel: Channel;

  private readonly language: Languages;

  constructor({
    channel,
    language,
  }: {
    channel: Channel;
    language: Languages;
  }) {
    this.channel = channel;
    this.language = language;

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
        platform.render({ channel: this.channel, language: this.language });
      }
    }
  }
}
