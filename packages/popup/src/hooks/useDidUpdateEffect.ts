import { DependencyList, useEffect, useRef } from 'react';

const useDidUpdateEffect = (
  callback: () => void,
  deps?: DependencyList
): void => {
  const didMounRef = useRef(false);

  useEffect(() => {
    if (didMounRef.current) {
      callback();
    } else {
      didMounRef.current = true;
    }
  }, deps);
};

export default useDidUpdateEffect;
