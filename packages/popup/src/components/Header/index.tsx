import {
  ArrowLeftOutlined,
  SettingOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { JSX } from 'react';
import { useLocalizer } from 'reactjs-localizer';
import styled from 'styled-components';

import { Pages } from '../../../types';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const MenuWrapper = styled.div`
  display: flex;

  button,
  a {
    margin-right: 6px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const Header = ({
  isMainPage,
  setPage,
}: {
  isMainPage: boolean;
  setPage: (page: Pages) => void;
}): JSX.Element => {
  const { localize } = useLocalizer();

  return (
    <Wrapper>
      <Title>{localize('project.name')}</Title>
      <MenuWrapper>
        {!isMainPage ? (
          <Tooltip title={localize('popup.header.back')}>
            <Button
              type='primary'
              ghost
              icon={<ArrowLeftOutlined />}
              onClick={(): void => setPage(Pages.Main)}
            />
          </Tooltip>
        ) : null}
        <Tooltip title={localize('popup.header.report')}>
          <Button
            href='https://forms.gle/mhjAmBXH17218qnZA'
            target='_blank'
            icon={<WarningOutlined />}
            danger
          />
        </Tooltip>
        <Tooltip title={localize('popup.header.settings')}>
          <Button
            type='primary'
            icon={<SettingOutlined />}
            onClick={(): void => setPage(Pages.Settings)}
          />
        </Tooltip>
      </MenuWrapper>
    </Wrapper>
  );
};

export default Header;
