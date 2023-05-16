import React, {useCallback,useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, logout } from '../../../service/auth/authSlice'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import agent from '../../../service/agent';
import { remove, getToCart } from '../../../service/cart/cartSlice';
import { SUCCESS } from '../../../constants/statusCode';
const HeaderTop = () => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [products, setProducts] = useState({});
    const [keyword, setKeyword] = useState('')
    const handeChange = (e) => {
        setKeyword(e.target.value)
  
    }
    const handleSearch = useCallback(
        async () => {
          let product = []
          if(keyword !== '')
          {
            try{
                product = await agent.Product.getProduct({keyword, page: 1, page_size: 8})
                if(product.code === SUCCESS)
                    setProducts(product.result.items)
            }catch(err){
                setProducts({})
            }

          }
          else{
            setProducts({})
          }
        }, [keyword]
      );
    const getCart = useCallback(() => {
        if(user) dispatch(getToCart())
    }, [user])
    const onClickProduct = (url) => {
        if(keyword !== ''){
            setKeyword('')
            navigate(url)
        }
    }
    useEffect(() => {
        handleSearch()
    }, [handleSearch])
    useEffect(() => {
        getCart()
    },[getCart])
    const handleSumbit = () => {
        navigate('search?key='+keyword)
    }
    const handleLogout = () => {
        dispatch(logout())
        dispatch(remove())
        navigate('/user/login')
        toast.success("Đăng xuất thành công!")
    }
  return (
    
    <div className="header__top">
            <div className="header__top__info">
                <div className="header__top__info__email">
                    <p>Email:</p>
                    <span>volinhh1804@gmail.com</span>
                </div>
                <div className="header__top__info__hotline">
                    <p>Hotline:</p>
                    <span>0392280138</span>
                </div>
            </div>
            <div className="header__top__search">
                <form action="" onSubmit={handleSumbit}>
                    <button type='submit'>
                        <i className="fas fa-search"></i>
                    </button>
                    <input type="text" name = "q" onChange={handeChange} value = {keyword} placeholder='Tìm kiếm sản phẩm' />
                </form>
                
                    {products.length > 0 &&
                    <div className="header__top__search__product">
                        {products.map((item, index) => (
                                <div className="product" key = {index} onClick = {() => onClickProduct(`product/${item._id}`)}>
                                    <div className="img">
                                        <img src = {item.image[0]} />
                                    </div>
                                    <div className="content">
                                        <div className="name">{item.name}</div>
                                        <div className="price">{item.price}</div>
                                    </div>
                                </div>
                        ))
                        }
                        </div>
                    }
                
            </div>
            <div className="header__top__user">
                {
                    !user && <>
                   
                        <Link to = "/user/login">
                            <div className="header__top__user__item">
                                Đăng nhập
                            </div>
                        </Link>
                        
                        <Link to = "/user/register">
                            <div className="header__top__user__item">
                                Đăng ký
                            </div>
                        </Link>
                    </>
                }
                {
                    user &&
                    <>
                        <p>Xin chào, {user.fullname}</p>
                        <div className="logout" onClick={handleLogout}>Đăng xuất</div>
                    </> 
                }   
            </div>
        </div>
  )
}

export default HeaderTop