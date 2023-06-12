export const findElement = (
  tag: keyof HTMLElementTagNameMap,
  classNamePart: string
): HTMLElement | null => {
  const elements = document.querySelectorAll(tag); // Get all div elements
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (
      Array.from(element.classList).some((className) =>
        className.includes(classNamePart)
      )
    ) {
      // Check if any class name includes the specified string
      return element;
    }
  }

  return null; // If no element is found
};

export const onElementLoaded = (
  selector: string,
  callback: (el: HTMLElement) => void,
  keepObserver?: boolean
): MutationObserver | void => {
  const existsElement = document.querySelector(selector) as HTMLElement;

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

        const element = (node as HTMLElement).matches(selector)
          ? (node as HTMLElement)
          : ((node as HTMLElement).querySelector(selector) as HTMLElement);

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
