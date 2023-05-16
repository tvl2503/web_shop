import React, { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Table from '../../components/Table'
import { toast } from 'react-toastify'
import EditCategory from './Edit/EditCategory'
import agent from '../../service/agent'
import { SUCCESS } from '../../constants/statusCode'
import { convertToSlug } from '../../utils/string'

const customerTableHead = [
  '',
  'Tên Danh Mục',
  'Path',
  'Sửa',
  'Xóa'
]
const renderHead = (item, index) => <th key={index}>{item}</th>


const Categories = () => {

  const deleteProduct = async (id) => {
    try{
      const res = await agent.Category.deleteCategory(id);
      if(res.code === SUCCESS){
        toast.success(res.message)
        getCategory()
      }
      else
        toast.error(res.message)
    }catch(err){
      console.log(err);
      toast.error("Không thể xóa danh mục!")
    }
  }
    const renderBody = (item, index) => (
      <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.path}</td>
          <td style={{cursor : 'pointer'}} onClick={() => setEditCategory(item)}>Sửa</td>
          <td style={{cursor : 'pointer'}}  onClick={() => deleteProduct(item._id)} ><i className="fal fa-times"></i></td>
      </tr>
    )
    const [categories, setCategories] = useState([])
    const { user } = useSelector(state => state.auth)
    const [category, setCategory] = useState('')
    const [editCategory, setEditCategory] = useState({})
    const [isAdd, setIsAdd] = useState(false)
    const getCategory = async () => {
    try {
      const res = await agent.Category.getAllCategory()
      if(res.code === SUCCESS)
        setCategories(res.result)
    } catch (error) {
      alert("Looxi")
      setCategories([])
    }
  }
    useEffect(() => {
    getCategory()
    }, [])
  const handleOnchange = (e) => { 
    setCategory(e.target.value)
  }
  const handleOnClick  = async () => {
    try{ 
       const res =  await agent.Category.addCategory({name: category, path : convertToSlug(category)})
       if(res.code === SUCCESS){
         toast.success(res.message)
         setIsAdd(!isAdd)
         getCategory()
       }
       else{
        toast.error(res.message)

       }
    }catch(err){
      toast.error("Error")
      console.log(err);
    }
  }
    // 
  return (
    <div className='container categories'>
     
     {Object.values(editCategory).length === 0 &&  !isAdd &&
     
        <div className="categories-list">
        <Button onclick = {()=> setIsAdd(!isAdd)}>+</Button>
        <Table 
            headData={customerTableHead}
            renderHead={(item, index) => renderHead(item, index)}
            bodyData={categories}
            renderBody={(item, index) => renderBody(item, index)}
      />
        </div> 
      }
      {
         Object.values(editCategory).length === 0 &&   isAdd && 
        <div className="categories-add">
          <Button className = "button-back" onclick={() => {setIsAdd(false)}}><i className="fas fa-long-arrow-left"></i> {`     `}Quay lại</Button>
          <Input placeholder = "Danh mục sản phẩm" type = "text" onChange = {handleOnchange} />
          <Button onclick={handleOnClick} >Thêm</Button>
        </div>
      }
      {
         Object.values(editCategory).length !== 0 && 
          <EditCategory category = {editCategory} onClick = {() =>{ 
            setEditCategory({})
            getCategory()
          
          }
          
          } />
        }

    </div>
  )
}

export default Categories