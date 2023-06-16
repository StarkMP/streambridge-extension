import { PlatformId, StreamingPlatform } from '../types';
import { onElementLoaded } from '../utils/dom';

const wasd: StreamingPlatform = {
  id: PlatformId.WASD,
  getInfo: async (channel) => {
    const apiUrl = `https://wasd.tv/api/v2/broadcasts/public?channel_name=${channel.source.channelId}`;

    try {
      const response = await fetch(apiUrl, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      const data = await response.json();

      const isOnline = data.result.channel.channel_is_live;

      return {
        twitch: channel.twitch,
        isOnline,
        category: data.result.media_container?.game?.game_name,
        viewers: isOnline
          ? data.result.media_container?.media_container_streams[0]
              ?.stream_current_viewers
          : 0,
        title: data.result.media_container?.media_container_name,
        nickname: data.result.channel.channel_name,
        avatar: data.result.channel?.channel_image?.small,
      };
    } catch (e) {
      return null;
    }
  },
  render: () => {
    onElementLoaded('wasd-header', (el) => {
      el.style.display = 'none';
    });

    onElementLoaded('#scroll-content', (el) => {
      el.style.paddingLeft = '0';
      el.style.marginTop = '0';
      el.style.height = '100%';
    });
  },
};

export default wasd;
