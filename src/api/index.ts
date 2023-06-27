import { AxiosResponse } from 'axios';

import { Channel } from '../types';
import apiInstance from './instance';

export const getChannels = (
  params: {
    limit?: number;
    offset?: number;
  } = {}
): Promise<AxiosResponse<Channel[]>> => {
  const { limit, offset } = params;
  const queryParams = `${limit ? `limit=${limit}` : ''}&${
    offset !== undefined ? `offset=${offset}` : ''
  }`;

  return apiInstance.get(`/api/v1/channel/whitelist?${queryParams}`);
};

export const getChannel = (twitch: string): Promise<AxiosResponse<Channel>> =>
  apiInstance.get(`/api/v1/channel/whitelist/${twitch}`);
