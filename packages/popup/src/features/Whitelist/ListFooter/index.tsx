import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { JSX } from 'react';
import { useLocalizer } from 'reactjs-localizer';

import { Pages, useSimpleRouter } from '../../../pages';
import { ListFooterTitle, ListFooterWrapper } from './styles';

const ListFooter = (): JSX.Element => {
  const { setPage } = useSimpleRouter();
  const { localize } = useLocalizer();

  return (
    <ListFooterWrapper>
      <ListFooterTitle type='secondary'>
        {localize('popup.channel-list.add-channel-text')}
      </ListFooterTitle>
      <Button
        style={{ display: 'flex', alignItems: 'center' }}
        type='link'
        icon={<PlusCircleOutlined />}
        onClick={(): void => setPage(Pages.AddChannel)}
      >
        {localize('popup.channel-list.add-channel-btn')}
      </Button>
    </ListFooterWrapper>
  );
};

export default ListFooter;
