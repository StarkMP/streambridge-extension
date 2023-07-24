import { ArrowLeftOutlined, SettingOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { JSX } from 'react';
import { useLocalizer } from 'reactjs-localizer';

import { defaultPage } from '../../constants';
import { Pages, useSimpleRouter } from '../../pages';
import { MenuWrapper, Title, Wrapper } from './styles';

export const Header = (): JSX.Element => {
  const { localize } = useLocalizer();
  const { page, setPage } = useSimpleRouter();

  return (
    <Wrapper>
      <Title>{localize('project.name')}</Title>
      <MenuWrapper>
        {page !== defaultPage ? (
          <Tooltip title={localize('popup.header.back')}>
            <Button
              type='primary'
              ghost
              icon={<ArrowLeftOutlined />}
              onClick={(): void => setPage(defaultPage)}
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
            onClick={(): void => setPage(Pages.UserSettings)}
          />
        </Tooltip>
      </MenuWrapper>
    </Wrapper>
  );
};
