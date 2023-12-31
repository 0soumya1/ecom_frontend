import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/Items/Action";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const categoryOptions = [
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Snacks", label: "Snacks" },
    { value: "Dinner", label: "Dinner" },
  ];

  const handleCategoryChange = (e) => {
    setCategory(e);
  };

  const addProduct = () => {
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

    dispatch(addItem(data, navigate));
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
          type="number"
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
        <span className="invalid-input" style={{ marginLeft: "-60px" }}>
          Enter Valid Category
        </span>
      )}

      <Button variant="contained" onClick={() => addProduct()}>
        Save
      </Button>
    </div>
  );
};

export default AddProduct;
