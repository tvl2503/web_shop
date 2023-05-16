import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import "./SideBar.scss"
import Slider from '@mui/material/Slider';
import numberWithVND from '../../utils/numberwithvnd';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import { useEffect } from 'react';
import { filterProduct } from '../../Context/Context';
const category = [
  {
    title: "Giày Nike",
    path: "/nike"
  },
  {
    title: "Giày Adidas",
    path: "/adidas"
  },
  {
    title: "Giày MLB",
    path: "/mlb"
  },
  {
    title: "Phụ kiện",
    path: "/phu-kien"
  },
]
const theme = createTheme({
  palette: {
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
const SideBar = props => {
  const { handleFilterProduct,rangePrice} = useContext(filterProduct);
  const [hideCate, setHideCate] = useState(false);
  const [hidePrice, setHidePrice] = useState(false);
  const [hideSize, setHideSize] = useState(false);
  const [valuePrice, setValuePrice] = useState(rangePrice);

  useEffect(() => {
    handleFilterProduct(valuePrice);
  }, [valuePrice])

  const handleChange = (event, newValue) => {
    setValuePrice(newValue);
  };
  return (
    <div className='sidebar'>
      <div className="category">
        <div className={"category__title "}>   
          <span>Danh mục sản phẩm</span>
          <span className='icon--control' onClick={() => setHideCate(!hideCate)} >
            <i className={`fas fa-${hideCate? 'plus' : 'minus'}`}></i>
          </span>
        </div>
        <div className="category__list">
          {
            !hideCate && category.map((item, index) => (
              <div key = {index} className="category__list__item">
                <Link to = {item.path} className = {`${index === props.index ? 'active': ''} ${props.index === -1 ? 'active' : ''}`}>
                {item.title}
                <input type="checkbox"   checked={index === props.index} />
                  <span className='checkmark'></span>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
      <div className="price--range">
          <div className={`price--range__title ${hidePrice? 'active' : ''}`}>
            <span>Giá</span>
            <span className='icon--control' onClick={() => setHidePrice(!hidePrice)} >
              <i className={`fas fa-${hidePrice? 'plus' : 'minus'}`}></i>
            </span>
          </div>
           { !hidePrice && 
          <div className="price--range__input">
            <ThemeProvider theme = {theme} >

              <Slider 
                  min = {0}
                  max = {5000000}
                  value={valuePrice}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  color= "secondary"
                  />
            </ThemeProvider>
            <div className="price--range__input__text">
              <span>{numberWithVND(valuePrice[0])}</span>
              -
              <span>{numberWithVND(valuePrice[1])}</span>
            </div>
          </div>
          }
      </div>
      {/* <div className="price--range size--checkbox">
          <div className={`price--range__title ${hideSize? 'active' : ''}`}>
            <span>Kích thước</span>
            <span className='icon--control' onClick={() => setHideSize(!hideSize)} >
              <i className={`fas fa-${hideSize? 'plus' : 'minus'}`}></i>
            </span>
          </div>
           { !hideSize && 
          <div className="size--checkbox__list">
            <FormGroup>

            
              {size.map((item, index) => (
                <FormControlLabel key = {index} control={<Checkbox sx={{
                  color: grey[500],
                  '&.Mui-checked': {
                    color: red[600],
                  },
                }} />} label={item} />
              ))}
           </FormGroup>
          </div>
        }
      </div> */}
    </div>
  )
}

SideBar.propTypes = {}

export default SideBar