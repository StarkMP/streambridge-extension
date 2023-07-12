import { List as AntdList } from 'antd';
import styled from 'styled-components';

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

export const LoaderWrapper = styled.div`
  padding: 16px 0;
  display: flex;
  justify-content: center;
`;
