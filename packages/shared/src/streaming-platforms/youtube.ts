import { PlatformId, StreamingPlatform } from '@shared/types';
import axios from 'axios';

const youtube: StreamingPlatform = {
  id: PlatformId.YouTube,
  url: 'https://www.youtube.com/%id%/live',
  getInfo: async (channel) => {
    const apiUrl = `https://www.youtube.com/@${channel.source.channelId}/live`;

    try {
      const response = await axios.get(apiUrl);
      const pageData: string = response.data;

      let initData: { [key: string]: any } = {};
      let context = null;

      const ytInitData = pageData.split('var ytInitialData =');

      if (ytInitData && ytInitData.length > 1) {
        const data = ytInitData[1].split('</script>')[0].slice(0, -1);

        if (pageData.split('INNERTUBE_CONTEXT').length > 0) {
          context = JSON.parse(pageData.split('INNERTUBE_CONTEXT')[1].trim().slice(2, -2));
        }

        initData = JSON.parse(data);
      } else {
        return null;
      }

      const isOnline =
        initData.contents.twoColumnWatchNextResults !== undefined &&
        initData?.contents?.twoColumnWatchNextResults?.results?.results?.contents[0]
          .videoPrimaryInfoRenderer?.viewCount?.videoViewCountRenderer?.isLive;

      let category;

      try {
        category = isOnline
          ? initData?.contents?.twoColumnWatchNextResults?.results?.results?.contents[1]
              .videoSecondaryInfoRenderer?.metadataRowContainer?.metadataRowContainerRenderer
              ?.rows[0].richMetadataRowRenderer?.contents[0].richMetadataRenderer?.title?.simpleText
          : null;
      } catch (err) {
        category = undefined;
      }

      return {
        id: channel.id,
        data: {
          twitch: channel.twitch,
          isOnline,
          category,
          viewers: isOnline
            ? Number(
                initData?.contents?.twoColumnWatchNextResults?.results?.results?.contents[0].videoPrimaryInfoRenderer?.viewCount?.videoViewCountRenderer?.viewCount?.runs[0].text.replace(
                  ',',
                  ''
                )
              )
            : 0,
          title: '',
          nickname: isOnline
            ? initData?.contents?.twoColumnWatchNextResults?.results?.results?.contents[1]
                .videoSecondaryInfoRenderer?.owner?.videoOwnerRenderer?.title?.runs[0].text
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
        },
      };
    } catch (e) {
      console.log('yt fetch error', e);

      return null;
    }
  },
  render: () => {
    (document.querySelector('html') as HTMLElement).classList.add('stream-bridge-page');
  },
};

export default youtube;
