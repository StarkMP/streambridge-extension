import 'antd/dist/reset.css';

import { trackEvent } from '@shared/analytics';
import { defaultLanguage } from '@shared/constants';
import { translations } from '@shared/translations';
import { AnalyticsEvent } from '@shared/types';
import React, { JSX, useEffect } from 'react';
import { LocalizerProvider } from 'reactjs-localizer';

import { defaultPage } from './constants';
import { StorageProvider } from './context/StorageContext';
import { BaseLayout } from './layouts';
import { Outlet, SimpleRouterProvider } from './pages';
import GlobalStyles from './styles';

const App = (): JSX.Element => {
  useEffect(() => {
    setTimeout(() => {
      trackEvent(AnalyticsEvent.OPEN_POPUP).catch(() => {});
    }, 1000);
  }, []);

  return (
    <SimpleRouterProvider defaultPage={defaultPage}>
      <LocalizerProvider
        defaultLanguage={defaultLanguage}
        currentLanguage={defaultLanguage}
        locales={translations}
      >
        <StorageProvider>
          <GlobalStyles />
          <BaseLayout>
            <Outlet />
          </BaseLayout>
        </StorageProvider>
      </LocalizerProvider>
    </SimpleRouterProvider>
  );
};

export default App;
