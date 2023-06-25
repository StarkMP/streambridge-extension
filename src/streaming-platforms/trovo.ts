import axios from 'axios';

import { PlatformId, StreamingPlatform } from '../types';
import { onElementLoaded } from '../utils/dom';

const trovo: StreamingPlatform = {
  id: PlatformId.Trovo,
  getInfo: async (channel) => {
    const apiUrl = 'https://api-web.trovo.live/graphql?qid=0';

    const body = JSON.stringify([
      {
        operationName: 'live_LiveReaderService_GetLiveInfo',
        variables: {
          params: {
            userName: channel.source.channelId,
            requireDecorations: true,
          },
        },
      },
    ]);

    try {
      // we should use fetch instead of axios
      // because we get CORS error
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        cache: 'no-store',
        body,
      });

      const json = await response.json();
      const data = json[0].data.live_LiveReaderService_GetLiveInfo;
      const isOnline = !!data.isLive;

      return {
        twitch: channel.twitch,
        isOnline,
        category: data.categoryInfo.name,
        viewers: isOnline ? data.channelInfo.viewers : 0,
        title: data.channelInfo.title,
        nickname: data.streamerInfo.nickName,
        avatar: data.streamerInfo.faceUrl,
      };
    } catch (e) {
      return null;
    }
  },
  render: () => {
    onElementLoaded('nav.base-nav', (el) => {
      el.style.display = 'none';
    });

    onElementLoaded('.base-left-side-container', (el) => {
      el.style.display = 'none';
    });
  },
};

export default trovo;
