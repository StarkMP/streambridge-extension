import { getChannelBySource, getChannelsByIds } from '@shared/api/services/whitelist';
import { detectLanguage } from '@shared/translations';
import { UserStorage } from '@shared/types';
import { getFollowedIds } from '@shared/utils/followed';
import { v4 as uuidv4 } from 'uuid';

export const initialStorageValue: UserStorage = {
  userId: uuidv4(),
  followed: [],
  language: detectLanguage(),
  localWhitelist: [],
};

export const getLocalStorage = async (): Promise<UserStorage> => {
  if (chrome.storage) {
    const storage = (await chrome.storage.local.get()) as UserStorage;

    return { ...initialStorageValue, ...storage };
  }

  return Promise.resolve({
    ...initialStorageValue,
    ...JSON.parse(localStorage.getItem('streambridge') || '{}'),
  } as UserStorage);
};

export const setLocalStorage = async (data: Partial<UserStorage>): Promise<UserStorage> => {
  const storage = await getLocalStorage();
  const newValue = { ...storage, ...data };

  if (chrome.storage) {
    await chrome.storage.local.set(newValue);

    return newValue;
  }

  await Promise.resolve(localStorage.setItem('streambridge', JSON.stringify(newValue)));

  return newValue;
};

export const syncLocalStorage = async (): Promise<UserStorage> => {
  const storage = await getLocalStorage();

  // fetch channels from server DB
  // and replace user's local whitelist items to
  // server DB items if we will find matches.
  // we need to do it to avoid conflicts
  if (storage.localWhitelist.length > 0) {
    const sourceArray = storage.localWhitelist.map(
      (item) => `${item.source.channelId}:${item.source.id}`
    );
    const { data } = await getChannelBySource(sourceArray);

    storage.localWhitelist = storage.localWhitelist.filter((localChannel) => {
      const matched = data.find(
        (channel) =>
          channel.source.id === localChannel.source.id &&
          channel.source.channelId === localChannel.source.channelId
      );

      // refollow user to channel from server
      // if user has follow to same local channel
      if (matched) {
        const index = storage.followed.findIndex((item) => item.id === localChannel.id);

        if (index !== -1) {
          storage.followed.splice(index, 1, { id: matched.id, isLocal: false });
        }
      }

      return !matched;
    });
  }

  // check if followed channel doesn't longer exist
  // and unfollow from them
  if (storage.followed.length > 0) {
    const { data } = await getChannelsByIds(getFollowedIds(storage.followed, true));

    const actualisedFollowed = storage.followed.filter((item) =>
      storage.localWhitelist.concat(data).find((channel) => channel.id === item.id)
    );

    storage.followed = actualisedFollowed;
  }

  return await setLocalStorage(storage);
};
