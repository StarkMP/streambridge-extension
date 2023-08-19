export const findElement = (
  tag: keyof HTMLElementTagNameMap,
  classNamePart: string
): HTMLElement | null => {
  const elements = document.querySelectorAll(tag);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (Array.from(element.classList).some((className) => className.includes(classNamePart))) {
      return element;
    }
  }

  return null;
};

export const onElementLoaded = <T extends HTMLElement>(
  selector: string,
  callback: (el: T) => void,
  keepObserver?: boolean
): MutationObserver | void => {
  const existsElement = document.querySelector<T>(selector);

  if (existsElement) {
    callback(existsElement);

    return;
  }

  const observer = new MutationObserver((mutations) => {
    let found = false;

    for (const mutation of mutations) {
      if (!mutation.addedNodes) {
        return;
      }

      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const node = mutation.addedNodes[i];

        if (node.nodeType !== Node.ELEMENT_NODE) {
          continue;
        }

        const element = (node as T).matches(selector)
          ? (node as T)
          : (node as T).querySelector<T>(selector);

        if (element) {
          callback(element);

          if (!keepObserver) {
            observer.disconnect();
          }

          found = true;
          break;
        }
      }

      if (found) {
        break;
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  return observer;
};
