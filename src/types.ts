export type StreamingPlatform = {
  id: string;
  render: (channel: Channel) => void;
  getInfo: (channel: Channel) => Promise<ChannelInfo | null>;
};

export type Channel = {
  twitch: string;
  source: {
    id: string;
    channelId: string;
    url: string;
  };
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
};

export enum PlatformId {
  Kick = 'kick.com',
  Trovo = 'trovo.live',
  VKPlayLive = 'vkplay.live',
  WASD = 'wasd.tv',
  YouTube = 'youtube.com',
}
