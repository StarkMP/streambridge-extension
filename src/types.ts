export type StreamingService = {
  id: string;
  render: () => void;
  getInfo: () => ChannelInfo;
};

export type Channel = {
  twitch: string;
  source: {
    id: string;
    url: string;
  };
};

export enum ChannelStatus {
  Offline = 0,
  Online,
}

export type ChannelInfo = {
  status: ChannelStatus;
};
