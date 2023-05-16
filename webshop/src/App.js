import Layout from "./components/Layout";
import GlobalStyles from "./components/GlobalStyles";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useState } from "react";
import agent from "./service/agent";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "./service/category";
import { SUCCESS } from "./constants/statusCode";
import axiosClient from "./service/axiosClient";
import { getInfo, logout } from "./service/auth/authSlice";
function App() {
  // const killCopy = (e) => {
  //   return false;
  // };

  // const reEnable = () => {
  //   return true;
  // };
  // const defeatIE = () => {
  //   if (document.all) {
  //     return false;
  //   }
  // };
  // const defeatNS = (e) => {
  //   if (document.layers || (document.getElementById && !document.all)) {
  //     if (e.which === 2 || e.which === 3) {
  //       return false;
  //     }
  //   }
  // };
  // if (document.layers) {
  //   document.captureEvents(Event.MOUSEDOWN);
  //   document.onmousedown = defeatNS;
  // } else {
  //   document.onmouseup = defeatNS;
  //   document.oncontextmenu = defeatIE;
  // }
  // document.oncontextmenu = new Function("return false");

  // document.onselectstart = new Function("return false");

  // if (window.sidebar) {
  //   document.onmousedown = killCopy;
  //   document.onclick = reEnable;
  // }
  const dispatch =  useDispatch();
  const getInfoUser = async () => {
    try{
        const res = await axiosClient.get('/auth/me');
        if(res.data.code === SUCCESS){
          dispatch(getInfo(res.data.result))
        }
    }catch(err){
      dispatch(logout())
    }
  }
  useEffect(() => {
    if(localStorage.getItem("token"))
      getInfoUser()
    else{
      dispatch(logout())
    }
  }, [])
  return (
    <GlobalStyles>
        <ToastContainer autoClose={2000} />
        <Layout />
      </GlobalStyles>
  );
}

export default App;
