import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "../Const";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // to prevent it from hacking
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    console.log(email, password);
    let result = await fetch(BASE_URL + "login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      toast.error("please enter correct details");
    }
  };

  return (
    <div className="card2">
      <div className="heading">Login</div>

      <div style={{ height: "50px" }}>
        <TextField
          variant="outlined"
          label="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />

      <div style={{ height: "50px" }}>
        <TextField
          variant="outlined"
          label="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />

      <Button variant="contained" onClick={handleLogin}>
        <AddIcon />
        Save
      </Button>
      <Toaster />
    </div>
  );
};

export default Login;
