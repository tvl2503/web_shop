import React, { useState } from 'react';


import './index.styles.scss';
import agent from '../../service/agent';
import { SUCCESS } from '../../constants/statusCode';
import { toast } from 'react-toastify';
const UploadImage = (props) => {
    const { images, setImages } = props;
    const uploadHandler = async (e) => {
      const file = e.target.files[0];
      if(!file) return;
      let formData = new FormData();
      formData.append("file_upload", file)
      try{
        const res = await agent.Upload.uploadImage(formData)
        if(res.code === SUCCESS){
          setImages([...images, res.result])
        }
        else{
          toast.error(res.message)
        }
      }catch(err){
        console.log(err);
        toast.error("Tải ảnh không thành công")

      }
    }
    const removeImage = (img) => {
      const newImgs = images.filter(item => item !== img)
      setImages(newImgs)
    }
  return (
    <div className='file'>
      <div className="file-card">

        <div className="file-inputs">
            <input type="file" onChange={uploadHandler} accept="image/png, image/jpg, image/jpeg" />
            <button>
                <i className="fas fa-upload"></i>
                Tải ảnh
            </button>
        </div>

        <p className="main">Chỉ hỗ trợ</p>
        <p className="info"> JPG, PNG</p>
      </div>
    {images.length > 0 &&  
      <div className="file-list">
        {
          images.map((item, index) => (
            <div className='file-list-image' key = {index} >
              <img src={item} />
              <button onClick={() => removeImage(item)} className='file-list-image-remove' ><i className="far fa-times"></i></button>
            </div>
            
          ))
        }
      </div>
    }
    </div>
  )
}

export default UploadImage