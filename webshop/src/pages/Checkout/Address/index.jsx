import React, { useState } from 'react'
import Input from './../../../components/Input/index';
import Grid from './../../../components/Grid/index';
import Button from './../../../components/Button/index';

const Address = ({address, setAddress}) => {
    const handleChange = (e) => {
        setAddress({...address, [e.target.name] : e.target.value})
    }
  return (
    <div className="order--address">
          <div className="title">
              <p>Thông tin giao hàng</p>
          </div>
        <div className="order--address__add">
            <div className="order--address__add__form">
                <Grid col = {2} gap = {20}>
                    <Input name = {"name"} value = {address.name} label = {"Tên người nhận"} onChange = {handleChange} placeholder = "Tên người nhận" />
                    <Input name = {"phone"} value = {address.phone} onChange = {handleChange} label = {"Số điện thoại"} placeholder = "Số điện thoại" />
                </Grid>
                <Input name = {"address"} label = {"Địa chỉ giao hàng"} onChange = {handleChange} placeholder = "Địa chỉ giao hàng" />
                <Input name = {"note"} onChange = {handleChange} label = {"Ghi chú"} placeholder = "Ghi chú" />
            </div>
        </div>
    </div>
  )
}

export default Address
