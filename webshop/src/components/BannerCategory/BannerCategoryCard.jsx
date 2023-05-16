import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '../Button';
import Image from '../Image';
const BannerCategoryCard = props => {
  return (
    <div className='category__card'>
        <Link to = {props.path}>
            <Image src = {props.src} alt = {""} className = "category__card__img" />
        </Link>
        <Link to = {props.path}>
            <Button>{props.title}</Button>
        </Link>
    </div>
  )
}

BannerCategoryCard.propTypes = {}

export default BannerCategoryCard