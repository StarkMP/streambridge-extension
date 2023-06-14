import React, {
  createContext,
  JSX,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { UserStorage } from '../../types';

type StorageContextProps = {
  storage: UserStorage;
  updateStorage: (data: UserStorage) => void;
};

type StorageProviderProps = {
  children: ReactNode;
};

const Context = createContext<StorageContextProps>({} as StorageContextProps);

export const useStorage = (): StorageContextProps => useContext(Context);

export const StorageContext = Context;

const initialValue: UserStorage = { followed: [] };

export const StorageProvider = ({
  children,
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
        setStorage(storage);
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
