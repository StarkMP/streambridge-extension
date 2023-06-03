import { StreamingPlatform } from '../types';
import { findElement } from '../utils/dom';

const vkPlay: StreamingPlatform = {
  id: 'vkplay',
  getInfo: async (channel) => {
    const apiUrl = `https://api.vkplay.live/v1/blog/${channel.source.channelId}/public_video_stream`;

    try {
      const response = await fetch(apiUrl, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      const data = await response.json();

      return {
        twitch: channel.twitch,
        isOnline: data.isOnline,
        category: data.category.title,
        viewers: data.count.viewers,
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

    const sidebar = document.querySelector(
      '#topMenu + div > div'
    ) as HTMLElement;

    if (sidebar) {
      sidebar.style.display = 'none';
    }

    const chat = findElement('div', 'StreamChatToggler_root');

    if (chat) {
      chat.style.top = '0';
    }

    const player = document.querySelector('vk-video-player');

    if (player) {
      // @ts-ignore
      const video = player.shadowRoot.firstChild.querySelector(
        'video'
      ) as HTMLVideoElement;

      video.onloadeddata = (): void => {
        video.muted = false;
      };
    }
  },
};

export default vkPlay;
