import { detectLanguage } from '@shared/translations';
import { UserStorage } from '@shared/types';

export const initialStorageValue: UserStorage = {
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
