import { StreamingPlatform } from '../types';
import { findElement } from '../utils/dom';

const vkPlay: StreamingPlatform = {
  id: 'vkplay',
  getInfo: async (channelId: string) => {
    const apiUrl = `https://api.vkplay.live/v1/blog/${channelId}/public_video_stream`;

    try {
      const response = await fetch(apiUrl, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      const json = response.json();

      console.log(json);

      return {
        isOnline: false,
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
  },
};

export default vkPlay;
