import React, {
  createContext,
  JSX,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocalizer } from 'reactjs-localizer';

import {
  getLocalStorage,
  initialStorageValue,
  setLocalStorage,
} from '../../core/storage';
import { Channel, UserStorage } from '../../types';

type StorageContextProps = {
  storage: UserStorage;
  updateStorage: (data: UserStorage) => void;
};

type StorageProviderProps = {
  children: ReactNode;
  channels: Channel[];
};

const Context = createContext<StorageContextProps>({} as StorageContextProps);

export const useStorage = (): StorageContextProps => useContext(Context);

export const StorageContext = Context;

export const StorageProvider = ({
  children,
  channels,
}: StorageProviderProps): JSX.Element => {
  const [storage, setStorage] = useState<UserStorage>(initialStorageValue);
  const { setLanguage } = useLocalizer();

  useEffect(() => {
    initStorage().catch(() => {});
  }, []);

  const initStorage = async (): Promise<void> => {
    try {
      const storage = await getLocalStorage();

      const followed = storage.followed.filter((twitch) =>
        channels.find((channel) => channel.twitch === twitch)
      );

      setLanguage(storage.language);
      updateStorage({ ...storage, followed });
    } catch (err) {
      console.error(err);
    }
  };

  const updateStorage = (data: UserStorage): void => {
    setLocalStorage(data).catch((err) => console.error(err));
    setStorage(data);
  };

  return (
    <Context.Provider value={{ storage, updateStorage }}>
      {children}
    </Context.Provider>
  );
};
