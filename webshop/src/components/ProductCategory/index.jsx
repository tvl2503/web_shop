import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import "./ProductCategory.scss"
import Grid from '../Grid'
import ProductCard from '../ProductCard'
import agent from '../../service/agent'
import { useEffect } from 'react'
import Loading from "../Loading"
import { SUCCESS } from '../../constants/statusCode'
const img =  "https://res.cloudinary.com/fef/image/upload/v1656410809/banner-mid_viarpe.png"
const ProductCategory = ({ title, path, id}) => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false)
  const getProduct =  async () => {
    setLoading(true)
    try{
      const pro = await agent.Product.getProduct({categoryId : id, page: 1, page_size : 8})
      setLoading(false)
      if(pro.code === SUCCESS)
        setProducts(pro.result.items)

    }
    catch(err){
      setProducts({})
      setLoading(false)
    }
  }
  useEffect(() => {
    getProduct()
  }, [id])
  return (
        <div className='product--category'>          
            <div className="product--category__banner">
                <Link to={"/"}>
                    <img src={img} alt="" />
                </Link>
                <div className="product--category__banner__title">
                    <h2>{title}</h2>
                    <span>Sản phẩm mới nhất nổi bật nhất</span>
                </div>
            </div>
            <div className="container">
                {loading &&
                  <Loading />
                }
              <Grid col = {4} mdCol = {3}  smCol = {2} gap = {30} >
                {
                  products.length > 0 &&
                  products.map((item, index) => (
                  <ProductCard product ={item}  key = {index} />
                ))
                }
              </Grid>
            </div>
            <div className="feature--product__other">
              <Link to = {path}> <button>Xem thêm các sản phẩm khác</button></Link>
              
            </div>
        </div>
  )
}

ProductCategory.propTypes = {}

export default ProductCategory