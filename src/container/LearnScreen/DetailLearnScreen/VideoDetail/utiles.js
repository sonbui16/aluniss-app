import { PLAYER_STATES } from './playStates'
import images from 'imagesApp';


export const humanizeVideoDuration = (seconds) => {
  const [begin, end] = seconds >= 3600 ? [11, 8] : [14, 5];
  const date = new Date(0);

  date.setSeconds(seconds);
  return date.toISOString().substr(begin, end);
};


export const getPlayerStateIcon = (playerState) => {
  switch (playerState) {
    case PLAYER_STATES.PAUSED:
      return images.play
    case PLAYER_STATES.PLAYING:
      return images.pause;
    case PLAYER_STATES.ENDED:
      return images.ic_replay;
    default:
      return null;
  }
};