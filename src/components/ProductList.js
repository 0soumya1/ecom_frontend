import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import { BASE_URL, headerData } from "../Const";
import { useDispatch, useSelector } from "react-redux";
import { getItemList } from "../redux/Items/Action";
import { deleteItem } from "../redux/Items/Action";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [itemList1, setItemList1] = useState([]);
  const [itemList2, setItemList2] = useState([]);

  const itemList = useSelector((state) => state.itemReducer.itemList);
  console.log(itemList, "itemlist");

  useEffect(() => {
    dispatch(getItemList());
  }, []);

  useEffect(() => {
    setItemList1(itemList);
    setItemList2(itemList);
  }, [itemList]);

  const deleteProduct =(id)=>{
    dispatch(deleteItem(id));
  }
    

  // const getProducts = async () => {
  //   axios
  //     .get(BASE_URL + "products", {
  //       headers: headerData,
  //     })
  //     .then((resp) => {
  //       console.log(" getlist api");
  //       if (resp.data) {
  //         setProducts(resp.data);
  //       } else {
  //         toast.error("not found");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err, "err in api call");
  //     });
  // };

  // const deleteProduct = (id) => {
  //   axios
  //     .delete(BASE_URL + `product/${id}`, {
  //       headers: headerData,
  //     })
  //     .then((resp) => {
  //       console.log(resp, "response from api");
  //       if (resp.data) {
  //         // getProducts(resp.data);
  //         toast.success("Item Deleted");
  //       } else {
  //         toast.error("not deleted");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err, "err in api call");
  //     });
  // };

  // const searchHandle = (e) => {
  //   let key = e.target.value;
  //   if (key) {
  //     axios
  //       .get(BASE_URL + `search/${key}`, {
  //         headers: headerData,
  //       })
  //       .then((resp) => {
  //         console.log(resp, "response from api");
  //         if (resp.data) {
  //           setProducts(resp.data);
  //         } else {
  //           toast.error("not found");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err, "err in api call");
  //       });
  //   } else {
  //     // getProducts();
  //   }
  // };

  const handleSearch = (key) => {
    let search = key.toLowerCase();
    const result = itemList2.filter((a) => {
      return (
        a?.name?.toLowerCase().match(search) ||
        a?.price?.toString().match(search) ||
        a?.category?.toLowerCase().match(search)
      );
    });
    setItemList1(result);
  };

  return (
    <div className="card2">
      <div className="heading">Food Items</div>

      <div className="row1">
        <div>
          <TextField
            variant="outlined"
            label="Search"
            size="small"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div>
          <Button variant="contained" onClick={() => navigate("/add")}>
            <AddIcon />
            Add
          </Button>
        </div>
      </div>
      <br />
      {itemList1.length > 0 ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {itemList1.map((item, index) => (
                <tr key={item._id}>
                  <td style={{ textTransform: "uppercase" }}>{item.name}</td>
                  <td>₹ {item.price}</td>
                  <td>{item.category}</td>
                  <td>
                    <EditSharpIcon
                      className="icon"
                      onClick={() => navigate("/update/" + item._id)}
                    />

                    <DeleteIcon
                      className="icon"
                      onClick={() => deleteProduct(item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <LinearProgress />
      )}
    </div>
  );
};

export default ProductList;
