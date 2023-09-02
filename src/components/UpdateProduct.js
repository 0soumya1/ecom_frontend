import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios";

const UpdateProduct =()=>{
    const[name, setName] = useState("");
    const[price, setPrice] = useState("");
    const[category, setCategory] = useState("");
    const[company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[]); 

    const getProductDetails =async()=>{
        console.log(params);
        // const data = {
        //     name: name,
        //     price: price,
        //     category: category,
        //     company: company,
        // }
        // axios.get(`http://localhost:5000/product/${params.id}`,data).then((res)=>{
        //     console.log(res,"response from api")
        //     if(res.data){
        //        setName(res.data)
        //     }else{
        //         console.log("no record found")
        //     }
        // }).catch((err)=>{
        //    console.log(err,"err in api call");
        // })
         let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}` 
              }
         });
           result = await result.json();
           setName(result.name)
           setPrice(result.price)
           setCategory(result.category)
           setCompany(result.company)
     }

    const updateProduct = async ()=>{
     console.log(name,price,category,company); 
            const data = {
                name: name,
                price: price,
                category: category,
                company: company,
            }
            axios.put(`http://localhost:5000/product/${params.id}`,data,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}` 
                  }
            }).then((res)=>{
                console.log(res,"response from api")
                if(res.data){
                    getProductDetails(res.data)
                }else{
                    console.log("no record found")
                }
            }).catch((err)=>{
               console.log(err,"err in api call");
            })
            navigate("/");
    }

    return(
        <div className="product">
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter product name" 
            className="inputbox"
            value={name} onChange={(e)=>setName(e.target.value)}/>
          
            <input type="text" placeholder="Enter product price" 
            className="inputbox"  
            value={price} onChange={(e)=>setPrice(e.target.value)}/>
          
            <input type="text" placeholder="Enter product category"
            className="inputbox"
            value={category} onChange={(e)=>setCategory(e.target.value)}/>
           
            <input type="text" placeholder="Enter product company"
            className="inputbox"
            value={company} onChange={(e)=>setCompany(e.target.value)}/>

            <button onClick={updateProduct} className="appbutton">Update Product</button> 
        </div>
    )
}

export default UpdateProduct;