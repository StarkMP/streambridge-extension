import platforms from '../streaming-platforms';
import { Channel, StreamingPlatform } from '../types';

export const getChannel = (db: Channel[], twitch: string): Channel | void => {
  return db.find((item) => item.twitch === twitch);
};

export const getPlatform = (
  db: Channel[],
  twitch: string
): StreamingPlatform | void => {
  const channel = getChannel(db, twitch);

  if (!channel) {
    return;
  }

  return platforms.find((item) => item.id === channel.source.id);
};
