import { translations } from '@shared/translations';
import { ChannelInfo, Languages } from '@shared/types';
import { formatNumber } from '@shared/utils/format';

const SidebarItemTemplate = (info: ChannelInfo, language: Languages): string => {
  const { data } = info;
  const isOnline = data.isOnline;
  const viewers = formatNumber(data.viewers || 0);

  return `
    <a class="sb-sidebar-item ${!isOnline ? 'sb-sidebar-item--offline' : ''}" href="/${
      data.twitch
    }">
      <img class="sb-sidebar-item__avatar" alt="${data.nickname}" src="${data.avatar}">
      <div class="sb-sidebar-item__user">
        <div class="sb-sidebar-item__info">
          <span class="sb-sidebar-item__nickname">${data.nickname}</span>
          ${
            isOnline && data.category
              ? `<span class="sb-sidebar-item__category">${data.category}</span>`
              : ''
          }
        </div>
        <div class="sb-sidebar-item__status">
          ${
            isOnline
              ? `
            <span class="sb-sidebar-item__status__dot"></span>
            <span class="sb-sidebar-item__status__label">${viewers}</span>`
              : `<span class="sb-sidebar-item__status__label">${translations['content.sidebar.offline'][language]}</span>`
          }
        </div>
      </div>
    </a>
  `;
};

export default SidebarItemTemplate;
