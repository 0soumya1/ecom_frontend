import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { BASE_URL } from "../Const";
import axios from "axios";
import { toast } from "react-hot-toast";

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
    { value: 4, label: "Dinner" }
  ];

  const handleCategoryChange = (e) => {
    console.log(e, "e");
    setCategory(e);
  };

  const addProduct = async () => {
    console.log(!name);
    if (!name, !price, !category?.label) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;

    let data = {
      name: name,
      price: price,
      category: category?.label,
      userId: userId
    };

    axios
      .post(BASE_URL + "add-product", data, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      })
      .then((res) => {
        console.log(res, "response from add api");
        if (res.data) {
          toast.success("item added");
          navigate("/");
        } else {
          toast.error("not found");
        }
      })
      .catch((err) => {
        console.log(err, "err in add api call");
      });
  };

  return (
    <div className="product">
      <h1>Add Item</h1>
      <input
        type="text"
        placeholder="Enter Name"
        className="inputbox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && (
        <span className="invalid-input">Enter Valid Name</span>
      )}
      <input
        type="text"
        placeholder="Enter Price"
        className="inputbox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && (
        <span className="invalid-input">Enter Valid Price</span>
      )}
      
      <Select
        type="text"
        placeholder="Select Category"
        className="inputbox"
        value={category}
        options={categoryOptions}
        onChange={(e) => handleCategoryChange(e)}
      />
      {error && !category && (
        <span className="invalid-input">Enter Valid Category</span>
      )}

      <button onClick={addProduct} className="appbutton">
        Add Item
      </button>
    </div>
  );
};

export default AddProduct;
