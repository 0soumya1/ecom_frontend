import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { BASE_URL } from "../Const";

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
    if (!name || !price || !category) {
      setError(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(BASE_URL + "add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
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
