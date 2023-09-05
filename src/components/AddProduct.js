import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { BASE_URL } from "../Const";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const categoryOptions = [
    { value: 1, label: "Breakfast" },
    { value: 2, label: "Lunch" },
    { value: 3, label: "Snacks" },
    { value: 4, label: "Dinner" },
  ];

  const handleCategoryChange = (e) => {
    console.log(e, "e");
    setCategory(e);
  };

  const addProduct = async () => {
    console.log(!name);
    if ((!name, !price, !category?.label)) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;

    let data = {
      name: name,
      price: price,
      category: category?.label,
      userId: userId,
    };

    axios
      .post(BASE_URL + "add-product", data, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        console.log(res, "response from add api");
        if (res.data) {
          toast.success("Item Added");
        } else {
          toast.error("not found");
        }
      })
      .catch((err) => {
        console.log(err, "err in add api call");
      });
      navigate("/");   
  };

  return (
    <div className="card2">
      <div className="heading">Add Item</div>

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
          size="small"
          variant="outlined"
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <br />
      {error && !price && (
        <span className="invalid-input">Enter Valid Price</span>
      )}

      <div style={{ width: "222px", margin: "auto" }}>
        <Select
          placeholder="Select Category"
          value={category}
          options={categoryOptions}
          onChange={(e) => handleCategoryChange(e)}
        />
      </div>
      <br />
      {error && !category?.label && (
        <span className="invalid-input" style={{marginLeft:"-60px"}}>Enter Valid Category</span>
      )}

      <Button variant="contained" onClick={addProduct}>
        Save
      </Button>
    </div>
  );
};

export default AddProduct;
