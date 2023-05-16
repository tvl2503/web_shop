import React, {useState} from "react";
import PropTypes from "prop-types";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
const img = [
  "https://res.cloudinary.com/fef/image/upload/v1658549546/webshop/50_2_thumb_m8fkrj.jpg",
  "https://res.cloudinary.com/fef/image/upload/v1658549498/webshop/50_4_thumb_rbvnxq.jpg",
  "https://res.cloudinary.com/fef/image/upload/v1658549498/webshop/16032022040324_50_1_ful7xc.jpg",
  "https://res.cloudinary.com/fef/image/upload/v1658549498/webshop/50_5_thumb_co0toc.jpg",
];
const ProductSlider = ({product}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="product--detail__image">
        <Swiper 
        style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
        loop={true}
        navigation={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        >

           {product.image.map((item, index) => (
            <SwiperSlide key={index}>
                <img src={item} alt = "" />
            </SwiperSlide>
        ))} 

        </Swiper>
        <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        
        {product.image.map((item, index) => (
            <SwiperSlide key={index}>
                <img src={item} alt = "" />
            </SwiperSlide>
        ))} 
      </Swiper>
    </div>
  );
};

ProductSlider.propTypes = {};

export default ProductSlider;
