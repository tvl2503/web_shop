import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import Grid from '../../components/Grid'
import Helmet from '../../components/Helmet'
import "./Contact.scss"
const crumbs = [
    {
        title: "Liên hệ",
        path: "contact"
    }
]
const info = [
    {
        icon: "far fa-map-marker",
        name: "Địa chỉ",
        des: "Ngách 45/68 Triều khúc, Thanh Trì, Hà Nội"
    },
    {
        icon: "far fa-phone-alt",
        name: "Điện thoại",
        des: "0392280138"
    },
    {
        icon: "far fa-envelope",
        name: "Email",
        des: "volinhh1804@gmail.com"
    }
]
const Contact = () => {
  return (
    <Helmet title = "Liên hệ">
    <div className="contact">
        <div className='container'>
            <Breadcrumb crumbs = {crumbs} />
            <Grid col = {2} mdCol = {1} >
                <div className="contact__left">
                    <h2 className="contact__left__title">
                        <span>Gửi tin nhắn cho chúng tôi</span>
                    </h2>
                    <div className="contact__left__form">
                        <form action="">
                            <input type="text" placeholder='Họ Tên*' name = "name" />
                            <input type="text" placeholder='Email*' name = "email" />
                            <input type="text" placeholder='Điện Thoại*' name = "phone" />
                            <input type="text" placeholder='Địa chỉ*' name = "address" />
                            <textarea placeholder='Nhập nội dung*' name = "content">

                            </textarea>
                            <button type='submit'>
                                Gửi liên hệ
                            </button>
                        </form>
                    </div>
                </div>
                <div className="contact__info">
                    {info.map((item, index) => (
                        <div key = {index} className="contact__info__item">
                            <div className="contact__info__item__icon">
                                <i className={item.icon}></i>
                            </div>
                            <div className="contact__info__item__content">
                                <h2>{item.name}</h2>
                                <span>{item.des}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Grid>
            <div className="contact__map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m8!1m3!1d682.7459469343371!2d105.79948282210427!3d20.982621725211377!3m2!1i1024!2i768!4f13.1!4m6!3e2!4m0!4m3!3m2!1d20.9823983!2d105.79936579999999!5e0!3m2!1svi!2s!4v1656339547858!5m2!1svi!2s" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title = "myFrame"></iframe>
            </div>
        </div>
    </div>
    </Helmet>
  )
}

export default Contact