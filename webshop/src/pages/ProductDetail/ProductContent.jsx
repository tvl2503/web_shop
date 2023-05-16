import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button"
import numberWithVND from "../../utils/numberwithvnd";
import { selectUser } from "../../service/auth/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import { addTocart } from "../../service/cart/cartSlice";
import {toast} from 'react-toastify'
const ProductContent = ({product}) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);

  const handleIncrement = () => {
    setQuantity((state) => Number(state) + 1);
  };
  const handleDecrement = () => {
    setQuantity((state) => (state > 1 ? state - 1 : state));
  };
  const handleClick = () => {
    if(user){
      dispatch(addTocart({productId: product._id, quantity, size, price: product.price, name: product.name, img: product.image[0], percentReduce : product.percentReduce }))
      toast.success("Thêm vào giỏ hàng thành công!")
    }
    else{
      toast.warning("Vui lòng đăng nhập!")
    }
  }
  return (
    <div className="product--detail__content">
      <div className="title">
        <h1>{product.name}</h1>
      </div>
      <div className="category">
        <p>
          Danh mục:
          <Link to="/nike"> Nike</Link>
        </p>
      </div>
      <div className="description">
        <div className="description__title">
          Mô tả:
        </div>
        <div className="description__content">
            {product.description}
        </div>
      </div>
      <div className="price">
        <p>{numberWithVND(product.price*(100-product.percentReduce)/100)}</p>
        {product.percentReduce > 0 &&
          <div className="price__old">
            {numberWithVND(product.price)}
          </div>
        }
      </div>
      <div className="size">
        <div className="size__header">SIZE</div>
        <div className="size__list">
          {product.size.map((item, index) => (
            <div
              key={index}
              className={`size__list__item ${item === size ? "active" : ""}`}
            onClick = {() => setSize(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="quantity">
        <div className="quantity__header">Số lượng</div>
        <div className="input--quantity">
          <div className="btn__decrement" onClick={handleDecrement}>
            <i className="fal fa-minus"></i>
          </div>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className="btn__increment" onClick={handleIncrement}>
            <i className="fal fa-plus"></i>
          </div>
        </div>
      </div>
      <Button type = "submit" onclick = {handleClick} disabled = {!size} ><i className="fal fa-cart-plus"></i> Thêm vào giỏ hàng</Button>
    </div>
  );
};

ProductContent.propTypes = {};

export default ProductContent;
