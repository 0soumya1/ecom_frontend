import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import { BASE_URL } from "../Const";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const params = useParams();
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

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.log(params);
    let result = await fetch(BASE_URL + `product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
  };

  const updateProduct = async () => {
    console.log(name, price, category);
    const data = {
      name: name,
      price: price,
      category: category,
    };
    axios
      .put(BASE_URL + `product/${params.id}`, data, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        console.log(res, "response from api");
        if (res.data) {
          getProductDetails(res.data);
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
    <div className="product">
      <h1>Update Item</h1>
      <input
        type="text"
        placeholder="Enter Name"
        className="inputbox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Price"
        className="inputbox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <Select
        placeholder="Select Category"
        className="inputbox"
        value={category}
        options={categoryOptions}
        onChange={(e) => handleCategoryChange(e)}
      />

      {/* <input
        type="text"
        placeholder="Enter Category"
        className="inputbox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      /> */}

      <button onClick={updateProduct} className="appbutton">
        Update Item
      </button>
      <Toaster />
    </div>
  );
};

export default UpdateProduct;
