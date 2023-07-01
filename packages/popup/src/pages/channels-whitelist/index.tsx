import { maxFollowedChannels } from '@shared/constants';
import { Channel, PlatformId } from '@shared/types';
import { Input, Switch, Tooltip } from 'antd';
import React, { JSX, useRef, useState } from 'react';
import { useLocalizer } from 'reactjs-localizer';

import {
  KickIcon,
  TrovoIcon,
  VKPlayIcon,
  WASDIcon,
  YouTubeIcon,
} from '../../components';
import { useStorage } from '../../context/StorageContext';
import {
  List,
  ListHeader,
  ListHeaderColumns,
  ListItemSourceUrl,
  ListItemText,
  ListItemTwitch,
  ListItemWrapper,
  ScrollableWrapper,
} from './styles';

const { Search } = Input;

const platformsIcons: Record<string, React.ReactNode> = {
  [PlatformId.Kick]: <KickIcon />,
  [PlatformId.VKPlayLive]: <VKPlayIcon />,
  [PlatformId.Trovo]: <TrovoIcon />,
  [PlatformId.WASD]: <WASDIcon />,
  [PlatformId.YouTube]: <YouTubeIcon />,
};

const ChannelsWhitelistPage = (): JSX.Element => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const { storage, updateStorage } = useStorage();
  const [search, setSearch] = useState<string>('');
  const isFollowedChanged = useRef<boolean>(false);
  const sortedChannels = useRef<Channel[]>(channels.slice());
  const { localize } = useLocalizer();
  const [fetching, setFetching] = useState<boolean>();

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

export default ChannelsWhitelistPage;
