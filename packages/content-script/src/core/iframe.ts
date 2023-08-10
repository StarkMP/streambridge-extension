import { Channel, Languages } from '@shared/types';
import { getPlatformById } from '@shared/utils/platform';

export default class IFrame {
  private readonly channel: Channel;

  private readonly language: Languages;

  constructor({ channel, language }: { channel: Channel; language: Languages }) {
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
    getPlatformById(this.channel.source.id).render({
      channel: this.channel,
      language: this.language,
    });
  }
}
