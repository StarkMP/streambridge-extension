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

export const isFrame = (): boolean => window !== window.top;
