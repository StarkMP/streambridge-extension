export type StreamingService = {
  id: string;
  render: () => void;
};

export type Streamer = {
  twitch: string;
  source: {
    id: string;
    url: string;
  };
};
