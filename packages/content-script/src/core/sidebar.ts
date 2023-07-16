import { getChannel } from '@shared/api/services/whitelist';
import { maxFollowedChannels } from '@shared/constants';
import { getLocalStorage } from '@shared/storage';
import streamingPlatforms from '@shared/streaming-platforms';
import { Channel, ChannelInfo, Languages } from '@shared/types';
import { onElementLoaded } from '@shared/utils/dom';

import SidebarTemplate from '../templates/sidebar';

export default class Sidebar {
  private followedChannelsInfo: ChannelInfo[] = [];

  private cachedChannelsInfo: ChannelInfo[] = [];

  private cachedChannels: Channel[] = [];

  private readonly updateInterval: number;

  private readonly language: Languages;

  private readonly selectors = {
    sidebar: '#stream-bridge-sidebar',
    sidebarElement: '[role="group"]',
  };

  constructor({ updateInterval, language }: { updateInterval: number; language: Languages }) {
    this.updateInterval = updateInterval;
    this.language = language;

    this.init();
    this.initStorageChangeHandler();
  }

  private async init(): Promise<void> {
    await this.update();

    setInterval(() => {
      this.update();
    }, this.updateInterval);
  }

  private initStorageChangeHandler(): void {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== 'local') {
        return;
      }

      const { oldValue, newValue } = changes.followed;

      if (!oldValue || !newValue) {
        return;
      }

      if (newValue.length > oldValue.length) {
        this.fetchChannelsInfo(
          (newValue as string[]).filter(
            (twitch) => !this.cachedChannelsInfo.find((cachedItem) => cachedItem.twitch === twitch)
          )
        ).then(() => {
          this.updateFollowedChannelsInfo(
            this.cachedChannelsInfo.filter((item) => newValue.includes(item.twitch))
          );
        });

        return;
      }

      this.updateFollowedChannelsInfo(
        this.followedChannelsInfo.filter((item) => newValue.includes(item.twitch))
      );
    });
  }

  private async update(): Promise<void> {
    const data = await this.fetchFollowedChannelsInfo();

    this.updateFollowedChannelsInfo(data);
  }

  private updateFollowedChannelsInfo(data: ChannelInfo[]): void {
    this.followedChannelsInfo = data;

    this.render();
  }

  private cacheChannelInfo(info: ChannelInfo): void {
    const index = this.cachedChannelsInfo.findIndex((item) => item.twitch === info.twitch);

    if (index !== -1) {
      this.cachedChannelsInfo[index] = info;

      return;
    }

    this.cachedChannelsInfo.push(info);
  }

  private async fetchFollowedChannelsInfo(): Promise<ChannelInfo[]> {
    const { followed } = await getLocalStorage();

    if (followed.length === 0) {
      return [];
    }

    const channelsInfo = await this.fetchChannelsInfo(followed.slice(0, maxFollowedChannels));

    return channelsInfo;
  }

  private async fetchChannelsInfo(channelIdArray: string[]): Promise<ChannelInfo[]> {
    const channelsInfo = [];

    for await (const twitch of channelIdArray) {
      const info = await this.fetchChannelInfo(twitch);

      if (info) {
        channelsInfo.push(info);
      }
    }

    return channelsInfo;
  }

  private async fetchChannelInfo(twitch: string): Promise<ChannelInfo | null> {
    const channel = await this.fetchChannel(twitch);

    if (!channel) {
      return null;
    }

    const platform = streamingPlatforms.find((platform) => channel.source.id === platform.id);

    if (!platform) {
      return null;
    }

    const info = await platform.getInfo(channel);

    if (info) {
      this.cacheChannelInfo(info);
    }

    return info;
  }

  private render(): void {
    const sidebarElement = document.querySelector(this.selectors.sidebar);

    if (sidebarElement) {
      sidebarElement.remove();
    }

    onElementLoaded(this.selectors.sidebarElement, (el) => {
      const template = SidebarTemplate(this.followedChannelsInfo, this.language);

      el.insertAdjacentHTML('afterend', template);
    });
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
}
