import { StreamingService } from '../types';
import { findElement } from '../utils/dom';

export default {
  id: 'vkplay',
  render: (): void => {
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
} as StreamingService;
