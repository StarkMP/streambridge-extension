import { detectLanguage } from './translations';
import { UserStorage } from './types';

export const initialStorageValue: UserStorage = {
  followed: [],
  language: detectLanguage(),
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

export const setLocalStorage = (data: UserStorage): Promise<void> => {
  if (chrome.storage) {
    return chrome.storage.local.set(data);
  }

  return Promise.resolve(
    localStorage.setItem('streambridge', JSON.stringify(data))
  );
};
