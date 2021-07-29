import { SwipeDirections, Vector2 } from './types';

export function getDirection(
    absX:number,
    absY:number,
    deltaX:number,
    deltaY:number,
):SwipeDirections {
  if (absX > absY) {
    if (deltaX > 0) {
      return SwipeDirections.RIGHT;
    }
    return SwipeDirections.LEFT;
  } else if (deltaY > 0) {
    return SwipeDirections.DOWN;
  }
  return SwipeDirections.UP;
}

export function rotateXYByAngle(pos:Vector2, angle:number):Vector2 {
  if (angle === 0) return pos;
  const angleInRadians = (Math.PI / 180) * angle;
  const x =
      pos[0] * Math.cos(angleInRadians) + pos[1] * Math.sin(angleInRadians);
  const y =
      pos[1] * Math.cos(angleInRadians) - pos[0] * Math.sin(angleInRadians);
  return [x, y];
}

export function isNoSwipe(el:any, noSwipingSelector?:string) {
  return noSwipingSelector && el?.target?.closest(noSwipingSelector);
}
