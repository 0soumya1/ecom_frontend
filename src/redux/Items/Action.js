import axios from "axios";
import { BASE_URL} from "../../Const";
import { toast } from "react-hot-toast";

export const AT_ITEM_LIST = "AT_ITEM_LIST";
export const AT_ADD_ITEM = "AT_ADD_ITEM";
export const AT_DELETE_ITEM = "AT_DELETE_ITEM";
export const AT_UPDATE_ITEM = "AT_UPDATE_ITEM";

export const headerData = {
  authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
};

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
      if(res.data){
        dispatch({
          type: AT_DELETE_ITEM,
          payload: res?.data,
        });
        getItemList();
        toast.success("Item Deleted");
      }else{
        toast.error("not deleted");
      }
    })
    .catch((err) => {
      console.log(err, "api err");
    });
};

export const updateItem = (data, navigate, params) => async (dispatch) => {
  console.log("redux updateitem processing");
  axios
    .put(BASE_URL + `product/${params.id}`, data, {
      headers: headerData,
    })
    .then((res) => {
      if (res.data) {
        dispatch({
          type: AT_UPDATE_ITEM,
          payload: res?.data,
        });
        toast.success("Item Updated");
        navigate("/");
      } else {
        toast.error("no record found");
      }
    })
    .catch((err) => {
      console.log(err, "api err");
    });
};
