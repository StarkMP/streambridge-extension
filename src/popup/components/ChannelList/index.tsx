import { Input, List as ListComponent, Switch } from 'antd';
import React, { JSX } from 'react';
import styled from 'styled-components';

import { Channel, PlatformId } from '../../../types';
import { KickIcon, TrovoIcon, VKPlayIcon } from '../Icons';

type ChannelListProps = {
  channels: Channel[];
};

const ListHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListHeaderColumns = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 36px;
    height: 36px;
    margin-right: 10px;
  }
`;

const ListItemText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItemTwitch = styled.span``;

const ListItemSourceUrl = styled.a`
  font-size: 11px;
  color: #bfbfbf;
`;

const ScrollableWrapper = styled.div`
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

const List = styled(ListComponent)`
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

const { Search } = Input;

const platformsIcons: Record<string, React.ReactNode> = {
  [PlatformId.Kick]: <KickIcon />,
  [PlatformId.VKPlayLive]: <VKPlayIcon />,
  [PlatformId.Trovo]: <TrovoIcon />,
};

const ChannelList = ({ channels }: ChannelListProps): JSX.Element => (
  <List
    header={
      <ListHeader>
        <Search placeholder='Search by nickname...' allowClear />
        <ListHeaderColumns>
          <b>Channel</b>
          <b>Followed</b>
        </ListHeaderColumns>
      </ListHeader>
    }
    itemLayout='horizontal'
  >
    <ScrollableWrapper>
      {channels.map((item, index) => (
        <List.Item key={index} actions={[<Switch key={index} size='small' />]}>
          <ListItemWrapper>
            {platformsIcons[item.source.id] || null}
            <ListItemText>
              <ListItemTwitch>{item.twitch}</ListItemTwitch>
              <ListItemSourceUrl target='_blank' href={item.source.url}>
                {item.source.url.replace('https://', '').replace('www.', '')}
              </ListItemSourceUrl>
            </ListItemText>
          </ListItemWrapper>
        </List.Item>
      ))}
    </ScrollableWrapper>
  </List>
);

export default ChannelList;
