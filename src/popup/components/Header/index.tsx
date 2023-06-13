import React, { JSX } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Header = (): JSX.Element => (
  <Wrapper>
    <Title>Stream Bridge</Title>
  </Wrapper>
);

export default Header;
