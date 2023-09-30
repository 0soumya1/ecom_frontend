import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { getItemDetail } from "../redux/RootActions";
import { updateItem } from "../redux/RootActions";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const itemDetail = useSelector((state) => state.itemReducer.itemDetail);

  const categoryOptions = [
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Snacks", label: "Snacks" },
    { value: "Dinner", label: "Dinner" },
  ];

  const handleCategoryChange = (e) => {
    setCategory(e);
  };

  useEffect(() => {
    dispatch(getItemDetail(params));
  }, []);

  useEffect(() => {
    setName(itemDetail.name);
    setPrice(itemDetail.price);
    setCategory({ value: itemDetail.category, label: itemDetail.category });
  }, [itemDetail]);

  const updateProduct = async () => {
    const data = {
      name: name,
      price: price,
      category: category?.label,
    };

    dispatch(updateItem(data, navigate, params));
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
          type="number"
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
