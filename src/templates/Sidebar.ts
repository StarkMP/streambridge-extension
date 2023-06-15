import { ChannelInfo } from '../types';
import SidebarItem from './sidebar-item';

const Sidebar = (channels: ChannelInfo[]): string => {
  const items =
    channels.length > 0
      ? channels
          .sort(
            (a, b) =>
              Number(b.isOnline) +
              Number(b.viewers) -
              (Number(a.isOnline) + Number(a.viewers))
          )
          .map((item) => SidebarItem(item))
          .join('')
      : '<span class="sb-sidebar__empty">Use extension to add channels</span>';

  return `
    <div id="stream-bridge-sidebar" aria-label="Stream Bridge" class="Layout-sc-1xcs6mc-0 bSoSIm side-nav-section sb-sidebar" role="group">
      <div class="Layout-sc-1xcs6mc-0 lmQRGZ side-nav-header sb-sidebar__header">
        <h2 class="CoreText-sc-1txzju1-0 lnnKUr">Stream Bridge</h2>
      </div>
      <div class="InjectLayout-sc-1i43xsx-0 dVOhMf sb-sidebar__header--collapsed">
        <div class="Layout-sc-1xcs6mc-0 eYvyCM followed-side-nav-header" data-a-target="side-nav-header-collapsed">
          <figure class="ScFigure-sc-wkgzod-0 jCwWPp tw-svg">
            <svg width="2rem" height="2rem" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9.171 4.171A4 4 0 0 0 6.343 3H6a4 4 0 0 0-4 4v.343a4 4 0 0 0 1.172 2.829L10 17l6.828-6.828A4 4 0 0 0 18 7.343V7a4 4 0 0 0-4-4h-.343a4 4 0 0 0-2.829 1.172L10 5l-.829-.829zm.829 10 5.414-5.414A2 2 0 0 0 16 7.343V7a2 2 0 0 0-2-2h-.343a2 2 0 0 0-1.414.586L10 7.828 7.757 5.586A2 2 0 0 0 6.343 5H6a2 2 0 0 0-2 2v.343a2 2 0 0 0 .586 1.414L10 14.172z" clip-rule="evenodd"></path>
            </svg>
          </figure>
        </div>
      </div>

      <div class="InjectLayout-sc-1i43xsx-0 eptOJT tw-transition-group">
        ${items}
      </div>
    </div>
  `;
};

export default Sidebar;
