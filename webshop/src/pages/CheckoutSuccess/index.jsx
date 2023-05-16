import React, { useCallback, useEffect, useState } from 'react'

import './index.styles.scss';
import Helmet from '../../components/Helmet';
import agent from '../../service/agent';
import { Link, useParams } from 'react-router-dom';
import { SUCCESS } from '../../constants/statusCode';
import Table from '../../components/Table';
import { calculateSaleprice } from '../../utils/price';
import numberWithVND from '../../utils/numberwithvnd';
import Loading from '../../components/Loading';

const customerTableHead = [
  "",
  "Ảnh",
  "Tên sản phẩm",
  "Đơn giá",
  "Số lượng",
];
const renderBody = (item, index) => (
  <tr key={index}>
    <td>{index+1}</td>
    <td><img src={item.product.image[0]} /></td>
    <td> <Link to = {`/product/${item.product._id}`}>
             {item.product.name} <h4>(Size {item.size})</h4>
            </Link></td>
    <td>{numberWithVND(calculateSaleprice(item.product.price, item.product.percentReduce))}</td>
    <td>{item.quantity}</td>
  </tr>
)
const renderHead = (item, index) => <th key={index}>{item}</th>
const CheckoutSuccess = () => {
  const {id} = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getOrder = useCallback(async () => {
    setIsLoading(true)
    try{
      const pr = await agent.Order.getOrderById(id)
      if(pr.code === SUCCESS)
        setOrder(pr.result)
      setIsLoading(false)
      setError(false)
    
    }catch(error){
      setIsLoading(false)
      setError(true)
    
    }
  }, [id])
  useEffect(() => {
      getOrder()
    }, [getOrder])
  return (
    <Helmet title='Đặt hàng thành công'>
       {order && !isLoading && <div className='container'>
            <div className="checkout__success">
                <div className="title">
                  <h4>Đặt hàng thành công</h4>
                </div>
                <div className="status_payment">
                  <h4> Trạng thái thanh toán: <span>{order.status_payment === 1 ?'Đã thanh toán' : "Chưa Thanh Toán"}</span></h4>
                </div>
                <Table 
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={order.products}
                renderBody={(item, index) => renderBody(item, index)}
                />
                <div className="total">
                  Tổng tiền: {order.amount}
                </div>
            </div>
        </div>}
      {isLoading && <Loading />}
    </Helmet>
  )
}

export default CheckoutSuccess