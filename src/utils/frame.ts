export const isFrame = (): boolean => window !== window.top;

export const isExtensionFrame = (): boolean => {
  if (!isFrame()) {
    return false;
  }

  if (!window.name.includes('sb:')) {
    return false;
  }

  return true;
};
