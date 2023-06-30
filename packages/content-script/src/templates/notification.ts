import { translations } from '@shared/translations';
import { Channel, Languages, PlatformId } from '@shared/types';

import KickIconTemplate from './icons/kick';
import TrovoIconTemplate from './icons/trovo';
import VKPlayIconTemplate from './icons/vkplay';
import WASDIconTemplate from './icons/wasd';
import YouTubeIconTemplate from './icons/youtube';

const getPlatformName = (id: PlatformId, language: Languages): string => {
  const platformNames = {
    [PlatformId.VKPlayLive]: translations['platform.vkplay.name'][language],
    [PlatformId.Kick]: translations['platform.kick.name'][language],
    [PlatformId.Trovo]: translations['platform.trovo.name'][language],
    [PlatformId.WASD]: translations['platform.wasd.name'][language],
    [PlatformId.YouTube]: translations['platform.youtube.name'][language],
  };

  return platformNames[id];
};

const platformIcons = {
  [PlatformId.VKPlayLive]: VKPlayIconTemplate(),
  [PlatformId.Kick]: KickIconTemplate(),
  [PlatformId.Trovo]: TrovoIconTemplate(),
  [PlatformId.WASD]: WASDIconTemplate(),
  [PlatformId.YouTube]: YouTubeIconTemplate(),
};

const NotificationTemplate = (
  channel: Channel,
  language: Languages
): string => {
  return `
    <div class="sb-notification sb-notification--${channel.source.id}">
      <button id="sb-notification-close" class="sb-notification__close-btn"></button>
      ${platformIcons[channel.source.id]}
      <div class="sb-notification__text-wrapper">
        <div class="sb-notification__title">
          ${translations['content.notification.title'][language]
            .replace('%url%', channel.source.url)
            .replace('%name%', getPlatformName(channel.source.id, language))}
        </div>
        <div class="sb-notification__description">
          ${translations['content.notification.description'][language].replace(
            '%url%',
            channel.source.url
          )}
        </div>
      </div>
    </div>
  `;
};

export default NotificationTemplate;
