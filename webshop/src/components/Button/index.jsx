import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'
const Button = (props) => {
  return (
    <button 
            type={props.type || 'button'} 
            onClick={props.onclick} 
            className = {` btn ${props.className}`}
            disabled={props.disabled}
    >
        {props.children}
    </button>
  )
}

Button.propTypes = {}

export default Button