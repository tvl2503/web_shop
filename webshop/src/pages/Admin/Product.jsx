import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Input from '../../components/Input'
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Loading';
import Table from '../../components/Table';
import EditProduct from './Edit/EditProduct';
// import { isNumber } from '../../utils/input';
import agent from '../../service/agent';
import { SUCCESS } from '../../constants/statusCode';
import UploadImage from '../../components/UploadImage/input';
const customerTableHead = [
  '',
  'Ảnh',
  'Tên',
  'Danh mục',
  'Giá bán',
  'Giảm',
  'Sửa',
  'Xóa'
]
const renderHead = (item, index) => <th key={index}>{item}</th>

const Products = () => {
  const deleteProduct = async (id) => {
    try{
      const res = await agent.Product.deleteProduct(id);
      getProducts()
      toast.success(res.data)
    }catch(err){
      console.log(err);
    }
  }

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td><img src={item.image[0]} /></td>
      <td>{item.name}</td>
      <td>{item.category.name}</td>
      <td>{item.price}</td>
      <td>{item.percentReduce}%</td>
      <td style={{cursor: 'pointer'}} onClick={() => setEditProduct(item)}>Sửa</td>
      <td style={{cursor: 'pointer'}} onClick={() => deleteProduct(item._id)}  ><i className="fal fa-times"></i></td>
    </tr>
  )
  const { user } = useSelector(state => state.auth)
  const [isAdd, setIsAdd] = useState(false)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [editProduct, setEditProduct] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    percentReduce: 0,
    quantity : 0
  });
  const [images, setImages] = useState([])
  const getProducts = async () => {
    try {
      const res = await agent.Product.getProduct({})
      setProducts(res.result.items)
    }
    catch (err) {
      setProducts([])
    }
  }
  const getCategory = async () => {
    try {
      const res = await agent.Category.getAllCategory()
      if(res.code === SUCCESS){
        setCategories(res.result)
        setData({ ...data, category: res.result[0]._id });
      }
    } catch (error) {
      alert("Looxi")
    }
  }
  useEffect(() => {
    getProducts()
    getCategory()
  }, [])
  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
  };
  const handleSubmit = async () => {
    setIsLoading(true)
      try {
        const body = {
          name : data.name,
          description : data.description,
          category : data.category,
          price : data.price,
          image : images,
          percentReduce : data.percentReduce,
          quantity : data.quantity
        }
        const res = await agent.Product.createProduct(body);
        if(res.code === SUCCESS){

          toast.success(res.message)
          getProducts()
          setIsAdd(!isAdd)
        }
        else{
          toast.error(res.message)
        }
        setIsLoading(false)
      } catch (error) {
        toast.error("Error")
        setIsLoading(false)
      }
  };
  return (
    <div>

        {Object.values(editProduct).length === 0 && !isAdd && <div className="list--products">
          <Button onclick = {()=> setIsAdd(!isAdd)}>Thêm +</Button>
          <Table
            headData={customerTableHead}
            renderHead={(item, index) => renderHead(item, index)}
            bodyData={products}
            renderBody={(item, index) => renderBody(item, index)}
          />
        </div>}
        {
          Object.values(editProduct).length === 0 && isAdd && 
        <div className='container addproduct'>
          <Button className = "button-back" onclick={() => {setIsAdd(false)}}><i className="fas fa-long-arrow-left"></i> {`     `}Quay lại</Button>
          <Input label = {"Tên sản phẩm"} type="text" placeholder='Tên sản Phẩm' onChange={handleChange("name")} />
          <select onChange={handleChange("category")}>
            {categories.length > 0 && categories.map((item, index) => (
              <option key={index} value={item._id} >{item.name}</option>
            ))}
          </select>

          <UploadImage images = {images} setImages = {setImages} />
          <Input type="text" label = {"Giá bán"} placeholder='Giá bán' onChange={handleChange("price")} />
          <Input type="number" label = {"Giảm giá (%)"} placeholder='Giảm giá(%)' onChange={handleChange("percentReduce")} />
          <Input type="number" label = {"Số lượng"} placeholder='Số lượng' onChange={handleChange("quantity")} />
          
          {!isLoading && <Button onclick={handleSubmit}>Thêm</Button>}
          {isLoading && <Loading />}

        </div>
        }
        {
         Object.values(editProduct).length !== 0 && 
          <EditProduct products = {editProduct} onClick = {() =>{ 
            setEditProduct({})
            getProducts()
          
          }
          
          } />
        }


    </div>
  )
}

export default Products