import React, { useCallback,useEffect }from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import agent from '../../service/agent';
import Helmet from '../../components/Helmet';
import ProductContent from './ProductContent';
import "./ProductDetail.scss"
import ProductSlider from './ProductSlider';
import NotFound from '../NotFound';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { SUCCESS } from '../../constants/statusCode';
const ProductDetail = () => {
  
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const crumbs = [
    {
        title: "Giày nike",
        href: "/nike"
    },
    {
        title: product ? product.name : "Chi tiết sản phẩm",
        href: "nike"
    }
  ]
  const [error, setError] = useState(false)
  const getProduct = useCallback(async () => {
    setIsLoading(true)
    try{

      const pr = await agent.Product.getProductByID(id)
      if(pr.code === SUCCESS)
        setProduct(pr.result)
      setIsLoading(false)
      setError(false)
    
    }catch(error){
      setIsLoading(false)
      setError(true)
    
    }
  }, [id])
  useEffect(() => {
      getProduct()
    }, [getProduct])
  return (
      <Helmet title = {product ? product.name : "Chi tiết sản phẩm"} >
            <Breadcrumb crumbs = {crumbs} />
          {product && <div className="container product--detail">
            <ProductSlider product = {product} />
            <ProductContent product = {product}/>
          </div>}
          {isLoading && <Loading />}
          {error && <NotFound />}
      </Helmet>
    
  )
}

export default ProductDetail