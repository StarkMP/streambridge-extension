import { Typography } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

export const ListFooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px;
`;

export const ListFooterTitle = styled(Text)`
  text-align: center;
  font-size: 13px;
`;
