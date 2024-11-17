import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { NavigationButtons } from "./NavigationButtons";

interface CircleBlockProps {
  event: Category;
}

interface EventData {
  date: string;
  text: string;
}

interface Category {
  name: string;
  data: EventData[];
}

const SwiperWithButtons: React.FC<CircleBlockProps> = ({ event }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSwiperUpdate = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const slideNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const slidePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  return (
    <div>
      <NavigationButtons
        onPrev={slidePrev}
        onNext={slideNext}
        isBeginning={isBeginning}
        isEnd={isEnd}
      />
      <div className="info">
        <Swiper
          onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
          spaceBetween={80}
          slidesPerView={3}
          onSlideChange={handleSwiperUpdate}
          modules={[Navigation]}
        >
          {event.data.map((el, index) => (
            <SwiperSlide key={index}>
              <div className="text-block">
                <label>{el.date}</label>
                <label className="text">{el.text}</label>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperWithButtons;