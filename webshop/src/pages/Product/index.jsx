import React from 'react'
import Nike from '../Products'
import { getAllProducts } from '../../assets/data/product'
const Product = () => {
  return (
    <div>

      <Nike path = {"product"} listProduct = {getAllProducts()} brumb = {"Tất cả sản phẩm"} index={-1} />
    </div>
  ) 
}

export default Product