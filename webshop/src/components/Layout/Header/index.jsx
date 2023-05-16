import React, { useEffect, useRef, useState } from 'react'

import "./Header.scss"
import HeaderBottom from './HeaderBottom';
import HeaderTop from './HeaderTop';
import { useMatch  } from 'react-router-dom';
const Header = () => {
  const isAdmin = useMatch ('/admin');

  const headerRef = useRef(null)
   useEffect(() => {
    window.addEventListener("scroll", ()=> {
  
      if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100  ){
        headerRef.current.classList.add("shrink")
      }
      else {
        headerRef.current.classList.remove("shrink")
    }
    })
  })
  if(isAdmin)
    return null;
  return (
    <div className = "header" ref={headerRef}>
        <div className="container">
        <HeaderTop />
        <HeaderBottom />
        </div>
    </div>
  );
}

export default Header