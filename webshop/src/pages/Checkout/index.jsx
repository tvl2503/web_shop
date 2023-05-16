import React, { useState } from 'react'
import './Checkout.scss'
import Address from './Address'
import { useSelector } from 'react-redux'
import ListProductOrder from './ListProductOrder'
import { FormControl, FormControlLabel, Radio, RadioGroup  } from '@mui/material'
import axiosClient from './../../service/axiosClient';
import { SUCCESS } from '../../constants/statusCode'
import Loading from './../../components/Loading/index';
import { useNavigate } from 'react-router-dom'

const initialValues = {
  name : "",
  phone: "",
  address: "",
  note : ""
}
const Checkout = () => {
    const user = useSelector(state => state.auth?.user)
    const [address, setAddress] = useState({...initialValues, name : user?.fullname, phone : user?.phone});
    const [isLoading, setIsLoading]  = useState(false);
    const navigate = useNavigate();
    const [methodPayment, setMethodPayment] = useState('cash');
    const handleChange = (event) => {
      setMethodPayment(event.target.value);
    };
    const handleSubmit = async () => {
      setIsLoading(true)
      try {
        const res = await axiosClient.post("/checkout", {...address, type : methodPayment})
        if(res.data.code === SUCCESS){
          if(methodPayment === "card"){
            window.location.href = res.data.result;
          }
          else{
            const id =  res.data.result._id
            navigate(`/checkout-success/${id}`)
          }
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.log(error);
      }
    }
  return (
    <div className='container'>
      <div className="order">
        <Address address = {address} setAddress = {setAddress} />
        <ListProductOrder />
        <div className="order--method--payment">
          <div className="title">
              Phương thức thanh toán
          </div>
          <FormControl>
            <RadioGroup
              value = {methodPayment}
              onChange={handleChange}
            >
              <FormControlLabel value="cash" control={<Radio />} label="Thanh toán khi nhận hàng" />
              <FormControlLabel value="card" control={<Radio />} label="Thanh toán trực tuyến" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="order--payment">
          <button disabled = {isLoading} onClick={handleSubmit} >{ isLoading ? <div className="loader"></div> : 'Đặt hàng'}</button>
        </div>
        
      </div>
    </div>
  )
}

export default Checkout