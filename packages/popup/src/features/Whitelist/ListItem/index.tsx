import { maxFollowedChannels } from '@shared/constants';
import { Channel, PlatformId } from '@shared/types';
import { getChannelUrl } from '@shared/utils/platform';
import { List, Switch, Tooltip } from 'antd';
import React, { JSX } from 'react';
import { useLocalizer } from 'reactjs-localizer';

import { KickIcon, TrovoIcon, VKPlayIcon, WASDIcon, YouTubeIcon } from '../../../components/Icons';
import { useStorage } from '../../../context/StorageContext';
import { ListItemSourceUrl, ListItemText, ListItemTwitch, ListItemWrapper } from './styles';

type ListItemProps = {
  item: Channel;
  onFollow: (checked: boolean, twitch: string) => void;
};

const platformsIcons: Record<string, React.ReactNode> = {
  [PlatformId.Kick]: <KickIcon />,
  [PlatformId.VKPlayLive]: <VKPlayIcon />,
  [PlatformId.Trovo]: <TrovoIcon />,
  [PlatformId.WASD]: <WASDIcon />,
  [PlatformId.YouTube]: <YouTubeIcon />,
};

const ListItem = ({ item, onFollow }: ListItemProps): JSX.Element => {
  const { localize } = useLocalizer();
  const { storage } = useStorage();

  const checked = storage.followed.includes(item.twitch);
  const disabled = !checked && storage.followed.length >= maxFollowedChannels;
  const channelUrl = getChannelUrl(item.source.id, item.source.channelId);

  return (
    <List.Item
      actions={[
        <Tooltip
          key={item.twitch}
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
            onChange={(checked): void => onFollow(checked, item.twitch)}
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
};

export default ListItem;
