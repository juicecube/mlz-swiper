import * as React from 'react';

export enum SwipeEvents {
  MOUSEMOVE = 'mousemove',
  MOUSEUP = 'mouseup',
  TOUCHEND = 'touchend',
  TOUCHMOVE = 'touchmove',
  TOUCHSTART = 'touchstart',
}

export enum SwipeDirections {
  LEFT = 'Left',
  RIGHT = 'Right',
  UP = 'Up',
  DOWN = 'Down',
}

export type Vector2 = [number, number];

export type HTMLElementEvent<T extends HTMLElement> = React.MouseEvent | TouchEvent | MouseEvent & {
  target:T;
}

export type HandledEvents = React.MouseEvent | TouchEvent | MouseEvent

export interface SwipeEventData {
  absX:number;
  absY:number;
  deltaX:number;
  deltaY:number;
  dir:SwipeDirections;
  event:HandledEvents;
  first:boolean;
  initial:Vector2;
  velocity:number;
  vxvy:Vector2;
}

export type SwipeCallback = (eventData:SwipeEventData) => void;
export type TapCallback = ({ event }:{ event:HandledEvents }) => void;

export type SwipeableCallbacks = {
  // Event handler/callbacks
  onSwipeStart:SwipeCallback;
  onSwiped:SwipeCallback;
  onSwipedDown:SwipeCallback;
  onSwipedLeft:SwipeCallback;
  onSwipedRight:SwipeCallback;
  onSwipedUp:SwipeCallback;
  onSwiping:SwipeCallback;
  onTap:TapCallback;
};

export interface ConfigurationOptions {
  delta:number;
  preventDefaultTouchmoveEvent:boolean;
  rotationAngle:number;
  trackMouse:boolean;
  trackTouch:boolean;
  noSwipingSelector?:string;
}

export type SwipeableProps = Partial<SwipeableCallbacks & ConfigurationOptions>;

export type SwipeablePropsWithDefaultOptions = Partial<SwipeableCallbacks> &
  ConfigurationOptions;

export interface SwipeableHandlers {
  ref(element:HTMLElement | null):void;
  onMouseDown?(event:React.MouseEvent):void;
}

export type SwipeableState = {
  cleanUpTouch?:() => void;
  el?:HTMLElement;
  eventData?:SwipeEventData;
  first:boolean;
  initial:Vector2;
  start:number;
  swiping:boolean;
  xy:Vector2;
};

export type StateSetter = (
  state:SwipeableState,
  props:SwipeablePropsWithDefaultOptions
) => SwipeableState;

export type Setter = (stateSetter:StateSetter) => void;

export type AttachTouch = (el:HTMLElement) => () => void;

export interface CarouselItemProps {
  children:React.ReactNode;
  className?:string;
  style?:React.CSSProperties;
  onClick?:() => void;
 }

export interface CarouselProps {
    children:React.ReactNode;
    onSlideChange:(activeIndex:number) => void;
    fullscreen?:boolean;
    noSwipingSelector?:string;
    onFullscreenClose?:() => void;
    resistanceDistance?:number;
    lastSlideMessage?:string;
    className?:string;
 }
