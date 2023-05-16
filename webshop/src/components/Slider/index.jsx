import React, { useCallback, useEffect, useState } from 'react'
import img1 from '../../assets/images/banner/BANNER_1.jpg';
import img2 from '../../assets/images/banner/BANNER_2.jpg';
import img3 from '../../assets/images/banner/BANNER_3.jpg';
import SliderItem from './SliderItem';
import "./Slide.scss"
const img = [img1, img2, img3]
const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const nextSlide = useCallback( () => {
      activeSlide === 2 ? setActiveSlide(0) : setActiveSlide(state => state + 1)
  }, [activeSlide])
  const prevSlide = () => {
    activeSlide === 0 ? setActiveSlide(2) : setActiveSlide(state => state - 1)

  }
  useEffect(()=> {
      const slideAuto = setInterval(() => {
          nextSlide();
      }, 3000)
      return () => clearInterval(slideAuto)
  }, [nextSlide])
  return (
    <div className='slider'>
        {img.map((item, index) => 
            (<SliderItem key = {index} img = {item} active = {index === activeSlide } />)
        )}
        <div className="slider__control">
            <div className="slider__control__item" onClick={prevSlide}>
                <i className="far fa-angle-left"></i>
            </div>
            <div className="slider__control__item" onClick={nextSlide}>
                <i className="far fa-angle-right"></i>
            </div>
        </div>
    </div>
  )
}

export default Slider