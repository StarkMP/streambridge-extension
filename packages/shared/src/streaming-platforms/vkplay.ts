import { PlatformId, StreamingPlatform } from '@shared/types';
import { onElementLoaded } from '@shared/utils/dom';
import axios from 'axios';

const vkPlay: StreamingPlatform = {
  id: PlatformId.VKPlayLive,
  url: 'https://vkplay.live/%id%',
  getInfo: async (channel) => {
    const apiUrl = `https://api.vkplay.live/v1/blog/${channel.source.channelId}/public_video_stream`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      return {
        twitch: channel.twitch,
        isOnline: data.isOnline,
        category: data.category?.title,
        viewers: data.isOnline ? data.count.viewers : 0,
        title: data.title,
        nickname: data.user.displayName,
        avatar: data.user.avatarUrl,
      };
    } catch (e) {
      return null;
    }
  },
  render: () => {
    const topMenu = document.querySelector('#topMenu') as HTMLElement;

    if (topMenu) {
      topMenu.style.display = 'none';
    }

    const sidebar = document.querySelector('#topMenu + div > div') as HTMLElement;

    if (sidebar) {
      sidebar.style.display = 'none';
    }

    onElementLoaded('[data-test-id="StreamPage:root"] > div + div', (el) => {
      el.style.top = '0';
    });

    const player = document.querySelector('vk-video-player');

    if (player) {
      // @ts-ignore
      const video = player.shadowRoot.firstChild.querySelector('video') as HTMLVideoElement;

      video.onloadeddata = (): void => {
        video.muted = false;
      };
    }
  },
};

export default vkPlay;
