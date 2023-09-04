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
      .put(BASE_URL + `product/${params.id}`, data,{
        headers: { authorization: token },
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

      <button onClick={updateProduct} className="appbutton">
        Update Item
      </button>
      <Toaster />
    </div>
  );
};

export default UpdateProduct;
