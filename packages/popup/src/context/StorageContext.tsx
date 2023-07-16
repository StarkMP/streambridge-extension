import { getChannelBySource, getChannelsByIds } from '@shared/api/services/whitelist';
import { getLocalStorage, initialStorageValue, setLocalStorage } from '@shared/storage';
import { UserStorage } from '@shared/types';
import React, { createContext, JSX, ReactNode, useContext, useEffect, useState } from 'react';
import { useLocalizer } from 'reactjs-localizer';

import { useSimpleRouter } from '../pages';

type StorageContextProps = {
  storage: UserStorage;
  updateStorage: (data: Partial<UserStorage>) => Promise<void>;
};

type StorageProviderProps = {
  children: ReactNode;
};

const Context = createContext<StorageContextProps>({} as StorageContextProps);

export const useStorage = (): StorageContextProps => useContext(Context);

export const StorageContext = Context;

export const StorageProvider = ({ children }: StorageProviderProps): JSX.Element => {
  const [storage, setStorage] = useState<UserStorage>(initialStorageValue);
  const { setLanguage } = useLocalizer();
  const { setPageLoading, setPageError } = useSimpleRouter();

  useEffect(() => {
    initStorage();
  }, []);

  const initStorage = async (): Promise<void> => {
    try {
      setPageLoading(true);

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
          if (matched && storage.followed.includes(localChannel.twitch)) {
            const index = storage.followed.findIndex(
              (followed) => followed === localChannel.twitch
            );

            storage.followed.splice(index, 1, matched.twitch);
          }

          return !matched;
        });
      }

      // check if followed channel doesn't exist no longer
      // and unfollow from them
      if (storage.followed.length > 0) {
        const { data } = await getChannelsByIds(storage.followed);

        const actualisedFollowed = storage.followed.filter((twitch) =>
          storage.localWhitelist.concat(data).find((channel) => channel.twitch === twitch)
        );

        storage.followed = actualisedFollowed;
      }

      setLanguage(storage.language);
      await updateStorage(storage);
    } catch (err) {
      setPageError(true);
    } finally {
      setPageLoading(false);
    }
  };

  const updateStorage = async (data: Partial<UserStorage>): Promise<void> => {
    const storage = await setLocalStorage(data);

    setStorage(storage);
  };

  return <Context.Provider value={{ storage, updateStorage }}>{children}</Context.Provider>;
};
