import { PaginationParams } from '@shared/types';

export const getPaginationQueryParams = (params: PaginationParams): string => {
  const { limit, offset, priority } = params;

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

  if (priority !== undefined && priority.length > 0) {
    const priorityQueryString = arrayToQueryParams('priority', priority);

    if (limit !== undefined || offset !== undefined) {
      query = `${query}&${priorityQueryString}`;
    } else {
      query = priorityQueryString;
    }
  }

  return query;
};

export const arrayToQueryParams = (key: string, params: string[]): string =>
  params.map((item) => `${key}=${item}`).join('&');
