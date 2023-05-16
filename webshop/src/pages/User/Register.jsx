import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Helmet from '../../components/Helmet'
import { isValidEmail, isValidPassword } from '../../utils/validate'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { register, selectErrors, selectIsLoading, selectUser } from '../../service/auth/authSlice'
import "./User.scss"

const Register = () => {
    const user = useSelector(selectUser)
    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            navigate("/")
        }
    }, [user])
    const initialValues = {fullName: "", email: "", password: "", phone: ""}
    const dispatch = useDispatch()
    const error = useSelector(selectErrors);
    const inProgress = useSelector(selectIsLoading);
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({fullName: "", email: "", password: "", phone: ""})

    const handleChange = ({ currentTarget: input }) => {
        setFormValues({...formValues,[input.name]: input.value })
    }
    const hanldeBlur = (e) => {
        const name = e.target.name
        const error = validate(formValues)
        if(name  === "email"){
            setFormErrors({...formErrors, [name] : error.email})
        }
        else if(name === "fullName"){
            setFormErrors({...formErrors, [name] : error.fullName})

        }
        else if(name === "password"){
            setFormErrors({...formErrors, [name] : error.password})

        }
        else if(name === "phone"){
            setFormErrors({...formErrors, [name] : error.phone})

        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        
        dispatch(register(formValues))
        // if(!error){
        //     toast.success("Đăng ký thành công!")
        // }
    }

    const validate = (values) => {
        const errors = {fullName: "", email: "", password: "", phone: ""};
        if(!values.fullName){
            errors.fullName = "Vui lòng nhập họ và tên";
        }
        if(!values.email){
            errors.email = "Vui lòng nhập email";
        }
        else if(!isValidEmail(values.email)){
            errors.email = "Vui lòng nhập đúng email!"
        }
        if(!values.password){
            errors.password = "Vui lòng nhập password";
        }
        else if(!isValidPassword(values.password)){
            errors.password = "Mật khẩu ít nhất 6 ký tự!"

        }
        if(!values.phone){
            errors.phone = "Vui lòng nhập số điện thoại";
        }
        return errors
    }

  return (
    <Helmet title = "Đăng ký" >

    <div className='login'>
               <div className="login__title">
                   <h1>Đăng Ký</h1>
               </div>
               <div className="login__content">
                   <div className="login__content__form">
                        {error && <p>{error}</p>}
                       <form onSubmit={handleSubmit}>
                           <div className="field">
                                <input type="text" 
                                name = "fullName" 
                                value={formValues.fullName} 
                                placeholder='Họ và Tên'  
                                onBlur = {(e) => hanldeBlur(e)}
                                onChange={handleChange}  />  
                                {formErrors.fullName && <p>{formErrors.fullName}</p>}
                           </div>
                           <div className="field">
                                <input type="text" placeholder='Email' name = "email" value={formValues.email}  
                                onBlur = {(e) => hanldeBlur(e)}  onChange={handleChange} />
                                {formErrors.email && <p>{formErrors.email}</p>}
                            </div>
                           <div className="field">
                                 <input type="password" placeholder='Mật khẩu' name = "password" value={formValues.password} 
                                 onBlur = {(e) => hanldeBlur(e)}  onChange={handleChange}  />
                                 {formErrors.password && <p>{formErrors.password}</p>}
                            </div>
                           <div className="field">
                                <input type="text" name = "phone"  placeholder='Điện Thoại' 
                                onBlur = {(e) => hanldeBlur(e)} onChange={handleChange}  />
                                {formErrors.phone && <p>{formErrors.phone}</p>}
                            </div>
                           <Button type = "submit" 
                           disabled = { !isValidEmail(formValues.email) 
                                        || !isValidPassword(formValues.password) 
                                        || !formValues.phone 
                                        || !formValues.fullName}
                             >{inProgress? <div className="loader"></div> : 'Đăng ký'}</Button>
                       </form>
                       <div className="forgot--password">
                           <Link to = "/user/login"><i className="fal fa-arrow-left"></i>Đã có tài khoản</Link>
                       </div>
                   </div>
            </div>
    </div>
    </Helmet>
  )
}

export default Register