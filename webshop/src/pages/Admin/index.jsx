import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Products from './Product'
import Categories from "./Categories"
import './admin.scss'
import NotFound from '../NotFound'
import Order from './Order'
// import User from './User'
const data = [
    {
        icon: "fal fa-home",
        title: "Dashboard",
        path : "/admin"

    },
    {
        icon: "fal fa-shopping-bag",
        title: "Sản phẩm",
        path : "/admin"
    },
    {
        icon: "fal fa-bars",
        title: "Danh mục",
        path : "/admin"
    },
    {
        icon: "fas fa-shopping-bag",
        title: "Đơn hàng"
    }
]
const Admin = () => {
    const [selected, setSelected] = useState(1)
    const { user } = useSelector(state => state.auth)

    return (
        <div>
            {
                user && user.isAdmin &&
                <div className="admin">
                    <div className="sidebar">
                        <div className="sidebar__title">
                            <span>
                                Sh<span>o</span>ps
                            </span>
                        </div>
                        <div className="sidebar__content">
                            {data.map((item, index) => (
                                <div key={index}
                                    className={`sidebar__content__item ${selected === index ? 'active' : ''} `}
                                    onClick={() => setSelected(index)}
                                >
                                    <i className={item.icon}></i>
                                    <span>{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="maindash">
                        {selected === 1 &&
                            <Products />
                        }
                        {selected === 2 &&
                            <Categories />
                        }
                        {selected === 3 &&
                            <Order />
                        }
                    </div>
                </div>
            }
            {
                (!user || !user.isAdmin ) && <NotFound />
            }
        </div>
    )
}

export default Admin