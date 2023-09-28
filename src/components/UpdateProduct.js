import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Select from "react-select";
import { BASE_URL, headerData } from "../Const";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { updateItem } from "../redux/RootActions";

const UpdateProduct = () => {
  const dispatch = useDispatch()
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

    axios
      .get(BASE_URL + `product/${params.id}`, {
        headers: headerData,
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

  const updateProduct = async (id) => {
    const data = {
      name: name,
      price: price,
      category: category?.label,
    };

  //  dispatch(updateItem(data,id,navigate))

    axios
      .put(BASE_URL + `product/${params.id}`, data, {
        headers: headerData,
      })
      .then((res) => {
        console.log(res, "response from api");
        if (res.data) {
          toast.success("Item Updated");
          navigate("/");
        } else {
          toast.error("no record found");
        }
      })
      .catch((err) => {
        console.log(err, "err in api call");
      });
  };

  return (
    <div className="card2">
      <div className="heading">Update Item</div>

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

      <div style={{ width: "222px", margin: "auto" }}>
        <Select
          placeholder="Select Category"
          value={category}
          options={categoryOptions}
          onChange={(e) => handleCategoryChange(e)}
        />
      </div>
      <br />

      <Button variant="contained" onClick={() => updateProduct()}>
        Save
      </Button>
    </div>
  );
};

export default UpdateProduct;
