import * as amplitude from '@amplitude/analytics-browser';
import { amplitudeApiKey } from '@shared/constants';
import { AnalyticsEvent } from '@shared/types';

import { getLocalStorage } from './storage';

export const initAnalytics = async (): Promise<void> => {
  // if (!import.meta.env.PROD) {
  //   return Promise.resolve();
  // }

  const { userId } = await getLocalStorage();

  amplitude.init(amplitudeApiKey, {
    defaultTracking: false,
    userId,
  });
};

export const trackEvent = <T extends { [key: string]: unknown }>(
  name: AnalyticsEvent,
  options?: T
): Promise<unknown> => {
  // if (!import.meta.env.PROD) {
  //   return Promise.resolve();
  // }

  return amplitude.track(name, options).promise;
};
