import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
// import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/RootActions";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const userList = useSelector((state) => state.userReducer.userList);
  

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = () => {
    // setLoading(true);
    console.log(email, password);

    let data = {
      email: email,
      password: password
    };

    dispatch(loginUser(data,navigate))

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
      {/* {loading ? (
        <CircularProgress />
      ) : ( */}
        <Button size="small" variant="contained" onClick={() => handleLogin()}>
          Save
        </Button>
      {/* )} */}
    </div>
  );
};

export default Login;
