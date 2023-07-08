import apiInstance from '@shared/api/instance';
import { Channel, PaginationParams } from '@shared/types';
import { arrayToQueryParams, getPaginationQueryParams } from '@shared/utils/queryParams';
import { AxiosResponse } from 'axios';

export const getChannels = (params: PaginationParams = {}): Promise<AxiosResponse<Channel[]>> => {
  const paginationQueryParams =
    Object.keys(params).length > 0 ? `?${getPaginationQueryParams(params)}` : '';

  return apiInstance.get(`/api/v1/whitelist${paginationQueryParams}`);
};

export const getChannel = (twitch: string): Promise<AxiosResponse<Channel>> =>
  apiInstance.get(`/api/v1/whitelist/${twitch}`);

export const getChannelsByIds = (twitch: string[]): Promise<AxiosResponse<Channel[]>> =>
  apiInstance.get(`/api/v1/whitelist?${arrayToQueryParams('twitch', twitch)}`);

export const getChannelsByKeyword = (
  keyword: string,
  params: PaginationParams = {}
): Promise<AxiosResponse<Channel[]>> => {
  const paginationQueryParams =
    Object.keys(params).length > 0 ? `&${getPaginationQueryParams(params)}` : '';

  return apiInstance.get(`/api/v1/whitelist?keyword=${keyword}${paginationQueryParams}`);
};
