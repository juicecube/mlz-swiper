import React from 'react';
// import { useSwipeable, CarouselItem, Carousel } from '../src/index';
import './test.scss';

// test postinstall会先设置libraryname
// import { useSwipeable, CarouselItem, Carousel } from '../dist/lib/mlz-swiper';
import { useSwipeable, CarouselItem, Carousel } from '../dist/lib/mlz-swiper';
// import { useSwipeable, CarouselItem, Carousel } from '../dist/types';

export const Test = () => {
  const pictures = ['https://react.iamkasong.com/img/logo.png', 'https://online-education.codemao.cn/607/1621501737042lock.png', 'https://user-gold-cdn.xitu.io/2020/7/13/17343ca6412f1e2c?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1' ];

  const handleSlideChange = (activeIndex:number) => {
    console.log('handleSlideChange', activeIndex);
  };

  const handleCarouselClick = () => {
    console.log('handleCarouselClick');
  };

  return (
    <div className="detail-wrap-swiper">
      <Carousel
        onSlideChange={(activeIndex) => handleSlideChange(activeIndex)}
        className="detail-wrap-swiper-container"
        // 不监听拖拉的区域
        noSwipingSelector="#mlz-controller"
        // fullscreen={fullscreen}
        // onFullscreenClose={handleFullscreenClose}
        // 抵抗距离 第一个或者最后一个的时候，可以拉动的距离
        resistanceDistance={84}
        // 最后一张时，继续拖拉的文案
        lastSlideMessage="最后一张了"
      >
        {pictures.map((item, index) => <CarouselItem
          onClick={handleCarouselClick}
          key={`course-detail-swiper-${ index}`}>
          <img
            className="detail-wrap-swiper-container-img"
            src={item} />
        </CarouselItem>)}
      </Carousel>
    </div>
  );
};


