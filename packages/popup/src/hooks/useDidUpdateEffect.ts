import { DependencyList, useEffect, useRef } from 'react';

const useDidUpdateEffect = (callback: () => void, deps?: DependencyList): void => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      callback();
    } else {
      didMountRef.current = true;
    }
  }, deps);
};

export default useDidUpdateEffect;
