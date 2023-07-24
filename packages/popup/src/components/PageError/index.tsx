import { SyncOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { JSX } from 'react';
import { useLocalizer } from 'reactjs-localizer';

import { Result } from './styles';

export const PageError = (): JSX.Element => {
  const { localize } = useLocalizer();

  return (
    <Result
      status='warning'
      title={localize('popup.page-error.title')}
      subTitle={localize('popup.page-error.subtitle')}
      extra={
        <Button
          icon={<SyncOutlined />}
          type='primary'
          onClick={(): void => document.location.reload()}
        >
          {localize('popup.page-error.refresh-btn')}
        </Button>
      }
    />
  );
};
