import streamingPlatforms from '@shared/streaming-platforms';
import { StreamingPlatform } from '@shared/types';

export const getPlatformById = (id: string): StreamingPlatform => {
  const platform = streamingPlatforms.find((platform) => platform.id === id);

  if (!platform) {
    throw new Error(`Platform with id '${id}' not found`);
  }

  return platform;
};

export const getChannelUrl = (platformId: string, channelId: string): string =>
  `${getPlatformById(platformId).url}/${channelId}`;
