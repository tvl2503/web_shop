import React from 'react'
import Grid from '../../components/Grid'
const img = "https://res.cloudinary.com/fef/image/upload/v1656410546/img-shop_ejyb0m.png"

const WhyNote = ({data}) => {
  return (
    <div className='why--note'>
        <Grid col = {2} mdCol = {1} gap = {50} >
            <div className="why--note__img">
                <img src={img} alt="" />
            </div>
            <div className="why--note__main">
                <h1 className="why--note__main__title">
                    Tại sao chọn Nhanh Sneaker
                </h1>
                <div className="why--note__main__content">
                    {
                        data.map((item, index) => (
                            <div key={index} className="why--note__main__content__item">
                                <div className="why--note__main__content__item__icon">
                                    <img src = {item.src} alt = "" />
                                </div>
                                    <div className='title'>
                                        <h3>{item.title}</h3>
                                        <span>{item.des}</span>
                                    </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </Grid>
    </div>
  )
}

export default WhyNote