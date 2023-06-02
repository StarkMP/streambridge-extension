import { initServiceFrame } from './core/frame';
import { initTwitchExtension } from './core/twitch';
import streamersDb from './db/streamers.json';
import { isFrame } from './utils/dom';

// (): void => {
//   // twitch
//   const root = document.querySelector('.root-scrollable__content');

//   if (root) {
//     root.innerHTML = `
//       <iframe id="inlineFrameExample" title="Inline Frame Example" src="https://vkplay.live/saddota" style="
//         position: absolute;
//         width: 100%;
//         height: 100%;
//       ">
//       </iframe>
//     `;
//   }

//   // vkplay.live
//   // window !== window.top
//   const topMenu = document.querySelector('#topMenu');

//   if (topMenu) {
//     topMenu.style.display = 'none';
//   }

//   const sidebar = document.querySelector('#topMenu + div > div');

//   if (sidebar) {
//     sidebar.style.display = 'none';
//   }
// };

if (isFrame()) {
  initServiceFrame(streamersDb);
} else {
  initTwitchExtension(streamersDb);
}
