import { PaginationParams } from '../types';

export const getPaginationQueryParams = (params: PaginationParams): string => {
  const { limit, offset } = params;

  return `${limit ? `limit=${limit}` : ''}&${
    offset !== undefined ? `offset=${offset}` : ''
  }`;
};

export const arrayToQueryParams = (key: string, params: string[]): string =>
  params
    .map((item) => `${key}=${item}&`)
    .join('')
    .slice(0, -1);
