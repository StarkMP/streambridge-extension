import { defaultLanguage } from '@shared/constants';
import locales from '@shared/translations/locales.json';
import untranslatable from '@shared/translations/untranslatable.json';
import { Languages } from '@shared/types';
import { formatLanguage } from '@shared/utils/format';

export const translations: Record<string, Record<Languages, string>> = {
  ...locales,
  ...Object.keys(untranslatable as { [key: string]: string }).reduce(
    (memo: { [key: string]: { [language: string]: string } }, key) => {
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

  return defaultLanguage;
};
