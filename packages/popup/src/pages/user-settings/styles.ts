import { Select as AntdSelect, Typography } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

export const Label = styled(Text)`
  margin-bottom: 4px;
`;

export const Select = styled(AntdSelect)`
  width: 250px;
`;
