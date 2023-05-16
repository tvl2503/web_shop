import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./User.scss"
import { isValidEmail, isValidPassword } from '../../utils/validate';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import Helmet from '../../components/Helmet'
import Button from '../../components/Button'

import { login, logout, selectErrors, selectIsLoading, selectUser } from '../../service/auth/authSlice';
import { getGoogleUrl } from '../../utils/getGoogleUrl';
const Login = () => {
    const initialValues = { email: "", password: ""}
    const dispatch = useDispatch();
    const error = useSelector(selectErrors);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/';
    const inProgress = useSelector(selectIsLoading);
    const user = useSelector(selectUser)
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({ email: "", password: ""})
    const handleChange = ({ currentTarget: input }) => {
        setFormValues({...formValues,[input.name]: input.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(login(formValues))
    
  
    }
    const hanldeBlur = (e) => {
        const name = e.target.name
        const error = validate(formValues)
        if(name  === "email"){
            setFormErrors({...formErrors, [name] : error.email})
        }
        else if(name === "password"){
            setFormErrors({...formErrors, [name] : error.password})

        }
    }
    const validate = (values) => {
        const errors = { email: "", password: ""}
        if(!values.email){
            errors.email = "Vui lòng nhập email!"
        }
        else if(!isValidEmail(values.email)){
            errors.email = "Vui lòng nhập đúng email!"
        }
        if(!values.password){
            errors.password = "Vui lòng nhập mật khẩu!"
        }
        else if(!isValidPassword(values.password)){
            errors.password = "Mật khẩu ít nhất 6 ký tự!"

        }
        
        return errors
    }
    useEffect(() => {
        if(user){
            navigate("/")
        }
        dispatch(logout)
    }, [user, error])
  return (
    <Helmet title = "Đăng nhập">

    <div className='login'>
               <div className="login__title">
                   <h1>Đăng nhập</h1>
               </div>
               <div className="login__content">

                   <div className="login__content__form">
                        {error && <p>{error}</p>}
                       <form onSubmit={handleSubmit} >
                        <div className="field">
                           <input type="text" placeholder='Email' onBlur={(e) => hanldeBlur(e)}
                            name = "email" value={formValues.email} onChange={handleChange} />
                           {formErrors.email && <p>{formErrors.email}</p>}
                        </div>
                        <div className="field">
                           <input type="password" placeholder='Mật khẩu' onBlur={(e) => hanldeBlur(e)}
                            name = "password"  value={formValues.password}  onChange={handleChange} />
                           {formErrors.password && <p>{formErrors.password}</p>}

                        </div>
                           <Button type = "submit"  disabled = { !isValidEmail(formValues.email) || !isValidPassword(formValues.password)}>
                            {inProgress? <div className="loader"></div> : 'Đăng nhập'}
                            </Button >
                      
                       </form>
                       <div className="forgot--password">
                           <Link to = "/forgot--password">Quên mật khẩu?</Link>
                       </div>
                       <div className="forgot--password">
                           <Link to = "/user/register">Đăng ký</Link>
                       </div>
                   </div>
                   <div className="divider">
                    <span>Hoặc</span>
                   </div>
                   <div className="login-social">
                    <Link to = "/user/login">
                        <i className="fab fa-facebook"></i>
                        <span>Đăng nhập bằng tài khoản facebook</span>
                    </Link>
                   </div>
                   <div className="login-social login-google">
                    <Link to = {getGoogleUrl(from)}>
                        <i className="fab fa-google"></i>
                        <span>Đăng nhập bằng tài khoản gmail</span>
                    </Link>
                   </div>
            </div>
    </div>
    </Helmet>
  )
}

export default Login


