import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";
import { Toaster } from "react-hot-toast";
import { Button } from "@mui/material";

import React, { useEffect, useState } from "react";
import { addItem, getItemList } from "./redux/RootActions";
import { useDispatch, useSelector } from "react-redux";

const App =()=> {
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemReducer.itemList);

  const [itemData, setItemData]= useState({
   
  })

  console.log(itemList, "itemList");

  useEffect(() => {
    dispatch(getItemList());
  }, []);

const handleAddItem =()=>{
  dispatch(addItem(itemData));
}

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Toaster/>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
