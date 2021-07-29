import React, { FC, useRef, useState, useEffect, useCallback } from 'react';
import { Carousel, CarouselItem } from 'src/swiper/carousel';
import './App.scss';

export function App() {
  const pictures = [
    'https://online-education.codemao.cn/444/162142647511721.mp4?vframe/jpg/offset/1/w/750/h/562',
    'https://react.iamkasong.com/img/logo.png',
    'https://media.prod.mdn.mozit.cloud/attachments/2012/07/09/3544/b295dd6cac2d546397fc5f7970f6495e/transform-functions-translateX_2.png',
    'https://user-gold-cdn.xitu.io/2020/7/13/17343ca6412f1e2c?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1',
  ];
  const handleSlideChange = (activeIndex:number) => {
    console.log('handleSlideChange', activeIndex);
  };

  return (
    <div className="wrap-swiper">
      <Carousel
        onSlideChange={(activeIndex) => handleSlideChange(activeIndex)}
        className="wrap-swiper-container"
        noSwipingSelector="#no-full-screen-container"
      >
        {pictures.map((item, index) => <CarouselItem key={`course-detail-swiper-${ index}`}><img
          className="wrap-swiper-container-img"
          src={item} /></CarouselItem>)}
      </Carousel>
    </div>
  );
}
