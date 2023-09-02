import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";

const Login =()=>{
    const[email, setEmail]= useState("");
    const[password, setPassword]= useState("");
    const navigate = useNavigate();

    const BASE_URL = "https://ecom-backend-mu.vercel.app/"
    //const url = "http://localhost:5000/"

    useEffect(()=>{                                  // to prevent it from hacking
        const auth = localStorage.getItem("user");
        if(auth){
            navigate("/")
        }
    },[]);

    const handleLogin = async()=>{
        console.log (email, password);
        let result = await fetch(BASE_URL+"login",{
             method: "post",
             body: JSON.stringify({email, password}),
             headers:{"Content-Type": "application/json"}
        });
        result = await result.json();
        console.log(result);
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate("/")
        }else{
            toast.error("please enter correct details")
        }
    }

    return(
        <div className="login">
            <h1>Login</h1>
          <input type="text" className="inputbox" placeholder="Enter Email"
          value={email} onChange={(e)=>setEmail(e.target.value)}
          />
          <input type="password" className="inputbox" placeholder="Enter Password" 
          value={password} onChange={(e)=>setPassword(e.target.value)}
          />
          <button type='button' onClick={handleLogin} className='appbutton'>Login</button>
          <Toaster/>
        </div>
    )
}

export default Login;