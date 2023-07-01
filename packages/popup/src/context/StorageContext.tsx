import { getChannelsByIds } from '@shared/api/services/whitelist';
import {
  getLocalStorage,
  initialStorageValue,
  setLocalStorage,
} from '@shared/storage';
import { UserStorage } from '@shared/types';
import React, {
  createContext,
  JSX,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocalizer } from 'reactjs-localizer';

import { useSimpleRouter } from '../pages';

type StorageContextProps = {
  storage: UserStorage;
  updateStorage: (data: Partial<UserStorage>) => void;
};

type StorageProviderProps = {
  children: ReactNode;
};

const Context = createContext<StorageContextProps>({} as StorageContextProps);

export const useStorage = (): StorageContextProps => useContext(Context);

export const StorageContext = Context;

export const StorageProvider = ({
  children,
}: StorageProviderProps): JSX.Element => {
  const [storage, setStorage] = useState<UserStorage>(initialStorageValue);
  const { setLanguage } = useLocalizer();
  const { setLoading } = useSimpleRouter();

  useEffect(() => {
    initStorage().catch(() => {});
  }, []);

  const initStorage = async (): Promise<void> => {
    try {
      setLoading(true);

      const storage = await getLocalStorage();
      const { data } = await getChannelsByIds(storage.followed);

      const actualisedFollowed = storage.followed.filter((twitch) =>
        data.find((channel) => channel.twitch === twitch)
      );

      setLanguage(storage.language);
      updateStorage({ ...storage, followed: actualisedFollowed });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStorage = (data: Partial<UserStorage>): void => {
    setLocalStorage(data)
      .then((storage) => setStorage(storage))
      .catch((err) => console.error(err));
  };

  return (
    <Context.Provider value={{ storage, updateStorage }}>
      {children}
    </Context.Provider>
  );
};
