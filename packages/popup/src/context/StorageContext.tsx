import { initialStorageValue, setLocalStorage, syncLocalStorage } from '@shared/storage';
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

      const storage = await syncLocalStorage();

      setLanguage(storage.language);
      setStorage(storage);
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
