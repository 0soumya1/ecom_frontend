import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import toast, {Toaster} from "react-hot-toast"

const ProductList = () => {
    const[products, setProducts]= useState([]);

    const BASE_URL = "https://ecom-backend-mu.vercel.app/"
    //const url = "http://localhost:5000/"

    useEffect(()=>{
         getProducts();
    },[]);

    const getProducts = async ()=>{
        // let result = await fetch("http://localhost:5000/products");
        // result = await result.json();
        // setProducts(result); 
        axios.get(BASE_URL+"products",{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}` 
          }
        }).then((resp)=>{
          console.log(resp,"response from api")
          if(resp.data){
            setProducts(resp.data)
          }else{
            toast.error("not found")
          }
      }).catch((err)=>{
          console.log(err,"err in api call");
      })
    }
      // console.log(products,"products");

    const deleteProduct =(id)=>{
    axios.delete(BASE_URL+`product/${id}`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}` 
      }
    }).then((resp)=>{
        console.log(resp,"response from api")
        if(resp.data){
          getProducts(resp.data)
        }else{
          toast.error("not deleted")
        }
    }).catch((err)=>{
        console.log(err,"err in api call");
    })
    }

    const searchHandle =(event)=>{
      let key = event.target.value;
      if(key){
        axios.get(BASE_URL+`search/${key}`,{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}` 
          }
        }).then((resp)=>{
          console.log(resp,"response from api")
          if(resp.data){
            setProducts(resp.data)
          }else{
            toast.error("not found")
          }
      }).catch((err)=>{
          console.log(err,"err in api call");
      })
      }else{
        getProducts();
      }
    };

  return (
    <div className='product-list'>
       <h3>Product List</h3>
       <input type="text" placeholder="Search Product" 
       className="search-product-box" onChange={searchHandle}/>
       <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
       </ul>
       {
        products.length>0 ? products.map((item, index)=>
        <ul key ={item._id}>
        <li>{index+1}</li>
        <li>{item.name}</li>
        <li>$ {item.price}</li>
        <li>{item.category}</li>
        <li>{item.company}</li>
        <li>
          <button onClick={()=>deleteProduct(item._id)}>Delete</button>
          <Link to={"/update/"+item._id}>Update</Link>
          </li>
       </ul>
        )
        :<h1>No Result Found</h1>
       }
       <Toaster/>
    </div>
  )
};

export default ProductList;