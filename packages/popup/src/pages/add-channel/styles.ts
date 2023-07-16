import { Alert, Input } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;

  .ant-form-item {
    margin-bottom: 18px;
  }
`;

export const TwitchInput = styled(Input)`
  input,
  .ant-input-group-addon {
    color: rgba(0, 0, 0, 0.75) !important;
  }
`;

export const InfoAlert = styled(Alert)`
  padding: 8px 16px;
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 18px;

  .anticon {
    font-size: 18px;
    margin-right: 14px;
  }
`;
