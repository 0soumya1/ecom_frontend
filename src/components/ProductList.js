import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import toast, {Toaster} from "react-hot-toast"
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import { BASE_URL } from "../Const";

const ProductList = () => {
    const[products, setProducts]= useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
         getProducts();
    },[]);

    const getProducts = async ()=>{
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
<div className="card2">
      <div className="heading">Food Items</div>
      {products.length > 0 ? (
        <>
          <div className="row1">
            <div>
              <TextField
                variant="outlined"
                label="Search"
                size="small"
                onChange={searchHandle}
              />
            </div>
            <div>
              <Button variant="contained" onClick={() => navigate("/add")}>
                <AddIcon />
                Add
              </Button>
            </div>
          </div>
<br/>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item, index) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>₹ {item.price}</td>
                  <td>{item.category}</td>
                  <td>
                    <button onClick={() => deleteProduct(item._id)}>
                      Delete
                    </button>
                    <Link to={"/update/" + item._id}>Update</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <LinearProgress />
      )}

      <Toaster />
    </div>


    // <div className='product-list'>
    //    <h3>Product List</h3>
    //    <input type="text" placeholder="Search Product" 
    //    className="search-product-box" onChange={searchHandle}/>
    //    <ul>
    //     <li>S.No</li>
    //     <li>Name</li>
    //     <li>Price</li>
    //     <li>Category</li>
    //     <li>Company</li>
    //     <li>Operation</li>
    //    </ul>
    //    {
    //     products.length>0 ? products.map((item, index)=>
    //     <ul key ={item._id}>
    //     <li>{index+1}</li>
    //     <li>{item.name}</li>
    //     <li>$ {item.price}</li>
    //     <li>{item.category}</li>
    //     <li>{item.company}</li>
    //     <li>
    //       <button onClick={()=>deleteProduct(item._id)}>Delete</button>
    //       <Link to={"/update/"+item._id}>Update</Link>
    //       </li>
    //    </ul>
    //     )
    //     :<h1>No Result Found</h1>
    //    }
    //    <Toaster/>
    // </div>
  )
};

export default ProductList;