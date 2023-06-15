import { Button } from 'antd';
import React, { JSX } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const Header = (): JSX.Element => (
  <Wrapper>
    <Title>Stream Bridge</Title>
    <Button href='https://forms.gle/mhjAmBXH17218qnZA' target='_blank' danger>
      Report a bug
    </Button>
  </Wrapper>
);

export default Header;
