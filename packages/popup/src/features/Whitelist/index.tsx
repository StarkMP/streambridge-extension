import { LoadingOutlined } from '@ant-design/icons';
import { Channel } from '@shared/types';
import React, { JSX } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import ListHeader from './ListHeader';
import ListItem from './ListItem';
import { List, LoaderWrapper, ScrollableWrapper } from './styles';

type WhitelistProps = {
  channels: Channel[];
  search: string;
  hasMore: boolean;
  loadMore: () => void;
  onSearch: (value: string) => void;
  onFollow: (checked: boolean, twitch: string) => void;
};

const Whitelist = ({
  channels,
  search,
  hasMore,
  loadMore,
  onSearch,
  onFollow,
}: WhitelistProps): JSX.Element => (
  <List
    dataSource={channels}
    header={<ListHeader search={search} onSearch={onSearch} />}
    itemLayout='horizontal'
  >
    <ScrollableWrapper id='channels-scroll'>
      <InfiniteScroll
        dataLength={channels.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <LoaderWrapper>
            <LoadingOutlined />
          </LoaderWrapper>
        }
        // endMessage={<p>Thats all!</p>}
        scrollableTarget='channels-scroll'
      >
        {channels.map((item) => (
          <ListItem key={item.twitch} item={item} onFollow={onFollow} />
        ))}
      </InfiniteScroll>
    </ScrollableWrapper>
  </List>
);

export default Whitelist;
