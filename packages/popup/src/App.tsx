import 'antd/dist/reset.css';

import { defaultLanguage } from '@sdk/constants';
import { translations } from '@sdk/translations';
import { Channel, Pages } from '@sdk/types';
import React, { JSX, useEffect, useState } from 'react';
import { LocalizerProvider } from 'reactjs-localizer';
import { createGlobalStyle } from 'styled-components';

import ChannelList from './components/ChannelList';
import Header from './components/Header';
import Settings from './components/Settings';
import { StorageProvider } from './context/StorageContext';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    background: #f0f0f0;
  }

  body {
    width: 350px;
    height: 500px;
    font-family: sans-serif;
  }

  #app {
    padding: 12px;
    padding-bottom: 0;
    background: #ffffff;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
`;

const App = (): JSX.Element => {
  const [page, setPage] = useState<Pages>(Pages.Main);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {}, []);

  let currentPage;

  switch (page) {
    case Pages.Main:
      currentPage = <ChannelList channels={channels} />;
      break;

    case Pages.Settings:
      currentPage = <Settings />;
      break;

    default:
      currentPage = null;
  }

  return (
    <LocalizerProvider
      defaultLanguage={defaultLanguage}
      currentLanguage={defaultLanguage}
      locales={translations}
    >
      <StorageProvider channels={channels}>
        <GlobalStyle />
        <Header isMainPage={page === Pages.Main} setPage={setPage} />
        {currentPage}
      </StorageProvider>
    </LocalizerProvider>
  );
};

export default App;
