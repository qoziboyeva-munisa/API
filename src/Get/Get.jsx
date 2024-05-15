
import { useState } from 'react'
import './Get.css'
import axios from 'axios'
import { useEffect } from 'react'
import { Modal, message } from 'antd'

function Get() {
  const url = 'https://autoapi.dezinfeksiyatashkent.uz/api/categories'
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNTAwNjI0OCwiZXhwIjoxNzQ2NTQyMjQ4fQ.uMRbDZduB_z8LXgdTho8kBggg9Zrz6SNCwqmFcas10E";
 
  const urlimage = 'https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/'
  const [open,setOpen]=useState(false)
  const [category, setCategory] = useState([])
  const [nameEn, setNameEn]=useState('')
  const[nameRu, setNameRu]=useState('')
  const [id, setId]=useState(null)
  
  
  const getCategory = () => {
    axios({
      url:url,
      method:'GET',
      image_src:urlimage
    }).then((res)=>{
      setCategory(res.data.data)
    }).catch((err)=>{
      console.log(err);
    })
  }

const editCategory =(e)=>{
  e.preventDefault();
      const name_en = document.getElementById('name_en').value ; 
      const name_ru = document.getElementById('name_ru').value; 
      const images1 = document.getElementById('images1').files[0]; 
 
  setOpen(false)
  const formData = new FormData();
  formData.append("name_en",name_en);
  formData.append("name_ru",name_ru);
  formData.append("images",images1);
  
   const headers ={
    Authorization:`Bearer ${token}`
   }
   axios({
    url:`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
    method:"PUT",
    data:formData,
    headers:headers,
   }).then((res)=>{
    message.success("o'zgartirildi")
    console.log(res.data.data);
   }).catch((err)=>{
    message.error("xatolik")
    console.log(err);
   })
}
  const DeleteCategory = (id)=>{
    console.log(id);
   const headers ={
    Authorization:`Bearer ${token}`
   }
   axios({
    url:`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
    method:"Delete",
    headers:headers
   }).then((res)=>{
    alert("o'chirildi")
   
    getCategory()
   }).catch((err)=>{
    console.log("Error",err);
   })
  
}
  useEffect(()=>{
    getCategory()
  },[])

  const showModal=(item)=>{
    setOpen(true)
    setNameEn(item.name_en)
    setNameRu(item.name_ru)
    setId(item.id)

  }
  
const closeModal=(e)=>{
  setOpen(false)
}

  return (
   
    <div className='container'>
           {
            category && category.map((item,index)=>(
              <div key={index}>
                  {item.name_en}   
                  <p >{item.name_ru}</p>
                  <img style={{width:'30%'}} src={`${urlimage}${item.image_src}`} alt={item.name_en} /> 
                  <button onClick={()=>DeleteCategory(item.id)}>Delete</button>
                  <button onClick={()=>showModal(item)}>Edit</button>
                 
              </div>
             
            ))
           }
    
    <Modal title="Taxrirlash" open={open} onOk={closeModal} onCancel={closeModal} footer={null}>

      <form onSubmit={editCategory}>
      <input type="text" value={nameEn} onChange={(e)=> setNameEn(e.target.value)}/>
      <input type="text"  value={nameRu} onChange={(e)=> setNameRu(e.target.value)}/>
      <input type="file" id='images1'/>
      <button type='submit'>send</button>
      </form>
       
      </Modal>    
    </div>
   
  )
}

export default Get
