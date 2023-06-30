import { translations } from '@sdk/translations';
import { PlatformId, StreamingPlatform } from '@sdk/types';
import { onElementLoaded } from '@sdk/utils/dom';
import axios from 'axios';

const kick: StreamingPlatform = {
  id: PlatformId.Kick,
  getInfo: async (channel) => {
    const apiUrl = `https://kick.com/api/v2/channels/${channel.source.channelId}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      return {
        twitch: channel.twitch,
        isOnline: !!data.livestream,
        category: data.livestream ? data.livestream.categories[0].name : null,
        viewers: data.livestream ? data.livestream.viewer_count : 0,
        title: data.livestream ? data.livestream.session_title : null,
        nickname: data.user.username,
        avatar: data.user.profile_pic,
      };
    } catch (e) {
      return null;
    }
  },
  render: ({ channel, language }) => {
    onElementLoaded('nav', (el) => {
      el.style.display = 'none';
    });

    onElementLoaded('nav + div > div', (el) => {
      el.style.display = 'none';
    });

    onElementLoaded(
      '.send-row > button',
      (el) => {
        (el as HTMLButtonElement).disabled = false;

        el.addEventListener('click', () => {
          window.open(
            `https://kick.com/${channel.source.channelId}/chatroom`,
            'mywindow',
            `width=340,height=${window.innerHeight},top=0,left=${
              window.innerWidth - 340
            }`
          );
        });
      },
      true
    );

    onElementLoaded(
      '.send-row > button .inner-label',
      (el) => {
        el.innerHTML = translations['iframe.kick.open-chat-btn'][language];
      },
      true
    );

    onElementLoaded(
      '#message-input',
      (el) => {
        el.setAttribute(
          'data-placeholder',
          translations['iframe.kick.open-chat-description'][language]
        );
      },
      true
    );
  },
};

export default kick;
