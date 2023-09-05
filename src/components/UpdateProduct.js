import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import { BASE_URL } from "../Const";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const categoryOptions = [
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Snacks", label: "Snacks" },
    { value: "Dinner", label: "Dinner" },
  ];

  const handleCategoryChange = (e) => {
    console.log(e, "e");
    setCategory(e);
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.log(params);

    let token = `bearer ${JSON.parse(localStorage.getItem("token"))}`;
    axios
      .get(BASE_URL + `product/${params.id}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data, "res in get item");
          setName(res.data.name);
          setPrice(res.data.price);
          setCategory({ value: res.data.category, label: res.data.category });
        } else {
          toast.error("no record found");
        }
      })
      .catch((err) => {
        console.log(err, "err in api call");
      });
  };

  const updateProduct = async () => {
    console.log(name, price, category?.label);
    const data = {
      name: name,
      price: price,
      category: category?.label,
    };
    let token = `bearer ${JSON.parse(localStorage.getItem("token"))}`;
    axios
      .put(BASE_URL + `product/${params.id}`, data, {
        headers: { authorization: token },
      })
      .then((res) => {
        console.log(res, "response from api");
        if (res.data) {
          getProductDetails(res.data);
          toast.success("Item Updated");
        } else {
          toast.error("no record found");
        }
      })
      .catch((err) => {
        console.log(err, "err in api call");
      });
    navigate("/");
  };

  return (
    <div className="card2">
      <div className="heading">Update Item</div>

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
          label="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <br />

      <div className="select">
        <Select
          placeholder="Select Category"
          value={category}
          options={categoryOptions}
          onChange={(e) => handleCategoryChange(e)}
        />
      </div>
      <br />

      <Button variant="contained" onClick={updateProduct} className="appbutton">
        <AddIcon />
       Save
      </Button>
   
    </div>
  );
};

export default UpdateProduct;
