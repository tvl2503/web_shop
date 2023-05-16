import React from 'react'
import PropTypes from 'prop-types'
const style = {
  width: "100%"
}
const Banner = ({src}) => {
  return (
    <div className='banner'>
        <img src={src} alt="" style={style} />
    </div>
  )
}

Banner.propTypes = {}

export default Banner