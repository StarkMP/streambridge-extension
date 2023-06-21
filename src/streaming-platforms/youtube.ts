import axios from 'axios';

import { PlatformId, StreamingPlatform } from '../types';
import { onElementLoaded } from '../utils/dom';

const youtube: StreamingPlatform = {
  id: PlatformId.YouTube,
  getInfo: async (channel) => {
    const apiUrl = `https://www.youtube.com/@${channel.source.channelId}/live`;

    try {
      const response = await axios.get(apiUrl);
      const pageData: string = response.data;

      let initData: { [key: string]: any } = {};
      let apiToken = null;
      let context = null;

      const ytInitData = pageData.split('var ytInitialData =');

      if (ytInitData && ytInitData.length > 1) {
        const data = ytInitData[1].split('</script>')[0].slice(0, -1);

        if (pageData.split('innertubeApiKey').length > 0) {
          apiToken = pageData
            .split('innertubeApiKey')[1]
            .trim()
            .split(',')[0]
            .split('"')[2];
        }

        if (pageData.split('INNERTUBE_CONTEXT').length > 0) {
          context = JSON.parse(
            pageData.split('INNERTUBE_CONTEXT')[1].trim().slice(2, -2)
          );
        }

        initData = JSON.parse(data);
      } else {
        return null;
      }

      const isOnline =
        initData.contents.twoColumnWatchNextResults !== undefined;

      return {
        twitch: channel.twitch,
        isOnline,
        category: isOnline
          ? initData?.contents?.twoColumnWatchNextResults?.results?.results
              ?.contents[1].videoSecondaryInfoRenderer?.metadataRowContainer
              ?.metadataRowContainerRenderer?.rows[0].richMetadataRowRenderer
              ?.contents[0].richMetadataRenderer?.title?.simpleText
          : null,
        viewers: isOnline
          ? Number(
              initData?.contents?.twoColumnWatchNextResults?.results?.results
                ?.contents[0].videoPrimaryInfoRenderer?.viewCount
                ?.videoViewCountRenderer?.viewCount?.runs[0].text
            )
          : 0,
        title: '',
        nickname: isOnline
          ? initData?.contents?.twoColumnWatchNextResults?.results?.results
              ?.contents[1].videoSecondaryInfoRenderer?.owner
              ?.videoOwnerRenderer?.title?.runs[0].text
          : initData?.metadata?.channelMetadataRenderer?.title,
        avatar: isOnline
          ? initData?.contents?.twoColumnWatchNextResults?.results?.results?.contents[1].videoSecondaryInfoRenderer?.owner?.videoOwnerRenderer?.thumbnail?.thumbnails[0].url.replace(
              'ggpht',
              'googleusercontent'
            )
          : initData?.metadata?.channelMetadataRenderer?.avatar?.thumbnails[0].url.replace(
              's900',
              's48'
            ),
      };
    } catch (e) {
      return null;
    }
  },
  render: () => {},
};

export default youtube;
