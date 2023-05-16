import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Input from '../../components/Input'
import { publicRequest, userRequest } from '../../services/requesMethods'
import Button from '../../components/Button'
import Table from '../../components/Table'
import { toast } from 'react-toastify'
import EditUser from './Edit/EditUser'
import { isValidEmail } from '../../utils/input'

const customerTableHead = [
  '',
  'Ảnh',
  'Tên tài khoản',
  'Họ và tên',
  'Email',
  'Quyền quản trị',
  'Sửa',
  'Xóa'
]
const renderHead = (item, index) => <th key={index}>{item}</th>

const User = () => {
  const deleteUser = async (id) => {
    try {
      const res = await publicRequest.delete(`/users/${id}`,
      {
        headers: { token : `Bearer ${currentUser.accessToken}`}
       }
      );
      getUsers()
      toast.success(res.data)
    } catch (err) {
      console.log(err);
    }
  }
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td> <img src={item.img} alt="" /></td>
      <td>{item.username}</td>
      <td>{item.fullname}</td>
      <td>{item.email}</td>
      <td>{item.isAdmin ? 'Có' : "Không"}</td>
      <td onClick={() => setEditUser(item)} >Sửa</td>
      <td onClick={() => deleteUser(item._id)}><i className="fal fa-times"></i></td>
    </tr>
  )
  const [users, setUsers] = useState([])
  const { currentUser } = useSelector(state => state.user)
  const [isAdd, setIsAdd] = useState(false)
  const [editUser, setEditUser] = useState({})
  const [data, setData] = useState({
    username: "",
    email: "",
    isAdmin: false,
    password: "",
    confirmpassword: "",

  });

  const getUsers = async () => {
    try {
      const res = await publicRequest.get("/users",{
        headers: { token : `Bearer ${currentUser.accessToken}`}
       })
      setUsers(res.data)
    } catch (error) {
      alert("Looxi")
    }
  }
  useEffect(() => {
    getUsers()
  }, [])
  const handleOnchange = name => (e) => {
    const value = e.target.value;
    setData({ ...data, [name]: value });

  }
  const handleOnClick = async () => {
    console.log(data);
    if (data.password !== data.confirmpassword) {
      toast.error("Mật khẩu phải giống nhau")

    }
    else if (!isValidEmail(data.email)) {
      toast.error("Email không chính xác")
    }
    else {
      try {

        const res = await publicRequest.post("/auth/register", { username: data.username, email: data.email, password: data.password },
        {
          headers: { token : `Bearer ${currentUser.accessToken}`}
         }
        )
        toast.success("Thêm thành công")
        getUsers()
      } catch (err) {
        if (err.response.data.username)
          toast.error("Tên đăng nhập đã có")
        else if (err.response.data.email)
          toast.error("Email đã có")
      }

    }
  }
  // 
  return (
    <div className='container categories'>

      {Object.values(editUser).length === 0 && !isAdd &&
        <div className="categories-list">
          <Button onclick={() => setIsAdd(!isAdd)}>+</Button>
          <Table
            headData={customerTableHead}
            renderHead={(item, index) => renderHead(item, index)}
            bodyData={users}
            renderBody={(item, index) => renderBody(item, index)}
          />
        </div>
      }
      {
        Object.values(editUser).length === 0 && isAdd &&
        <div className="categories-add">
          <Input placeholder="Tên đăng nhập" type="text" onChange={handleOnchange("username")} />
          <Input placeholder="Email" type="text" onChange={handleOnchange("email")} />
          <Input placeholder="Mật khẩu" type="text" onChange={handleOnchange("password")} />
          <Input placeholder="Xác nhận mật khẩu" type="text" onChange={handleOnchange("confirmpassword")} />
          <Button onclick={handleOnClick} >Thêm</Button>
        </div>
      }
      {
        Object.values(editUser).length !== 0 &&
        <EditUser user={editUser} onClick={() => {
          setEditUser({})
          getUsers()
        }

        } />
      }

    </div>
  )
}

export default User