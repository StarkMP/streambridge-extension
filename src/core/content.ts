import { Channel } from '../types';
import { onElementLoaded } from '../utils/dom';

export default class Content {
  private channelsData: Channel[];

  private channelStatusObserver!: MutationObserver | void;

  private selectors = {
    root: '.root-scrollable__content',
    homeRoot: '.home__scrollable-content',
    wrapper: '.root-scrollable__wrapper',
    video: '.persistent-player video',
    iframe: '#stream-bridge',
    errorWrapper: '.core-error',
    sidebar: '#stream-bridge-sidebar',
    scrollbar: '.simplebar-track',
  };

  constructor(channelsData: Channel[]) {
    this.channelsData = channelsData;

    this.initRouteObserver();
    this.renderChannel();
  }

  private initRouteObserver(): void {
    let previousUrl = '';

    const observer = new MutationObserver(() => {
      if (location.href !== previousUrl) {
        previousUrl = location.href;

        this.renderChannel();
      }
    });

    observer.observe(document, { subtree: true, childList: true });
  }

  private renderChannel(): void {
    const iframe = document.querySelector(this.selectors.iframe) as HTMLElement;
    const wrapper = document.querySelector(
      this.selectors.wrapper
    ) as HTMLElement;
    const channel = this.findChannelByLocation();

    if (!channel) {
      if (iframe && wrapper) {
        iframe.remove();

        wrapper.style.display = 'block';

        const video = document.querySelector(
          this.selectors.video
        ) as HTMLVideoElement;

        if (video) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          video.play();
        }
      }

      return;
    }

    if (iframe) {
      iframe.remove();
    }

    if (this.channelStatusObserver) {
      this.channelStatusObserver.disconnect();
    }

    this.channelStatusObserver = onElementLoaded(
      this.selectors.errorWrapper,
      () => {
        const root = document.querySelector(this.selectors.root) as HTMLElement;
        const video = document.querySelector(
          this.selectors.video
        ) as HTMLVideoElement;

        if (root && wrapper) {
          wrapper.style.display = 'none';
          root.style.overflow = 'hidden';

          const sidebars = document.querySelectorAll(this.selectors.scrollbar);

          if (sidebars.length > 0) {
            sidebars.forEach((el) => {
              (el as HTMLElement).style.display = 'none';
            });
          }

          if (video) {
            video.pause();
          }

          const link = channel.source.url;
          const iframe = document.createElement('iframe');

          iframe.width = '100%';
          iframe.height = '100%';
          iframe.allow = 'autoplay; fullscreen';
          iframe.style.position = 'absolute';
          iframe.id = 'stream-bridge';
          iframe.setAttribute('src', link);

          root.appendChild(iframe);
          this.channelStatusObserver = undefined;
        }
      }
    );
  }

  private findChannelByLocation(): Channel | void {
    const href = window.location.href.toLowerCase();

    return this.channelsData.find((item) => href.includes(`/${item.twitch}`));
  }
}
