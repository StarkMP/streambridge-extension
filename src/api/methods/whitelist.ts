import { AxiosResponse } from 'axios';

import { Channel, PaginationParams } from '../../types';
import {
  arrayToQueryParams,
  getPaginationQueryParams,
} from '../../utils/queryParams';
import apiInstance from '../instance';

export const getChannels = (
  params: PaginationParams = {}
): Promise<AxiosResponse<Channel[]>> => {
  const paginationQueryParams = getPaginationQueryParams(params);

  return apiInstance.get(`/api/v1/channel/whitelist?${paginationQueryParams}`);
};

export const getChannel = (twitch: string): Promise<AxiosResponse<Channel>> =>
  apiInstance.get(`/api/v1/whitelist?twitch=${twitch}`);

export const getChannelsByIds = (
  twitch: string[]
): Promise<AxiosResponse<Channel[]>> =>
  apiInstance.get(`/api/v1/whitelist?${arrayToQueryParams('twitch', twitch)}`);

export const getChannelsByKeyword = (
  keyword: string,
  params: PaginationParams = {}
): Promise<AxiosResponse<Channel[]>> => {
  const paginationQueryParams = getPaginationQueryParams(params);

  return apiInstance.get(
    `/api/v1/whitelist?keyword=${keyword}&${paginationQueryParams}`
  );
};
