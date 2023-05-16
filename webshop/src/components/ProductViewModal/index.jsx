import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {removeProductModal} from './productModalSlice'
import numberWithVND from '../../utils/numberwithvnd'
import Button from '../Button'
import { addTocart } from '../../service/cart/cartSlice';
import {selectUser} from '../../service/auth/authSlice'
import { toast } from 'react-toastify';

import "./ProductViewModal.scss"
const ProductViewModal = () => {
    const dispatch = useDispatch()
  const user = useSelector(selectUser)

    const {product} = useSelector(state => state.productModal)
    const [size, setSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const removeModal = () => {
        dispatch(removeProductModal())
    }
    const handleIncrement = () => {
        setQuantity(state => Number(state) + 1)
    }
    const handleDecrement = () => {
        setQuantity(state => state  > 1 ? state - 1 : state)
    }
    const handleClick = () => {
        if(user){
          dispatch(addTocart({productId: product._id, quantity, size, price: product.price, name: product.name, img: product.image[0], percentReduce : product.percentReduce  }))
          toast.success("Thêm vào giỏ hàng thành công")
        }
        else{
    
        }
      }
    useEffect(() => {
        setSize(null);
        setQuantity(1);
    }, [product])
  return (
    <>
        {
            product && 
            <div className='product-view__modal'>
                <div className="product-view__modal__backdrop" onClick={removeModal} ></div>
                <div className="product-view__modal__content">
                    <div className="close--modal" onClick={removeModal}>
                        <i className="far fa-times"></i>
                    </div>
                    <div className="product-view__modal__content__img">
                        <img src = {product.image[0]} />
                    </div>
                    <div className="product-view__modal__content__main">
                        <div className="title">
                            <h1>
                            {product.name}
                            </h1>
                        </div>
                        <div className="status">
                            <span>Tình trạng: còn hàng</span>
                            
                        </div>
                        <div className="price">
                            {numberWithVND(product.price)}
                        </div>
                        <div className="size">
                            <div className="size__header">SIZE</div>
                            <div className="size__list">
                                {product.size.map((item, index) => (
                                    <div key = {index} className={`size__list__item ${item === size ? 'active': ''}`} onClick = {() => setSize(item)}>{item}</div>
                                ))}
                            </div>
                        </div>
                        <div className="input--quantity">
                            <div className="btn__decrement"  onClick={handleDecrement}>
                            <i className="fal fa-minus"></i>
                            </div>
                            <input type="text" value={quantity} onChange = {(e) => setQuantity(e.target.value)} />
                            <div className="btn__increment" onClick={handleIncrement}>
                                <i className="fal fa-plus"></i>
                            </div>
                        </div>
                        <Button type = "submit" className='btn--add--cart' onclick = {handleClick} disabled = {!size} ><i className="fal fa-cart-plus"></i> Thêm vào giỏ hàng</Button>
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default ProductViewModal