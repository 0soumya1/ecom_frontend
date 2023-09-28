import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Const";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import {toast} from "react-hot-toast";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const collectData = async () => {
    console.log(name, email, password);

    console.log(!name);
    if ((!name, !email, !password)) {
      setError(true);
      return false;
    }

    let result = await fetch(BASE_URL + "register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));
      toast.success("SignUp Successful");
      navigate("/");
    } else {
      toast.error("please enter correct details");
    }
  };

  return (
    <div className="card2">
      <div className="heading">Register</div>

      <div>
        <TextField
          size="small"
          variant="outlined"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <br />
      {error && !name && (
        <span className="invalid-input">Enter Valid Name</span>
      )}

      <div>
        <TextField
          variant="outlined"
          size="small"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />
      {error && !email && (
        <span className="invalid-input">Enter Valid Email</span>
      )}
      <div>
        <TextField
          variant="outlined"
          size="small"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      {error && !password && (
        <span className="invalid-input" style={{ marginLeft: "-60px" }}>
          Enter Valid Password
        </span>
      )}

      <Button
        size="small"
        style={{ width: "100px" }}
        variant="contained"
        onClick={()=>collectData()}
      >
        SignUp
      </Button>
    </div>
  );
};

export default SignUp;
