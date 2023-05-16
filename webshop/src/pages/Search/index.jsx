import React, { useEffect, useState } from 'react'
import Grid from '../../components/Grid';
import ProductCard from '../../components/ProductCard';
import useQuery from '../../hooks/useQuery'
import agent from '../../service/agent';
import Helmet from "../../components/Helmet"
import "./Search.scss"
import Banner from '../Products/Banner';
import Loading from '../../components/Loading';
import { SUCCESS } from '../../constants/statusCode';
const banner = "https://mcdn.nhanh.vn/store3/97757/bn/Banner_Mule_1400x600.jpg"

const Search = () => {
    let query = useQuery();
    const [products, setProducts] = useState({})
    const [loading, setLoading] = useState(false)
    const getProducts = async () => {
        setLoading(true);
        try{
            const pro = await agent.Product.getProduct({keyword: query.get("q")})
            if(pro.code === SUCCESS)
                setProducts(pro.result.items)
            setLoading(false)
        }catch(err){
            setLoading(false)
            setProducts({})
        }
    }
    
    useEffect(() => {
        getProducts()
    },[query.get("q")])
  return (
    <Helmet title={`Kết quả tìm kiếm: ${query.get("q")}` }>
         <Banner src = {banner}  />
         {!loading &&
            <div className="container search">
                <div className="search__title">
                    <h2>Có ({products.length}) kết quả cho: "{query.get("q")}"</h2>
                </div>
                {
                    products.length > 0 &&

                    <Grid col = {4} mdCol = {3} gap = {30} >
                        {
                            products.map((item, index) => (
                                <ProductCard product = {item} key = {index} />
                            ))
                        }
                    </Grid>
                }
            </div>
         }
        {loading && <Loading />}
    </Helmet>
  )
}

export default Search