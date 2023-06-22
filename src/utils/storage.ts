import { UserStorage } from '../types';

export const getLocalStorage = (): Promise<UserStorage | {}> => {
  if (chrome.storage) {
    return chrome.storage.local.get() as Promise<UserStorage | {}>;
  }

  return Promise.resolve(
    JSON.parse(localStorage.getItem('streambridge') || '{}') as UserStorage | {}
  );
};

export const setLocalStorage = (data: UserStorage): Promise<void> => {
  if (chrome.storage) {
    return chrome.storage.local.set(data);
  }

  return Promise.resolve(
    localStorage.setItem('streambridge', JSON.stringify(data))
  );
};
