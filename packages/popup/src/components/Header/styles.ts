import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`;

export const MenuWrapper = styled.div`
  display: flex;

  button,
  a {
    margin-right: 6px;

    &:last-child {
      margin-right: 0;
    }
  }
`;
