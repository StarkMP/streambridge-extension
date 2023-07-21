import { translations } from '@shared/translations';
import { ChannelInfo, Languages } from '@shared/types';

import SidebarItemTemplate from './sidebar-item';

const SidebarTemplate = (channels: ChannelInfo[], language: Languages): string => {
  const items =
    channels.length > 0
      ? channels
          .sort(
            (a, b) =>
              Number(b.data.isOnline) +
              Number(b.data.viewers) -
              (Number(a.data.isOnline) + Number(a.data.viewers))
          )
          .map((item) => SidebarItemTemplate(item, language))
          .join('')
      : `<span class="sb-sidebar__empty-label">${translations['content.sidebar.empty-description'][language]}</span>`;

  return `
    <div id="stream-bridge-sidebar" class="sb-sidebar">
      <h2 class="sb-sidebar__title">${translations['project.name'][language]}</h2>
      <div class="sb-sidebar-items">
        ${items}
      </div>
    </div>
  `;
};

export default SidebarTemplate;
