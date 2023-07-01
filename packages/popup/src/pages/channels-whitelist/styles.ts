import { List as AntdList } from 'antd';
import styled from 'styled-components';

export const ListHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ListHeaderColumns = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

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

export const ScrollableWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #bfbfbf;
    border-radius: 4px;
  }
`;

export const List = styled(AntdList)`
  flex: 1;
  display: flex;
  flex-direction: column;

  .ant-spin-nested-loading {
    flex: 1;
  }

  .ant-spin-container {
    height: 100%;
  }
`;
