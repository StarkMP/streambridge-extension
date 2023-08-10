import streamingPlatforms from '@shared/streaming-platforms';
import { PlatformId, StreamingPlatform } from '@shared/types';

export const getPlatformById = (id: PlatformId): StreamingPlatform => {
  const platform = streamingPlatforms.find((platform) => platform.id === id);

  if (!platform) {
    throw new Error(`Platform with id '${id}' not found`);
  }

  return platform;
};

export const getChannelUrl = (platformId: PlatformId, channelId: string): string =>
  getPlatformById(platformId).url.replace('%id%', channelId);
