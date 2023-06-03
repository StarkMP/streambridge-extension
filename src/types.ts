export type StreamingPlatform = {
  id: string;
  render: () => void;
  getInfo: (channelId: string) => Promise<ChannelInfo | null>;
};

export type Channel = {
  twitch: string;
  source: {
    id: string;
    url: string;
  };
};

export type ChannelInfo = {
  isOnline: boolean;
};
