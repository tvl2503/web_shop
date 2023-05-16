import React from 'react'
import {Link} from 'react-router-dom';
import "./Breadcrumb.scss"
const Breadcrumb = props => {
  return (
    <div className='container'>
      <ol className="breadcrumb">
        <li className='breadcrumb__item'>
          <Link to="/">
            <i className="far fa-home"></i>
            Trang Chủ
          </Link>
        </li>
        {
          props.crumbs.map((item, index) => {
            if(index < props.crumbs.length - 1 )
            {
              return (
                <li key = {index} className={`breadcrumb__item`}>
                    <Link to = {item.href} >
                        {item.title}
                    </Link>
                </li>
              )
            }
            else{
              return (
                  <li key = {index} className='breadcrumb__item active'>
                    <span>{item.title}</span>
                  </li>
              )
            }
          }
          )
        }
      </ol>
    </div>
  )
}

Breadcrumb.propTypes = {}

export default Breadcrumb