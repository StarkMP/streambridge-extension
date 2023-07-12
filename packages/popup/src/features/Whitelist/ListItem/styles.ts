import { List as AntdList } from 'antd';
import styled from 'styled-components';

export const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 36px;
    height: 36px;
    margin-right: 10px;
  }
`;

export const ListItemText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ListItemTwitch = styled.span``;

export const ListItemSourceUrl = styled.a`
  font-size: 11px;
  color: #bfbfbf;
`;
