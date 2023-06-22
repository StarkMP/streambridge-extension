import React, {
  createContext,
  JSX,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocalizer } from 'reactjs-localizer';

import { detectLanguage } from '../../translations';
import { Channel, UserStorage } from '../../types';
import { getLocalStorage, setLocalStorage } from '../../utils/storage';

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

const initialValue: UserStorage = { followed: [], language: detectLanguage() };

export const StorageProvider = ({
  children,
  channels,
}: StorageProviderProps): JSX.Element => {
  const [storage, setStorage] = useState<UserStorage>(initialValue);
  const { setLanguage } = useLocalizer();

  useEffect(() => {
    initStorage().catch(() => {});
  }, []);

  const initStorage = async (): Promise<void> => {
    try {
      const storage = {
        ...initialValue,
        ...(await getLocalStorage()),
      } as UserStorage;

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
