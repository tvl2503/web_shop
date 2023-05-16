import React from 'react'

const SliderItem = (props) => {
  return (
    <div className={`slider__item ${props.active ? 'active': ''}`}>
        <img src={props.img} alt = "" />
    </div>
  )
}

export default SliderItem