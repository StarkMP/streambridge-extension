import { ChannelStatus, StreamingService } from '../types';
import { findElement } from '../utils/dom';

const vkPlay: StreamingService = {
  id: 'vkplay',
  getInfo: () => {
    return {
      status: ChannelStatus.Offline,
    };
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
