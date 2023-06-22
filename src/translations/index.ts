import { Locales } from 'reactjs-localizer';

import { defaultLocale } from '../constants';
import { Languages } from '../types';
import { formatLanguage } from '../utils/format';
import locales from './locales.json';
import untranslatable from './untranslatable.json';

export const translations: Record<string, Record<Languages, string>> = {
  ...locales,
  ...Object.keys(untranslatable as { [key: string]: string }).reduce(
    (memo: Locales, key) => {
      memo[key] = Object.values(Languages).reduce(
        (
          memo: {
            [language: string]: string;
          },
          language
        ) => {
          memo[language] = (untranslatable as { [key: string]: string })[key];

          return memo;
        },
        {}
      );

      return memo;
    },
    {}
  ),
};

export const detectLanguage = (): Languages => {
  const browserLanguage = formatLanguage(window.navigator.language);

  if (browserLanguage in Languages) {
    return browserLanguage as Languages;
  }

  return defaultLocale;
};
