import React, { useCallback, useEffect } from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from '../../pages/Home'
import Products from '../../pages/Products'
import NotFound from '../../pages/NotFound'
import Login from '../../pages/User/Login'
import Register from '../../pages/User/Register'
import Footer from './Footer'
import Header from './Header'
import Search from '../../pages/Search'
import Contact from '../../pages/Contact'
import ProductViewModal from '../ProductViewModal'
import Cart from '../../pages/Cart'
import Product from '../../pages/Product'
import ProductDetail from '../../pages/ProductDetail'
import { useDispatch, useSelector } from 'react-redux'
import { SUCCESS } from '../../constants/statusCode'
import agent from '../../service/agent'
import { setCategory } from '../../service/category'
import Admin from '../../pages/Admin'
import ProductAdmin from '../../pages/Admin/Product'
import CategoryAdmin from '../../pages/Admin/Categories'
import Checkout from '../../pages/Checkout'
import CheckoutSuccess from '../../pages/CheckoutSuccess'
const Layout = () => {
  const category = useSelector(state => state.category) || [];
  const cart = useSelector(state => state.cart);
  const dispatch =  useDispatch()
  const getCate = useCallback(async () => {
    try{
      const cate = await agent.Category.getAllCategory();
      if(cate?.code === SUCCESS){
        dispatch(setCategory(cate.result))
      }
    }
    catch(err){
      dispatch(setCategory([]))
    }
  }, [])
  useEffect(() => {
    getCate()
  }, [])
  // const {user} = useSelector(state => state.auth)
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path = "/" element={<Home />} />
            {category.map((item, index) => (
              <Route 
                key = {index} 
                path = {item.path} 
                element={<Products  path = {`/${item.path}`} id = {item._id} brumb = {item.name} index = {index} />} />
            ))}
            <Route path = "contact" element ={<Contact />} />
            <Route path = "cart" element ={<Cart />} />
            <Route path='product'>
              <Route index = {true} element={<Product />} />
              <Route path = ":id" element = {<ProductDetail />} />
            </Route> 
            <Route path = "user">
              <Route index = {true} element = {<NotFound/>} />
              <Route path = "login" element = {<Login />} />
              <Route path = "register" element = {<Register />} />
            </Route>
            <Route path = "admin">
                <Route index = {true} element = {<Admin/>} />
                <Route path='product' element = {<ProductAdmin />} />
                <Route path='category' element = {<CategoryAdmin />} />
            </Route>
            <Route path = "search" element = {<Search />} />
            <Route path = "*" element = {<NotFound/>} />
            <Route path='checkout' element = {<Checkout />} />
            <Route path='checkout-success/:id' element = {<CheckoutSuccess />} />
        </Routes>
        <Footer />
        <ProductViewModal />
    </BrowserRouter>
  )
}

export default Layout