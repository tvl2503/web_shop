import React from 'react'
import "./Input.scss"
const Input = (props) => {
  const validateInput = props.validateInput
  
  return (
    <div className='input'>
        <label>{props.label}</label>
        <input  
          {...props}
          />
        {validateInput && console.log(validateInput)}
        {!validateInput && props.message && <span className='input-message'>{props.message}</span>}
    </div>
  )
}

export default Input