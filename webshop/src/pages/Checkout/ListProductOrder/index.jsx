import React from 'react'
import { useSelector } from 'react-redux'
import "./index.styles.scss";
import Table from '../../../components/Table';
import { Link } from 'react-router-dom';
import numberWithVND from '../../../utils/numberwithvnd';
import { calculateSaleprice } from '../../../utils/price';

const customerTableHead = [
  "",
  "Ảnh",
  "Tên sản phẩm",
  "Đơn giá",
  "Số lượng",
  "Thành tiền",
];
const renderBody = (item, index) => (
  <tr key={index}>
    <td>{index+1}</td>
    <td><img src={item.img} /></td>
    <td> <Link to = {`/product/${item.productId}`}>
             {item.name} <h4>(Size {item.size})</h4>
            </Link></td>
    <td>{numberWithVND(calculateSaleprice(item.price, item.percentReduce))}</td>
    <td>{item.quantity}</td>
    <td>{numberWithVND(calculateSaleprice(item.quantity*item.price, item.percentReduce))}</td>
  </tr>
)
const renderHead = (item, index) => <th key={index}>{item}</th>
const ListProductOrder = () => {
  const cart = useSelector(state => state.cart);
  return (
    <div className='list--product--order'>
      <div className="title">Sản phẩm</div>
      <Table 
       headData={customerTableHead}
       renderHead={(item, index) => renderHead(item, index)}
       bodyData={cart.products}
       renderBody={(item, index) => renderBody(item, index)}
      />
      <div className="total">
        <h4>Tổng thanh toán: {numberWithVND(cart.total)}</h4>
      </div>
    </div>
  )
}

export default ListProductOrder