import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Button from '../../../components/Button'
import agent from '../../../service/agent';
import { SUCCESS } from '../../../constants/statusCode';
import Input from '../../../components/Input';
import Loading from '../../../components/Loading';
import UploadImage from '../../../components/UploadImage/input';
const EditProduct = (props) => {
    const product = props.products
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [data, setData] = useState({
        name: product.name,
        description: product.description,
        category: product.category._id,
        price: product.price,
        percentReduce: product.percentReduce,
        quantity : product.quantity
      });
    const [images, setImages] = useState(product.image || [])
    const getCategory = async () => {
        try {
          const res = await agent.Category.getAllCategory();
          if(res.code === SUCCESS)
          {
            setCategories(res.result)
            setData({ ...data, category: res.result[0]._id });
          }
        } catch (error) {
          alert("Looxi")
        }
      }
      const handleChange = (name) => (e) => {
        const value = e.target.value;
        setData({ ...data, [name]: value });
      };
      useEffect(() => {
        getCategory()
      
      }, [])
    
      const handleSubmit = async () => {
        setIsLoading(true)
        console.log(data);
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
          const res = agent.Product.updateProduct(product._id, body)
          toast.success("Sửa sản phẩm thành công")
          props.onClick()
        } catch (error) {
          toast.error("Đã có lỗi xảy ra")
          setIsLoading(false)
        }
      };
    return (
        <div className='container addproduct'>
          <Button className = "button-back" onclick={props.onClick}><i className="fas fa-long-arrow-left"></i> {`     `}Quay lại</Button>
          <div className="edit">
              <Input type = "text" defaultValue={product.name} onChange={handleChange("name")}  />
              <Input type = "text" defaultValue={product.description} onChange={handleChange("description")}   />
            
              <select  onChange={handleChange("category")}>
                  {categories.length > 0 && categories.map((item, index) => (
                  <option key={index} value={item._id} >{item.name}</option>
                  ))}
              </select>
              <UploadImage images = {images} setImages = {setImages} />
              <Input type = "number" defaultValue={product.price} onChange={handleChange("price")}  />
              <Input type = "number" defaultValue={product.percentReduce} onChange={handleChange("percentReduce")}  />
              <Input type = "number" defaultValue={product.quantity} onChange={handleChange("quantity")}  />
              {!isLoading && <Button onclick={handleSubmit}>Sửa</Button>}
              {isLoading && <Loading />}
          </div>
        </div>
    )
}

export default EditProduct