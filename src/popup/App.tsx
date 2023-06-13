import 'antd/dist/reset.css';

import React, { JSX } from 'react';
import { createGlobalStyle } from 'styled-components';

import channels from '../db/channels.json';
import ChannelList from './components/ChannelList';
import Header from './components/Header';

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

const App = (): JSX.Element => (
  <>
    <GlobalStyle />
    <Header />
    <ChannelList channels={channels} />
  </>
);

export default App;
