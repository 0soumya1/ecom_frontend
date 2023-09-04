import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div className="row1 card">
      <div className="row cursor" onClick={() => navigate("/")}>
        <ShoppingCartIcon />
        E-Commerce
      </div>
     
      {auth ? (
        <>
          <Link onClick={logout} to="/signup">
            Logout ({JSON.parse(auth).name}){" "}
          </Link>
        </>
      ) : (
        <>
          {" "}
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
};

export default Nav;
