import React, { useCallback, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import SideBar from '../../components/SideBar'
import Banner from './Banner';
import Grid from "../../components/Grid"
import { filterProduct } from '../../Context/Context';
import ProductCard from '../../components/ProductCard';
import "./Products.scss"
import { useEffect } from 'react';
import Helmet from '../../components/Helmet';
import agent from '../../service/agent';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { SUCCESS } from '../../constants/statusCode';
const banner = "https://mcdn.nhanh.vn/store3/97757/bn/Banner_Mule_1400x600.jpg"


const Products = ({path, brumb, index, id}) => {
  const crumbs = [
    {
      title: brumb,
      href: path
    }
  ]
  const [products, setProducts] = useState({});
  const [rangePrice, setRangePrice] = useState([0, 5000000])
  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(1)
  const handleChangePage = (e) => {
    setPage(e)
  }
  const getProduct = useCallback(async () => {
      try{
        const pro = await agent.Product.getProduct({categoryId : id, range : {property : 'price', gte : rangePrice[0], lt: rangePrice[1]}  ,page : page, page_size : 6})
        if(pro.code === SUCCESS){
          setProducts(pro.result.items)
          setTotalPage(pro.result.total)
        }
      }
      catch(err){
        setProducts({})
      }
  }, [id, rangePrice,page])
  const handleFilterProduct = (value) => {
    setRangePrice(value)
  }
  useEffect(() => {
    getProduct()
  }, [getProduct])
  useEffect(() => {
    setPage(1)
  }, [id])
  return (
    <Helmet title = {brumb}>
    <filterProduct.Provider value = {{ handleFilterProduct, rangePrice}}>
        <Banner src = {banner}  />
        <Breadcrumb crumbs = {crumbs} />
        <div className="container content" >
          <SideBar index = {index}  />
          <div className="content--list--product">
            {products.length > 0 &&
            <>
            <Grid col = {3} mdCol = {2} gap = {20}>
              {
                products.map((item, index) => (
                  <ProductCard key = {index} product = {item} img = {item.image[0]}  />
                ))
              }
            </Grid>
            
          <div className="pagination">
            <Stack spacing={2}>
              <Pagination count={totalPage} color="secondary" onChange={(e) => handleChangePage(e.target.textContent)} />
            </Stack>
          </div>
          </>

            }
          </div>
        </div>
    </filterProduct.Provider>
    </Helmet>
  )
}

export default Products