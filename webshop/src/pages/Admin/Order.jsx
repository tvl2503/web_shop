import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import agent from '../../service/agent'
import { SUCCESS } from '../../constants/statusCode'
import numberWithVND from '../../utils/numberwithvnd'
import { getDate } from '../../utils/date'

const customTableHead = [
    '',
    'Tên khách hàng',
    'Số điện thoại',
    'Địa chỉ',
    'Tổng tiền',
    'Ngày đặt hàng',
    'Hình thức thanh toán',
    'Trạng thái đơn hàng',
    'Trạng thái',
]
const status = {
    pending : 'Đang xử lý',
    shipping : 'Đang giao hàng',
    success : 'Đã giao hàng',
}
const renderHead = (item, index) => <th key={index}>{item}</th>

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [editOrder, setEditOrder] = useState({})
    const renderBody = (item, index) => (
        <tr key={index} onClick={() => setEditOrder(item)}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.phone}</td>
            <td>{item.address}</td>
            <td>{numberWithVND(item.amount)}</td>
            <td>{getDate(item.createdAt)}</td>
            <td>{item.payment_method === 'cash' ? 'Tiền mặt' : 'Thẻ'}</td>
            <td>{status[item.status_ship]}</td>
            <td>{item.status_payment === 1 ? <p className='color-green'>Đã thanh toán</p>  : <p className='color-red'>Chưa thanh toán</p> }</td>
        </tr>
    )

    
    const getOrder = async () => {
        try {
            const res = await agent.Order.getOrders()
            if(res.code === SUCCESS){
                setOrders(res.result.items)
            }
        } catch (error) {
            setOrders([])
        }
    }
    useEffect(() => {
        getOrder()
      }, [])
  return (
    <>
        <div className="list-order">
            <Table
                headData={customTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={orders}
                renderBody={(item, index) => renderBody(item, index)}
            />
        </div>
    </>
  )
}

export default Order