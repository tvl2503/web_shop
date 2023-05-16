import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Button from '../../../components/Button'
import { userRequest, publicRequest } from '../../../services/requesMethods'
const EditUser = (props) => {
    const user = props.user
    const [isLoading, setIsLoading] = useState(false)
    const { currentUser } = useSelector(state => state.user)
    const [data, setData] = useState({
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    const handleChange = (name) => (e) => {
        const value = name === "isAdmin"? e.target.checked : e.target.value;
        setData({ ...data, [name]: value });
    };
    const handleSubmit = async () => {
        setIsLoading(true)
        try {
          const res = await publicRequest.put(`/users/${user._id}`,
          {data: data},
          {
            headers: { token : `Bearer ${currentUser.accessToken}`}
           }
         );
          toast.success("Sửa sản phẩm thành công")
          props.onClick()
        } catch (error) {
            console.log(error);
          toast.error("Đã có lỗi xảy ra")
          setIsLoading(false)
        }
      };
    return (
        <div className='container'>
                <div className="edit">
                    <input type = "text" defaultValue={user.username} onChange={handleChange("username")}  />
                    <input type = "text" defaultValue={user.email} onChange={handleChange("email")}  />
                    <div className="input__checkbox">
                    <input type = "checkbox" checked = {user.isAdmin} onClick = {() =>user.isAdmin = !user.isAdmin} onChange={handleChange("isAdmin")}  />
                    <label for="Quyền quản trị">Quyền quản trị</label>
                    </div>
                    

                    <Button onclick={handleSubmit}>Sửa</Button>
                </div>
        </div>
    )
}

export default EditUser