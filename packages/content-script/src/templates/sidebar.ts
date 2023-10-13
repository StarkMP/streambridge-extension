import { translations } from '@shared/translations';
import { ChannelInfo, Languages } from '@shared/types';

import SidebarItemTemplate from './sidebar-item';

const SidebarTemplate = (
  { channels, isLoading }: { channels: ChannelInfo[]; isLoading?: boolean },
  language: Languages
): string => {
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
      ${
        isLoading
          ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="currentColor" class="sb-sidebar-loader">
              <path d="M25.251 6.461c-10.318 0-18.683 8.365-18.683 18.683h4.068c0-8.071 6.543-14.615 14.615-14.615V6.461z">
                <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
              </path>
            </svg>`
          : `<div class="sb-sidebar-items">
              ${items}
            </div>`
      }
    </div>
  `;
};

export default SidebarTemplate;
