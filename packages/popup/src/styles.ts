import { createGlobalStyle } from 'styled-components';

import { theme } from './theme';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    background: black;
  }

  body {
    width: ${theme.body.width};
    height: ${theme.body.height};
    font-family: sans-serif;
  }

  #app {
    padding-bottom: 0;
    background: #ffffff;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .ant-message-notice {
    text-align: left !important;
  }
`;

export default GlobalStyles;
