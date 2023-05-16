import React from 'react'
import bannerCategory from '../../assets/data/bannerCategory';
import Grid from '../Grid';
import BannerCategoryCard from './BannerCategoryCard'
import "./BannerCategory.scss"
const BannerCategory = () => {
  return (
    <div className='banner__category' >
      <div className="container">
        <Grid col = {2} mdCol = {1}>
            <BannerCategoryCard path = {bannerCategory[0].path} src = {bannerCategory[0].src} title = {bannerCategory[0].title} />
            <Grid col = {1} gap = {20}>
              <BannerCategoryCard path = {bannerCategory[1].path} src = {bannerCategory[1].src} title = {bannerCategory[1].title} />
              <BannerCategoryCard path = {bannerCategory[2].path} src = {bannerCategory[2].src} title = {bannerCategory[2].title} />
            </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default BannerCategory