import { getChannel } from '@shared/api/services/whitelist';
import { maxFollowedChannels } from '@shared/constants';
import { getLocalStorage } from '@shared/storage';
import streamingPlatforms from '@shared/streaming-platforms';
import { Channel, ChannelInfo, FollowedChannel, Languages } from '@shared/types';
import { onElementLoaded } from '@shared/utils/dom';
import { getFollowedIds } from '@shared/utils/followed';

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

      const oldValue: FollowedChannel[] | void = changes.followed.oldValue;
      const newValue: FollowedChannel[] | void = changes.followed.newValue;

      if (!oldValue || !newValue) {
        return;
      }

      // if we follow to new channel
      if (newValue.length > oldValue.length) {
        this.fetchChannelsInfo(
          getFollowedIds(newValue).filter(
            (id) => !this.cachedChannelsInfo.find((cachedItem) => cachedItem.id === id)
          )
        ).then(() => {
          this.updateFollowedChannelsInfo(
            this.cachedChannelsInfo.filter((item) =>
              newValue.find((followed) => item.id === followed.id)
            )
          );
        });

        return;
      }

      // if we unfollow from channel
      this.updateFollowedChannelsInfo(
        this.followedChannelsInfo.filter((item) =>
          newValue.find((fromStorage) => fromStorage.id === item.id)
        )
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

  private cacheChannelInfo(data: ChannelInfo): void {
    const index = this.cachedChannelsInfo.findIndex((item) => item.id === data.id);

    if (index !== -1) {
      this.cachedChannelsInfo[index] = data;

      return;
    }

    this.cachedChannelsInfo.push(data);
  }

  private async fetchFollowedChannelsInfo(): Promise<ChannelInfo[]> {
    const { followed } = await getLocalStorage();

    if (followed.length === 0) {
      return [];
    }

    const channelsInfo = await this.fetchChannelsInfo(
      getFollowedIds(followed.slice(0, maxFollowedChannels))
    );

    return channelsInfo;
  }

  private async fetchChannelsInfo(ids: string[]): Promise<ChannelInfo[]> {
    const channelsInfo: ChannelInfo[] = [];

    for await (const id of ids) {
      const info = await this.fetchChannelInfo(id);

      if (info) {
        channelsInfo.push(info);
      }
    }

    return channelsInfo;
  }

  private async fetchChannelInfo(id: string): Promise<ChannelInfo | null> {
    const channel = await this.fetchChannel(id);

    if (!channel) {
      return null;
    }

    const platform = streamingPlatforms.find((platform) => channel.source.id === platform.id);

    if (!platform) {
      return null;
    }

    const info = await platform.getInfo(channel);

    if (!info) {
      return null;
    }

    this.cacheChannelInfo(info);

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

  private async fetchChannel(id: string): Promise<Channel | null> {
    const cached = this.cachedChannels.find((item) => item.id === id);

    if (cached) {
      return cached;
    }

    const storage = await getLocalStorage();
    const localResult = storage.localWhitelist.find((item) => item.id === id);

    if (localResult) {
      this.cachedChannels.push(localResult);

      return localResult;
    }

    try {
      const { data } = await getChannel(id);

      this.cachedChannels.push(data);

      return data;
    } catch (err) {
      return null;
    }
  }
}
