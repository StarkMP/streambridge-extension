import { StreamingPlatform } from '../types';
import { onElementLoaded } from '../utils/dom';

const kick: StreamingPlatform = {
  id: 'kick.com',
  getInfo: async (channel) => {
    const apiUrl = `https://kick.com/api/v2/channels/${channel.source.channelId}`;

    try {
      const response = await fetch(apiUrl, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      const data = await response.json();

      return {
        twitch: channel.twitch,
        isOnline: !!data.livestream,
        category: data.livestream ? data.livestream.categories[0].name : null,
        viewers: data.livestream ? data.livestream.viewer_count : null,
        title: data.livestream ? data.livestream.session_title : null,
        nickname: data.user.username,
        avatar: data.user.profile_pic,
      };
    } catch (e) {
      return null;
    }
  },
  render: () => {
    onElementLoaded('nav', (el) => {
      el.style.display = 'none';
    });

    onElementLoaded('nav + div > div', (el) => {
      el.style.display = 'none';
    });

    onElementLoaded('.send-row > button', (el) => {
      (el as HTMLButtonElement).disabled = false;

      el.addEventListener('click', () => {
        window.open(
          'https://kick.com/loochy/chatroom',
          'mywindow',
          `width=340,height=${window.innerHeight},top=0,left=${
            window.innerWidth - 340
          }`
        );
      });
    });

    onElementLoaded('.send-row > button .inner-label', (el) => {
      el.innerHTML = 'Open in new window';
    });

    onElementLoaded('#message-input', (el) => {
      el.setAttribute('data-placeholder', 'Usable only in new window');
    });
  },
};

export default kick;
