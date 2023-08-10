export type StreamingPlatform = {
  id: PlatformId;
  url: string;
  render: (data: { channel: Channel; language: Languages }) => void;
  getInfo: (channel: Channel) => Promise<ChannelInfo | null>;
};

export type Channel = {
  id: string;
  twitch: string;
  source: {
    id: PlatformId;
    channelId: string;
  };
  isLocal?: boolean;
};

export type ChannelInfo = {
  id: string;
  data: {
    twitch: string;
    isOnline: boolean;
    category?: string;
    viewers?: number;
    title?: string;
    nickname: string;
    avatar?: string;
  };
};

export type FollowedChannel = {
  id: string;
  isLocal?: boolean;
};

export type UserStorage = {
  userId: string;
  followed: FollowedChannel[];
  language: Languages;
  localWhitelist: Channel[];
};

export enum PlatformId {
  Kick = 'kick',
  Trovo = 'trovo',
  VKPlayLive = 'vkplay',
  WASD = 'wasd',
  YouTube = 'youtube',
}

export enum Languages {
  English = 'en',
  Russian = 'ru',
}

export type PaginationParams = {
  limit?: number;
  offset?: number;
  priority?: string[];
};

export enum AnalyticsEvent {
  OPEN_POPUP = 'OPEN_POPUP',
  WATCH_STREAM = 'WATCH_STREAM',
}
