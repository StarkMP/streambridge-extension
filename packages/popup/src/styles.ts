import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
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

  .ant-message-notice {
    text-align: left !important;
  }
`;

export default GlobalStyles;
