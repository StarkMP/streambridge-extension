import './styles/twitch/index.scss';
import './styles/youtube.scss';

import { getChannel } from '@shared/api/services/whitelist';
import { hostname, sidebarUpdateInterval } from '@shared/constants';
import { getLocalStorage } from '@shared/storage';
import { isExtensionFrame } from '@shared/utils/frame';

import Content from './core/content';
import IFrame from './core/iframe';
import Sidebar from './core/sidebar';

const init = async (): Promise<void> => {
  const { language, localWhitelist } = await getLocalStorage();

  if (window.location.hostname === hostname) {
    new Content({ language });
    new Sidebar({
      updateInterval: sidebarUpdateInterval,
      language,
    });

    return;
  }

  if (!isExtensionFrame()) {
    return;
  }

  const id = window.name.replace('sb:', '');
  const localResult = localWhitelist.find((item) => item.id === id);

  if (localResult) {
    new IFrame({ channel: localResult, language });

    return;
  }

  const { data } = await getChannel(id);

  new IFrame({ channel: data, language });
};

init().catch((err) => console.error(err));
