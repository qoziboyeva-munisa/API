
import axios from 'axios';
import './Delete.css'
import { useState } from 'react';

function Delete() {
  const [delet, setDelet]=useState([])
  const url = "https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}"
  const DeleteCategory = (id)=>{
    console.log(id);
   const headers ={
    Authorization:`Bearer ${token}`
        

   }


   axios({
    url:url,
    method:"Delete",
    headers:headers
   }).then((res)=>{
    alert("o'chirildi")
   }).catch((err)=>{
    console.log("Error",err);
   })
  
 
    


  }
  
  return (
   
 
   <div className='container'>
   
    {

        delet && delet.map((item,index)=>(
          <div key={index}>
              {item.name_en}   
              <p >{item.name_ru}</p>
              <img style={{width:'30%'}} src={`${urlimage}${item.image_src}`} alt={item.name_en} /> 
              <button>Delete</button>
              <button>Edit</button>
          </div>
         
        ))
     
    }
    </div>  
  
 
   
  )
}

export default Delete
