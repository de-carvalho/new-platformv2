import React from "react";
import Slider from "react-slick";

import CardCarousel from "./cardCarousel/CardCarousel";

function Carousel() {
  const settings = {
    dots: true,
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        <CardCarousel />
        <CardCarousel />
        <CardCarousel />
        <CardCarousel />
        <CardCarousel />
        <CardCarousel />
      </Slider>
    </div>
  );
}

export default Carousel;
