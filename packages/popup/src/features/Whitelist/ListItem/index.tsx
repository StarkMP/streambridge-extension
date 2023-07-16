import { maxFollowedChannels } from '@shared/constants';
import { Channel, PlatformId } from '@shared/types';
import { getChannelUrl } from '@shared/utils/platform';
import { Dropdown, List, Switch, Tooltip } from 'antd';
import React, { JSX } from 'react';
import { useLocalizer } from 'reactjs-localizer';

import { KickIcon, TrovoIcon, VKPlayIcon, WASDIcon, YouTubeIcon } from '../../../components/Icons';
import { useStorage } from '../../../context/StorageContext';
import {
  ActionsWrapper,
  ListItemMenuButton,
  ListItemSourceUrl,
  ListItemText,
  ListItemTwitch,
  ListItemWrapper,
} from './styles';

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
  const { storage, updateStorage } = useStorage();

  const checked = storage.followed.includes(item.twitch);
  const disabled = !checked && storage.followed.length >= maxFollowedChannels;
  const channelUrl = getChannelUrl(item.source.id, item.source.channelId);

  const removeLocalChannel = (twitch: string): void => {
    const localWhitelist = storage.localWhitelist.slice();
    const followed = storage.followed.slice();
    const index = localWhitelist.findIndex((item) => item.twitch === twitch);

    if (followed.includes(localWhitelist[index].twitch)) {
      const followedIndex = followed.findIndex((item) => item === twitch);

      followed.splice(followedIndex, 1);
    }

    localWhitelist.splice(index, 1);

    updateStorage({ localWhitelist, followed });
  };

  return (
    <List.Item
      actions={[
        <ActionsWrapper key={item.twitch}>
          {item.isLocal && (
            <Tooltip title={localize('popup.channel-list.local-channel-menu')}>
              <Dropdown
                trigger={['click']}
                menu={{
                  items: [
                    {
                      key: 'remove',
                      label: localize('popup.channel-list.local-channel-menu-remove'),
                      onClick: () => removeLocalChannel(item.twitch),
                    },
                  ],
                }}
              >
                <ListItemMenuButton />
              </Dropdown>
            </Tooltip>
          )}
          <Tooltip
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
          </Tooltip>
        </ActionsWrapper>,
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
