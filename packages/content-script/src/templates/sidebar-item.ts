import { ChannelInfo } from '@shared/types';
import { formatNumber } from '@shared/utils/format';

const SidebarItemTemplate = (channel: ChannelInfo): string => {
  const isOnline = channel.isOnline;
  const viewers = formatNumber(channel.viewers || 0);

  return `
    <div class="ScTransitionBase-sc-hx4quq-0 bIklSd tw-transition" data-channel="${
      channel.twitch
    }" aria-hidden="false" style="transition-property: transform, opacity; transition-timing-function: ease;">
      <div>
        <div class="Layout-sc-1xcs6mc-0 bZVrjx side-nav-card sb-sidebar-card--collapsed" data-test-selector="side-nav-card-collapsed">
          <a class="ScCoreLink-sc-16kq0mq-0 jSrrlW InjectLayout-sc-1i43xsx-0 fKMgEV side-nav-card tw-link" href="/${
            channel.twitch
          }">
            <div class="Layout-sc-1xcs6mc-0 dutbes side-nav-card__avatar ${
              isOnline ? '' : 'side-nav-card__avatar--offline'
            }">
              <figure class="ScAvatar-sc-144b42z-0 fUKwUf tw-avatar">
                <img class="InjectLayout-sc-1i43xsx-0 bEwPpb tw-image tw-image-avatar" alt="${
                  channel.nickname
                }" src="${channel.avatar}">
              </figure>
            </div>
          </a>
        </div>

        <div class="Layout-sc-1xcs6mc-0 bZVrjx side-nav-card sb-sidebar-card--expanded">
          <a class="ScCoreLink-sc-16kq0mq-0 jKBAWW InjectLayout-sc-1i43xsx-0 fpJafq side-nav-card__link tw-link" href="/${
            channel.twitch
          }">

            <div class="Layout-sc-1xcs6mc-0 dutbes side-nav-card__avatar ${
              isOnline ? '' : 'side-nav-card__avatar--offline'
            }">
              <figure class="ScAvatar-sc-144b42z-0 fUKwUf tw-avatar">
                <img class="InjectLayout-sc-1i43xsx-0 bEwPpb tw-image tw-image-avatar" alt="${
                  channel.nickname
                }" src="${channel.avatar}">
              </figure>
            </div>

            <div class="Layout-sc-1xcs6mc-0 jQTQnr">
              <div class="Layout-sc-1xcs6mc-0 eCunGK">
                <div class="Layout-sc-1xcs6mc-0 beAYWq side-nav-card__title">
                  <p title="${
                    channel.nickname
                  }" class="CoreText-sc-1txzju1-0 iQYdBM InjectLayout-sc-1i43xsx-0 gaLyxR">${
    channel.nickname
  }</p>
                </div>
                ${
                  isOnline && channel.category
                    ? `
                <div class="Layout-sc-1xcs6mc-0 fFENuB side-nav-card__metadata">
                  <p title="${channel.category}" class="CoreText-sc-1txzju1-0 bApHMU">${channel.category}</p>
                </div>
                `
                    : ''
                }
              </div>
              ${
                isOnline
                  ? `
              <div class="Layout-sc-1xcs6mc-0 kzjhVk side-nav-card__live-status">
              <div class="Layout-sc-1xcs6mc-0 beAYWq">
                <div class="ScChannelStatusIndicator-sc-bjn067-0 dMXHmM tw-channel-status-indicator"></div>
                <p class="CoreText-sc-1txzju1-0 InjectLayout-sc-1i43xsx-0 cixGyF">Live</p>
                <div class="Layout-sc-1xcs6mc-0 kaXoQh">
                  <span aria-hidden="true" class="CoreText-sc-1txzju1-0 grGUPN">${viewers}</span>
                  <p class="CoreText-sc-1txzju1-0 InjectLayout-sc-1i43xsx-0 cixGyF">${viewers}</p>
                </div>
              </div>
            </div>
              `
                  : '<div class="Layout-sc-1xcs6mc-0 kzjhVk side-nav-card__live-status" data-a-target="side-nav-live-status"><span class="CoreText-sc-1txzju1-0 grGUPN">Offline</span></div>'
              }
            </div>
            
          </a>
        </div>
      </div>
    </div>
  `;
};

export default SidebarItemTemplate;
