import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 0 12px;
  height: 26px;
  display: flex;
  align-items: center;
  border-top: 1px solid #d9d9d9;
`;

export const Link = styled.a`
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  text-decoration: none;
  line-height: 1;
  margin-right: 16px;

  &:hover {
    text-decoration: underline;
  }

  &:last-child {
    margin-right: 0;
  }
`;
