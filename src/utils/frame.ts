export const isFrame = (): boolean => window !== window.top;

export const isTwitchChildFrame = (): boolean => {
  if (!isFrame()) {
    return false;
  }

  if (!window.top) {
    return false;
  }

  const parentIsTwitch = document.referrer.includes('twitch.tv');

  if (!parentIsTwitch) {
    return false;
  }

  return true;
};
