import { getChannels, getChannelsByKeyword } from '@shared/api/services/whitelist';
import { maxFollowedChannels } from '@shared/constants';
import { Channel } from '@shared/types';
import React, { JSX, useEffect, useRef, useState } from 'react';

import { whitelistLazyLoadLimit } from '../../constants';
import { useStorage } from '../../context/StorageContext';
import Whitelist from '../../features/Whitelist';
import useDidUpdateEffect from '../../hooks/useDidUpdateEffect';

const ChannelsWhitelistPage = (): JSX.Element => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [fetching, setFetching] = useState<boolean>();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { storage, updateStorage } = useStorage();
  const [search, setSearch] = useState<string>('');
  const isFollowedChanged = useRef<boolean>(false);
  const offsetRef = useRef<number>(0);
  const searchRef = useRef<string>(search);
  const [switcherLoading, setSwitcherLoading] = useState<string | null>(null);

  const onSearch = (value: string): void => {
    offsetRef.current = 0;
    setChannels([]);
    setHasMore(true);
    setSearch(value);
  };

  const handleFollow = (checked: boolean, twitch: string): void => {
    if (switcherLoading === twitch) {
      return;
    }

    const followed = storage.followed.slice();

    if (checked && followed.length >= maxFollowedChannels) {
      return;
    }

    setSwitcherLoading(twitch);

    if (checked) {
      followed.push(twitch);
    } else {
      const index = followed.findIndex((item) => item === twitch);

      followed.splice(index, 1);
    }

    isFollowedChanged.current = true;
    updateStorage({ ...storage, followed }).finally(() => setSwitcherLoading(null));
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
        priority: storage.followed,
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

    getChannels({
      offset: offsetRef.current,
      limit: whitelistLazyLoadLimit,
      priority: storage.followed,
    })
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

  useDidUpdateEffect(() => {
    searchRef.current = search;

    loadMoreChannels();
  }, [search]);

  return (
    <Whitelist
      channels={channels}
      search={search}
      hasMore={hasMore}
      loadMore={loadMoreChannels}
      onSearch={onSearch}
      onFollow={handleFollow}
    />
  );
};

export default ChannelsWhitelistPage;
