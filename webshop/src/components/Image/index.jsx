import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

const Image = forwardRef(({src, className, alt,...props}, ref) => {
  return (
    <img
        className={className}
        ref = {ref}
        src = {src}
        {...props}
        alt={alt}
    />
  )
})

Image.propTypes = {}

export default Image