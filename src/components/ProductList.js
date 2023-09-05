import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import { BASE_URL, headerData } from "../Const";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    axios
      .get(BASE_URL + "products", {
        headers: headerData,
      })
      .then((resp) => {
        console.log( " getlist api");
        if (resp.data) {
          setProducts(resp.data);
        } else {
          toast.error("not found");
        }
      })
      .catch((err) => {
        console.log(err, "err in api call");
      });
  };

  const deleteProduct = (id) => {
    axios
      .delete(BASE_URL + `product/${id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((resp) => {
        console.log(resp, "response from api");
        if (resp.data) {
          getProducts(resp.data);
          toast.success("Item Deleted");
        } else {
          toast.error("not deleted");
        }
      })
      .catch((err) => {
        console.log(err, "err in api call");
      });
  };

  const searchHandle = (event) => {
    let key = event.target.value;
    if (key) {
      axios
        .get(BASE_URL + `search/${key}`, {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        })
        .then((resp) => {
          console.log(resp, "response from api");
          if (resp.data) {
            setProducts(resp.data);
          } else {
            toast.error("not found");
          }
        })
        .catch((err) => {
          console.log(err, "err in api call");
        });
    } else {
      getProducts();
    }
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
            onChange={searchHandle}
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
      {products.length > 0 ? (
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
              {products.map((item, index) => (
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
