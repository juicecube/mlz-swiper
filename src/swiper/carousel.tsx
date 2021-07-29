import React, { useState, FC } from 'react';
import classNames from 'classnames';
import { CarouselItemProps, CarouselProps, SwipeDirections, SwipeEventData, HandledEvents } from './types';
import { useSwipeable } from './swiper';

import './carousel.scss';

export const CarouselItem:FC<CarouselItemProps> = ({ children }) => (
  <div className="carousel-wrapper-inner-item">
    {children}
  </div>
);

export const Carousel:FC<CarouselProps> = ({ children, onSlideChange, noSwipingSelector, className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
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
    const { absX, dir, event } = eventData;

    let newTranslateX = 0;

    let carouselWidth = 0;
    if (event.target) {
      // carouselWidth = event.target.clientWidth;
      carouselWidth = 375;
    }
    const isTranslate = activeIndex === 0 ? 0 : activeIndex * carouselWidth;

    console.log('handleSwiping', eventData);

    if (dir === SwipeDirections.LEFT) {
      // 下一张
      newTranslateX = activeIndex === lastIndex ? isTranslate : (isTranslate + absX);
    } else if (dir === SwipeDirections.RIGHT) {
      // 上一张
      newTranslateX = activeIndex === 0 ? 0 : (isTranslate - carouselWidth - absX);
    }

    setTranslateX(newTranslateX);
  };

  const handleSwiped = (eventData:SwipeEventData) => {
    const { absX, event, dir } = eventData;
    // 阈值
    let threshold = 90;
    let carouselWidth = 0;
    if (event.target) {
      // carouselWidth = event.target.clientWidth;
      carouselWidth = 375;
      threshold = carouselWidth / 4;
    }

    let newTranslateX = 0;
    const isTranslate = activeIndex === 0 ? 0 : activeIndex * carouselWidth;

    console.log('handleSwiped', eventData);

    if (dir === SwipeDirections.LEFT) {
      // 下一张
      if (absX > threshold) {
        newTranslateX = activeIndex === lastIndex ? isTranslate : (isTranslate + carouselWidth);
        afterSlide(activeIndex === lastIndex ? lastIndex : activeIndex + 1);
      } else {
        newTranslateX = isTranslate;
      }
    } else if (dir === SwipeDirections.RIGHT) {
      // 上一张

      newTranslateX = activeIndex === 0 ? 0 : (isTranslate - carouselWidth);

      if (absX > threshold) {
        afterSlide(activeIndex === 0 ? 0 : activeIndex - 1);
      }
    }

    setTranslateX(newTranslateX);
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
    // mousedown
    trackMouse: false,
    noSwipingSelector,
  });

  return (
    <div
      {...handlers}
      className={classNames('carousel-wrapper', className)}
    >
      <div
        className="carousel-wrapper-inner"
        style={{ transform: `translateX(-${translateX}px)` }}
      >
        {React.Children.map(children, (child:any) => React.cloneElement(child, { width: '100%' }))}
      </div>
      <div className="carousel-wrapper-indicators">
        {activeIndex + 1}/{count}
      </div>
    </div>
  );
};
