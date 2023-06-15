import React, {
  createContext,
  JSX,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

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

const initialValue: UserStorage = { followed: [] };

export const StorageProvider = ({
  children,
  channels,
}: StorageProviderProps): JSX.Element => {
  const [storage, setStorage] = useState<UserStorage>(initialValue);

  useEffect(() => {
    initStorage().catch(() => {});
  }, []);

  const initStorage = async (): Promise<void> => {
    try {
      const storage = (await chrome.storage.local.get()) as UserStorage;

      if (!storage.followed) {
        updateStorage(initialValue);
      } else {
        const followed = storage.followed.filter((twitch) =>
          channels.find((channel) => channel.twitch === twitch)
        );

        updateStorage({ ...storage, followed });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateStorage = (data: UserStorage): void => {
    chrome.storage.local.set(data).catch((err) => console.error(err));
    setStorage(data);
  };

  return (
    <Context.Provider value={{ storage, updateStorage }}>
      {children}
    </Context.Provider>
  );
};
