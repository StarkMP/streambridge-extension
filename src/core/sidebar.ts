import { maxFollowedChannels } from '../constants';
import SidebarTemplate from '../templates/sidebar';
import { Channel, ChannelInfo, UserStorage } from '../types';
import { getChannel, getPlatform } from '../utils/db';
import { onElementLoaded } from '../utils/dom';

export default class Sidebar {
  private followedChannelsInfo: ChannelInfo[];

  private cachedChannelsInfo: ChannelInfo[];

  private channelsData: Channel[];

  private updateInterval: number;

  private selectors = {
    sidebar: '#stream-bridge-sidebar',
    sidebarElement: '[role="group"]',
  };

  constructor({
    channelsData,
    updateInterval,
  }: {
    channelsData: Channel[];
    updateInterval: number;
  }) {
    this.channelsData = channelsData;
    this.updateInterval = updateInterval;
    this.followedChannelsInfo = [];
    this.cachedChannelsInfo = [];

    this.init().catch(() => {});
    this.initStorageChangeHandler();
  }

  private async init(): Promise<void> {
    await this.update();

    setInterval(() => {
      this.update().catch(() => {});
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
            (twitch) =>
              !this.cachedChannelsInfo.find(
                (cachedItem) => cachedItem.twitch === twitch
              )
          )
        )
          .then(() => {
            this.updateFollowedChannelsInfo(
              this.cachedChannelsInfo.filter((item) =>
                newValue.includes(item.twitch)
              )
            );
          })
          .catch(() => {});

        return;
      }

      this.updateFollowedChannelsInfo(
        this.followedChannelsInfo.filter((item) =>
          newValue.includes(item.twitch)
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

  private cacheChannelInfo(info: ChannelInfo): void {
    const index = this.cachedChannelsInfo.findIndex(
      (item) => item.twitch === info.twitch
    );

    if (index !== -1) {
      this.cachedChannelsInfo[index] = info;

      return;
    }

    this.cachedChannelsInfo.push(info);
  }

  private async fetchFollowedChannelsInfo(): Promise<ChannelInfo[]> {
    const storage = (await chrome.storage.local.get()) as UserStorage;
    const followed = storage.followed;

    if (!followed) {
      return [];
    }

    const channelsInfo = await this.fetchChannelsInfo(
      followed.slice(0, maxFollowedChannels)
    );

    return channelsInfo;
  }

  private async fetchChannelsInfo(
    channelIdArray: string[]
  ): Promise<ChannelInfo[]> {
    const channelsInfo = [];

    for await (const twitch of channelIdArray) {
      const info = await this.fetchChannelInfo(twitch);

      if (info) {
        channelsInfo.push(info);
      }
    }

    return channelsInfo;
  }

  private async fetchChannelInfo(
    channelId: string
  ): Promise<ChannelInfo | null> {
    const platform = getPlatform(this.channelsData, channelId);

    if (!platform) {
      return null;
    }

    const channel = getChannel(this.channelsData, channelId);

    if (!channel) {
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
      const template = SidebarTemplate(this.followedChannelsInfo);

      el.insertAdjacentHTML('afterend', template);
    });
  }
}
