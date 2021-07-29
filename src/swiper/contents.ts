import { SwipeableState } from './types';

export const SwiperDefaultProps = {
  delta: 10,
  preventDefaultTouchmoveEvent: false,
  rotationAngle: 0,
  trackMouse: false,
  trackTouch: true,
};

export const initialState:SwipeableState = {
  first: true,
  initial: [0, 0],
  start: 0,
  swiping: false,
  xy: [0, 0],
};
