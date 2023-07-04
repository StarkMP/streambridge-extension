import 'antd/dist/reset.css';

import { defaultLanguage } from '@shared/constants';
import { translations } from '@shared/translations';
import React, { JSX } from 'react';
import { LocalizerProvider } from 'reactjs-localizer';

import { PageLoader } from './components';
import { defaultPage } from './constants';
import { StorageProvider } from './context/StorageContext';
import { BaseLayout } from './layouts';
import { Outlet, SimpleRouterProvider } from './pages';
import GlobalStyles from './styles';

const App = (): JSX.Element => {
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
