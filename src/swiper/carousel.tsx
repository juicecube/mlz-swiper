import React, { useState, FC } from 'react';
import classnames from 'classnames';
import { CarouselItemProps, CarouselProps, SwipeDirections, SwipeEventData, HandledEvents } from './types';
import closeSvg from './assets/close.svg';
import { useSwipeable } from './index';

import './carousel.scss';

export const CarouselItem:FC<CarouselItemProps> = ({ children, className, ...rest }) => (
  <div
    className={classnames('carousel-wrapper-inner-item', className)}
    {...rest}
  >
    {children}
  </div>
);

export const Carousel:FC<CarouselProps> = ({ children, onSlideChange, noSwipingSelector, fullscreen = false, onFullscreenClose, resistanceDistance, lastSlideMessage }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const [client, setClient] = useState({
    clientWidth: 0,
    clientHeight: 0,
  });

  const count = React.Children.count(children);
  const lastIndex = count - 1;

  const updateIndex = (newIndex:number, eventData:SwipeEventData) => {
    // loop
    // if (newIndex < 0) {
    //   newIndex = count - 1;
    // } else if (newIndex >= count) {
    //   newIndex = 0;
    // }

    if (newIndex < 0) {
      // 第一张往左 不能滑动
      newIndex = 0;
    } else if (newIndex >= count) {
      // 最后一张往右 出现“最后一张了”
      newIndex = count - 1;
    }

    setActiveIndex(newIndex);
    onSlideChange && onSlideChange(newIndex);
  };

  const handleSwipeStart = (eventData:SwipeEventData) => {
    console.log('handleSwipeStart', eventData);
  };
  const handleSwipedDown = (eventData:SwipeEventData) => {
    console.log('handleSwipedDown', eventData);
  };
  const handleSwipedUp = (eventData:SwipeEventData) => {
    console.log('handleSwipedUp', eventData);
  };
  const handleSwipedClick = (event:HandledEvents) => {
    console.log('handleSwipedClick', event);
  };

  const afterSlide = (newIndex:number) => {
    setActiveIndex(newIndex);

    onSlideChange && onSlideChange(newIndex);
  };

  const handleSwiping = (eventData:SwipeEventData) => {
    const { absX, dir } = eventData;

    let newTranslateX = 0;

    // let carouselWidth = 0;
    // if (event.target) {
    //   carouselWidth = event.target.clientWidth;
    // }
    const isTranslate = activeIndex === 0 ? 0 : activeIndex * client.clientWidth;

    if (dir === SwipeDirections.LEFT) {
      // 下一张
      // newTranslateX = activeIndex === lastIndex ? isTranslate : (isTranslate + absX);
      if (resistanceDistance && absX > resistanceDistance) {
        newTranslateX = isTranslate + resistanceDistance;
      } else {
        newTranslateX = isTranslate + absX;
      }
    } else if (dir === SwipeDirections.RIGHT) {
      // 上一张
      newTranslateX = activeIndex === 0 ? 0 : (isTranslate - client.clientWidth - absX);
    }

    setTranslateX(newTranslateX);
  };

  const handleSwiped = (eventData:SwipeEventData) => {
    const { absX, dir } = eventData;
    // 阈值
    const threshold = client.clientWidth / 4;
    // let carouselWidth = 0;
    // if (event.target) {
    //   carouselWidth = event.target.clientWidth;
    //   threshold = carouselWidth / 4;
    // }

    let newTranslateX = 0;
    const isTranslate = activeIndex === 0 ? 0 : activeIndex * client.clientWidth;

    if (dir === SwipeDirections.LEFT) {
      // 下一张
      if (absX > threshold) {
        newTranslateX = activeIndex === lastIndex ? isTranslate : (isTranslate + client.clientWidth);
        afterSlide(activeIndex === lastIndex ? lastIndex : activeIndex + 1);
      } else {
        newTranslateX = isTranslate;
      }
    } else if (dir === SwipeDirections.RIGHT) {
      // 上一张

      newTranslateX = activeIndex === 0 ? 0 : (isTranslate - client.clientWidth);

      if (absX > threshold) {
        afterSlide(activeIndex === 0 ? 0 : activeIndex - 1);
      }
    }

    setTranslateX(newTranslateX);
  };

  const handleFullscreenClose = () => {
    onFullscreenClose && onFullscreenClose();
  };

  const handlers = useSwipeable({
    // onSwipedLeft: (eventData) => updateIndex(activeIndex + 1, eventData),
    // onSwipedRight: (eventData) => updateIndex(activeIndex - 1, eventData),
    // onSwipeStart: (eventData) => handleSwipeStart(eventData),
    // onSwipedDown: (eventData) => handleSwipedDown(eventData),
    // onSwipedUp: (eventData) => handleSwipedUp(eventData),
    // onTap: (event) => handleSwipedClick(event),
    onSwiped: (eventData) => handleSwiped(eventData),
    onSwiping: (eventData) => handleSwiping(eventData),
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
    noSwipingSelector,
  });

  const refCallback = (ref:HTMLDivElement) => {
    handlers.ref(ref);

    if (!client.clientWidth && ref) {
      const { width, height } = ref?.getBoundingClientRect();

      setClient({
        clientWidth: width,
        clientHeight: height,
      });
    }
  };

  const lastItemStyle = fullscreen ? { height: `${client.clientHeight }px`, color: '#fff' } : { height: `${client.clientHeight }px` };
  console.log('render', client.clientWidth, client.clientHeight);

  return (
    <div
      {...handlers}
      ref={refCallback}
      className={classnames('carousel-wrapper', { ['carousel-wrapper-fullscreen']: fullscreen })}
    >
      {fullscreen ? <div
        onClick={handleFullscreenClose}
        className="carousel-wrapper-close"><img
          src={closeSvg}
          alt=""/></div> : null}
      <div
        className="carousel-wrapper-inner"
        style={{ transform: `translateX(-${translateX}px)` }}
        // style={{ transform: `translateX(-${1305}px)` }}
      >
        {React.Children.map(children, (child:any) => React.cloneElement(child, { width: '100%' }))}
        {lastSlideMessage
          ? <CarouselItem
            className="carousel-wrapper-inner-item-last"
            key="carousel-wrapper-item-last"
            style={lastItemStyle}
          >
            {lastSlideMessage}
          </CarouselItem> : null
        }
      </div>
      <div className="carousel-wrapper-indicators">
        {activeIndex + 1}/{count}
      </div>
    </div>
  );
};
