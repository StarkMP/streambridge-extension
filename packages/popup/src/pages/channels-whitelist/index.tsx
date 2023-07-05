import { LoadingOutlined } from '@ant-design/icons';
import {
  getChannels,
  getChannelsByKeyword,
} from '@shared/api/services/whitelist';
import { maxFollowedChannels } from '@shared/constants';
import { Channel, PlatformId } from '@shared/types';
import { getChannelUrl } from '@shared/utils/platform';
import { Input, Skeleton, Space, Switch, Tooltip } from 'antd';
import React, { JSX, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocalizer } from 'reactjs-localizer';

import {
  KickIcon,
  TrovoIcon,
  VKPlayIcon,
  WASDIcon,
  YouTubeIcon,
} from '../../components/Icons';
import { whitelistLazyLoadLimit } from '../../constants';
import { useStorage } from '../../context/StorageContext';
import {
  List,
  ListHeader,
  ListHeaderColumns,
  ListItemSourceUrl,
  ListItemText,
  ListItemTwitch,
  ListItemWrapper,
  LoaderWrapper,
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
  const [fetching, setFetching] = useState<boolean>();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { storage, updateStorage } = useStorage();
  const [search, setSearch] = useState<string>('');
  const isFollowedChanged = useRef<boolean>(false);
  const offsetRef = useRef<number>(0);
  const searchRef = useRef<string>(search);
  const { localize } = useLocalizer();

  const onSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    offsetRef.current = 0;
    setChannels([]);
    setHasMore(true);
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

  const loadMoreChannels = (): void => {
    if (search) {
      if (!hasMore) {
        return;
      }

      setFetching(true);

      const memoSearchValue = search;

      getChannelsByKeyword(search, {
        offset: offsetRef.current,
        limit: whitelistLazyLoadLimit,
      })
        .then((res) => {
          // if doesn't match (because we use async operations)
          if (memoSearchValue !== searchRef.current) {
            return;
          }

          addLoadedChannels(res.data);
        })
        .finally(() => {
          setFetching(false);
        });

      return;
    }

    if (fetching || !hasMore) {
      return;
    }

    setFetching(true);

    getChannels({ offset: offsetRef.current, limit: whitelistLazyLoadLimit })
      .then((res) => addLoadedChannels(res.data))
      .finally(() => {
        setFetching(false);
      });
  };

  const addLoadedChannels = (newChannels: Channel[]): void => {
    if (newChannels.length === 0) {
      setHasMore(false);

      return;
    }

    offsetRef.current += whitelistLazyLoadLimit;

    setChannels([...channels, ...newChannels]);

    if (newChannels.length < whitelistLazyLoadLimit) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadMoreChannels();
  }, []);

  useEffect(() => {
    searchRef.current = search;

    loadMoreChannels();
  }, [search]);

  return (
    <List
      dataSource={channels}
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
      <ScrollableWrapper id='channels-scroll'>
        <InfiniteScroll
          dataLength={channels.length}
          next={loadMoreChannels}
          hasMore={hasMore}
          loader={
            <LoaderWrapper>
              <LoadingOutlined />
            </LoaderWrapper>
          }
          // endMessage={<p>Thats all!</p>}
          scrollableTarget='channels-scroll'
        >
          {channels.map((item, index) => {
            const checked = storage.followed.includes(item.twitch);
            const disabled =
              !checked && storage.followed.length >= maxFollowedChannels;
            const channelUrl = getChannelUrl(
              item.source.id,
              item.source.channelId
            );

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
                    <ListItemSourceUrl target='_blank' href={channelUrl}>
                      {channelUrl.replace('https://', '').replace('www.', '')}
                    </ListItemSourceUrl>
                  </ListItemText>
                </ListItemWrapper>
              </List.Item>
            );
          })}
        </InfiniteScroll>
      </ScrollableWrapper>
    </List>
  );
};

export default ChannelsWhitelistPage;
