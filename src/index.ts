import { initServiceFrame } from './core/frame';
import { initTwitchExtension } from './core/twitch';
import streamersDb from './db/streamers.json';
import { isFrame } from './utils/dom';

if (isFrame()) {
  initServiceFrame(streamersDb);
} else {
  initTwitchExtension(streamersDb);
}
