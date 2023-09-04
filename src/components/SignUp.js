import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Const";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import toast,{ Toaster } from "react-hot-toast";


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const collectData = async () => {
    console.log(name, email, password);

    let result = await fetch(BASE_URL + "register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    toast.success("SignUp Successful");
    navigate("/");
  };

  return (
    <div className="card2">
      <div className="heading">Register</div>

      <div style={{ height: "50px" }}>
        <TextField
          variant="outlined"
          label="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <br />

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

      <Button variant="contained" onClick={collectData}>
        <AddIcon />
        SignUp
      </Button>
      <Toaster/>
    </div>
  );
};

export default SignUp;
