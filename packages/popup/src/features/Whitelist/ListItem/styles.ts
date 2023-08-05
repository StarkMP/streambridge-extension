import { SettingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    width: 36px;
    height: 36px;
    margin-right: 10px;
  }
`;

export const ListItemText = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 168px;
`;

export const ListItemTwitch = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ListItemSourceUrl = styled.a`
  font-size: 11px;
  color: #bfbfbf;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ListItemMenuButton = styled(SettingOutlined)`
  margin-right: 10px;
  font-size: 14px;
  transition: color 0.3s;

  &:hover {
    color: #1677ff;
  }
`;
