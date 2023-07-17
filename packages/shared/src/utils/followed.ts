import { FollowedChannel } from '@shared/types';

export const getFollowedIds = (followed: FollowedChannel[], ignoreLocal = false): string[] =>
  followed.filter((item) => (ignoreLocal ? !item.isLocal : true)).map((item) => item.id);
