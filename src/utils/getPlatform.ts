import channelsDb from '../db/channels.json';
import platforms from '../streaming-platforms';
import { StreamingPlatform } from '../types';

export const getPlatform = (channelId: string): StreamingPlatform | void => {
  const channel = channelsDb.find((item) => item.twitch === channelId);

  if (!channel) {
    return;
  }

  return platforms.find((item) => item.id === channel.source.id);
};
