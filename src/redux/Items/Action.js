import axios from "axios";
import { BASE_URL, headerData } from "../../Const";
import { toast } from "react-hot-toast";

export const AT_ITEM_LIST = "AT_ITEM_LIST";
export const AT_ADD_ITEM = "AT_ADD_ITEM";
export const AT_DELETE_ITEM = "AT_DELETE_ITEM";

export const getItemList = () => async (dispatch) => {
  console.log("redux getitem processing");
  axios
    .get(BASE_URL + "products", {
      headers: headerData,
    })
    .then((res) => {
      if (res.data) {
        dispatch({
          type: AT_ITEM_LIST,
          payload: res?.data,
        });
      } else {
        toast.error("err in get itemlist");
      }
    })
    .catch((err) => {
      console.log(err, "api err");
    });
};

export const addItem = (data, navigate) => async (dispatch) => {
  console.log("redux additem processing");

  axios
    .post(BASE_URL + "add-product", data, {
      headers: headerData,
    })
    .then((res) => {
      console.log(res?.data, "res?.data");
      dispatch({
        type: AT_ADD_ITEM,
        payload: res?.data,
      });
      navigate("/");
    })
    .catch((err) => {
      console.log(err, "api err");
    });
};

export const deleteItem = (id) => async (dispatch) => {
  axios
    .delete(BASE_URL + `product/${id}`, {
      headers: headerData,
    })
    .then((res) => {
      console.log(res?.data, "res?.data");
      dispatch({
        type: AT_DELETE_ITEM,
        payload: res?.data,
      });
    })
    .catch((err) => {
      console.log(err, "api err");
    });
};
