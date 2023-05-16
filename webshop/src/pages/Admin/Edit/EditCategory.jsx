import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Button from '../../../components/Button'
import agent from '../../../service/agent';
import { SUCCESS } from '../../../constants/statusCode';
import { convertToSlug } from '../../../utils/string';
import Input from '../../../components/Input';
const EditCategory = (props) => {
    const category = props.category
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useSelector(state => state.auth)
    const [data, setData] = useState({
        name: category.name,
      });

    const handleChange = (name) => (e) => {
        const value = e.target.value;
        setData({ ...data, [name]: value });
    };
    const handleSubmit = async () => {
        setIsLoading(true)
        try {
          const res = await agent.Category.updateCategory(category._id, {name : data.name, path : convertToSlug(data.name)});
          if(res.code === SUCCESS){
            toast.success(res.message)
            props.onClick()
          }
          else{
            toast.error(res.message)
          }
        } catch (error) {
          toast.error("Đã có lỗi xảy ra")
          setIsLoading(false)
        }
      };
    return (
        <div className=' categories-add'>
          <Button className = "button-back" onclick={props.onClick}><i className="fas fa-long-arrow-left"></i> {`     `}Quay lại</Button>

                <div className="edit">
                    <Input type = "text" defaultValue={category.name} onChange={handleChange("name")}  />
                    <Button onclick={handleSubmit}>Sửa</Button>
                </div>
        </div>
    )
}

export default EditCategory