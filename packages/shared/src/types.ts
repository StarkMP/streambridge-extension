export type StreamingPlatform = {
  id: string;
  url: string;
  render: (data: { channel: Channel; language: Languages }) => void;
  getInfo: (channel: Channel) => Promise<ChannelInfo | null>;
};

export type Channel = {
  twitch: string;
  source: {
    id: PlatformId;
    channelId: string;
  };
  isLocal?: boolean;
};

export type ChannelInfo = {
  twitch: string;
  isOnline: boolean;
  category?: string;
  viewers?: number;
  title?: string;
  nickname: string;
  avatar?: string;
};

export type UserStorage = {
  followed: string[];
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
