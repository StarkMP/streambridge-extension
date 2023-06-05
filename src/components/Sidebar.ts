import { ChannelInfo } from '../types';
import SidebarItem from './SidebarItem';

const Sidebar = (channels: ChannelInfo[]): string => {
  return `
    <div id="stream-bridge-sidebar" aria-label="Stream Bridge" class="Layout-sc-1xcs6mc-0 bSoSIm side-nav-section" role="group">
      <div class="Layout-sc-1xcs6mc-0 lmQRGZ side-nav-header">
        <h2 class="CoreText-sc-1txzju1-0 lnnKUr">Stream Bridge</h2>
      </div>
      <div class="InjectLayout-sc-1i43xsx-0 eptOJT tw-transition-group">
        ${
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
            : 'No channels'
        }
      </div>
    </div>
  `;
};

export default Sidebar;
