import apiInstance from '@shared/api/instance';
import { Channel, PaginationParams } from '@shared/types';
import { arrayToQueryParams, getPaginationQueryParams } from '@shared/utils/queryParams';
import { AxiosResponse } from 'axios';

export const getChannels = (params: PaginationParams = {}): Promise<AxiosResponse<Channel[]>> => {
  const paginationQueryParams =
    Object.keys(params).length > 0 ? `?${getPaginationQueryParams(params)}` : '';

  return apiInstance.get(`/api/v1/whitelist/items${paginationQueryParams}`);
};

export const getChannel = (twitch: string): Promise<AxiosResponse<Channel>> =>
  apiInstance.get(`/api/v1/whitelist/items/${twitch}`);

export const getChannelsByIds = (twitch: string[]): Promise<AxiosResponse<Channel[]>> =>
  apiInstance.get(`/api/v1/whitelist/items?${arrayToQueryParams('twitch', twitch)}`);

export const getChannelsByKeyword = (
  keyword: string,
  params: PaginationParams = {}
): Promise<AxiosResponse<Channel[]>> => {
  const paginationQueryParams =
    Object.keys(params).length > 0 ? `&${getPaginationQueryParams(params)}` : '';

  return apiInstance.get(`/api/v1/whitelist/items?keyword=${keyword}${paginationQueryParams}`);
};

/**
 * @param sourceArray - Use pattern "channel:source" for each element of array
 */
export const getChannelBySource = (sourceArray: string[]): Promise<AxiosResponse<Channel[]>> =>
  apiInstance.get(`/api/v1/whitelist/items?${arrayToQueryParams('source', sourceArray)}`);
