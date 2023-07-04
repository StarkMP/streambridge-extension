import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const Loader = styled(LoadingOutlined)`
  font-size: 36px;
  color: #1677ff;
`;

export const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
