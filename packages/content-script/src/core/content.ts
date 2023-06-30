import { getChannel } from '@shared/api/methods/whitelist';
import { Channel, Languages } from '@shared/types';
import { onElementLoaded } from '@shared/utils/dom';

import NotificationTemplate from '../templates/notification';

export default class Content {
  private cachedChannels: Channel[] = [];

  private readonly language: Languages;

  private channelStatusObserver!: MutationObserver | void;

  private readonly selectors = {
    root: '.root-scrollable__content',
    homeRoot: '.home__scrollable-content',
    wrapper: '.root-scrollable__wrapper',
    video: '.persistent-player video',
    iframe: '#stream-bridge',
    errorWrapper: '.core-error',
    sidebar: '#stream-bridge-sidebar',
    scrollbar: '.simplebar-track',
    notification: '.sb-notification',
    notificationCloseButton: '#sb-notification-close',
  };

  constructor({ language }: { language: Languages }) {
    this.language = language;

    this.initRouteObserver();
    this.renderChannel().catch(() => {});
  }

  private initRouteObserver(): void {
    let previousUrl = '';

    const observer = new MutationObserver(() => {
      if (location.href !== previousUrl) {
        previousUrl = location.href;

        this.renderChannel().catch(() => {});
      }
    });

    observer.observe(document, { subtree: true, childList: true });
  }

  private async renderChannel(): Promise<void> {
    const iframe = document.querySelector(this.selectors.iframe) as HTMLElement;
    const wrapper = document.querySelector(
      this.selectors.wrapper
    ) as HTMLElement;
    const channel = await this.findChannelByLocation();

    const prevNotification = document.querySelector(
      this.selectors.notification
    );

    if (prevNotification) {
      prevNotification.remove();
    }

    if (!channel) {
      if (iframe && wrapper) {
        iframe.remove();

        wrapper.style.display = 'block';

        const video = document.querySelector(
          this.selectors.video
        ) as HTMLVideoElement;

        if (video) {
          video.play().catch(() => {});
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
          iframe.name = `sb:${channel.twitch}`;
          iframe.setAttribute('src', link);

          root.appendChild(iframe);

          setTimeout(() => {
            document.body.insertAdjacentHTML(
              'beforeend',
              NotificationTemplate(channel, this.language)
            );

            onElementLoaded(this.selectors.notification, (notification) => {
              (
                notification.querySelector(
                  this.selectors.notificationCloseButton
                ) as HTMLButtonElement
              ).addEventListener('click', (e) => {
                notification.style.display = 'none';
              });
            });
          }, 2000);

          this.channelStatusObserver = undefined;
        }
      }
    );
  }

  private async fetchChannel(twitch: string): Promise<Channel | null> {
    const cached = this.cachedChannels.find((item) => item.twitch === twitch);

    if (cached) {
      return cached;
    }

    try {
      const { data } = await getChannel(twitch);

      this.cachedChannels.push(data);

      return data;
    } catch (err) {
      return null;
    }
  }

  private async findChannelByLocation(): Promise<Channel | null> {
    const twitch = document.location.href.split('.tv/')[1].split('/')[0];
    const channel = await this.fetchChannel(twitch);

    return channel;
  }
}
