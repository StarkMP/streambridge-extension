import { maxFollowedChannels } from '@sdk/constants';
import { Channel, PlatformId } from '@sdk/types';
import { Input, List as ListComponent, Switch, Tooltip } from 'antd';
import React, { JSX, useRef, useState } from 'react';
import { useLocalizer } from 'reactjs-localizer';
import styled from 'styled-components';

import { useStorage } from '../../context/StorageContext';
import {
  KickIcon,
  TrovoIcon,
  VKPlayIcon,
  WASDIcon,
  YouTubeIcon,
} from '../Icons';

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
  [PlatformId.WASD]: <WASDIcon />,
  [PlatformId.YouTube]: <YouTubeIcon />,
};

const ChannelList = ({ channels }: ChannelListProps): JSX.Element => {
  const { storage, updateStorage } = useStorage();
  const [search, setSearch] = useState<string>('');
  const isFollowedChanged = useRef<boolean>(false);
  const sortedChannels = useRef<Channel[]>(channels.slice());
  const { localize } = useLocalizer();

  const getSortedChannels = (): Channel[] => {
    if (!isFollowedChanged.current) {
      sortedChannels.current = sortedChannels.current
        .sort((a, b) => a.twitch.localeCompare(b.twitch))
        .sort(
          (a, b) =>
            Number(storage.followed.includes(b.twitch)) -
            Number(storage.followed.includes(a.twitch))
        );
    }

    return sortedChannels.current;
  };

  const onSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.currentTarget.value);
  };

  const handleFollow = (checked: boolean, twitch: string): void => {
    const followed = storage.followed.slice();

    if (checked && followed.length >= maxFollowedChannels) {
      return;
    }

    if (checked) {
      followed.push(twitch);
    } else {
      const index = followed.findIndex((item) => item === twitch);

      followed.splice(index, 1);
    }

    isFollowedChanged.current = true;
    updateStorage({ ...storage, followed });
  };

  return (
    <List
      header={
        <ListHeader>
          <Search
            value={search}
            onChange={onSearch}
            placeholder={localize('popup.channel-list.search')}
            allowClear
          />
          <ListHeaderColumns>
            <b>{localize('popup.channel-list.channel')}</b>
            <b>{localize('popup.channel-list.followed')}</b>
          </ListHeaderColumns>
        </ListHeader>
      }
      itemLayout='horizontal'
    >
      <ScrollableWrapper>
        {getSortedChannels()
          .filter(
            (item) =>
              item.twitch.includes(search) || item.source.url.includes(search)
          )
          .map((item, index) => {
            const checked = storage.followed.includes(item.twitch);
            const disabled =
              !checked && storage.followed.length >= maxFollowedChannels;

            return (
              <List.Item
                key={index}
                actions={[
                  <Tooltip
                    key={index}
                    title={
                      disabled
                        ? localize('popup.channel-list.limit', {
                            maxCount: maxFollowedChannels,
                          })
                        : ''
                    }
                  >
                    <Switch
                      size='small'
                      checked={checked}
                      disabled={disabled}
                      onChange={(checked): void =>
                        handleFollow(checked, item.twitch)
                      }
                    />
                  </Tooltip>,
                ]}
              >
                <ListItemWrapper>
                  {platformsIcons[item.source.id] || null}
                  <ListItemText>
                    <ListItemTwitch>{item.twitch}</ListItemTwitch>
                    <ListItemSourceUrl target='_blank' href={item.source.url}>
                      {item.source.url
                        .replace('https://', '')
                        .replace('www.', '')}
                    </ListItemSourceUrl>
                  </ListItemText>
                </ListItemWrapper>
              </List.Item>
            );
          })}
      </ScrollableWrapper>
    </List>
  );
};

export default ChannelList;
