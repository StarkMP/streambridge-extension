import { PaginationParams } from '@shared/types';

export const getPaginationQueryParams = (params: PaginationParams): string => {
  const { limit, offset } = params;

  let query = '';

  if (limit !== undefined) {
    query = `limit=${limit}`;
  }

  if (offset !== undefined) {
    if (limit !== undefined) {
      query = `${query}&offset=${offset}`;
    } else {
      query = `offset=${offset}`;
    }
  }

  return query;
};

export const arrayToQueryParams = (key: string, params: string[]): string =>
  params
    .map((item) => `${key}=${item}&`)
    .join('')
    .slice(0, -1);
