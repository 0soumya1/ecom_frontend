import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import { BASE_URL } from "../Const";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/RootActions";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    console.log(email, password);

    let data = {
      email: email,
      password: password
    };

   // dispatch(loginUser(data,navigate))

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
      setLoading(false);
      toast.success("Login Successful");
      //navigate("/");
      window.location.reload("/")
    } else {
      setLoading(false);
      toast.error("please enter correct details");
    }
  };

  return (
    <div className="card2">
      <div className="heading">SignIn</div>

      <div>
        <TextField
          size="small"
          variant="outlined"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />

      <div>
        <TextField
          size="small"
          variant="outlined"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      {loading ? (
        <CircularProgress />
      ) : (
        <Button size="small" variant="contained" onClick={() => handleLogin()}>
          Save
        </Button>
      )}
    </div>
  );
};

export default Login;
