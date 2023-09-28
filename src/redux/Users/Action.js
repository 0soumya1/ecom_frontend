import axios from "axios";
import { BASE_URL} from "../../Const";
import { toast } from "react-hot-toast";

export const AT_SIGNUP = "AT_SIGNUP";
export const AT_LOGIN= "AT_LOGIN";

export const signUP = (data, navigate) => async (dispatch) => {
    console.log("redux signup processing");
  
    axios
      .post(BASE_URL + "register", data)
      .then((res) => {
        console.log(res?.data, "res?.data");
        if (res.auth) {
        dispatch({
          type: AT_SIGNUP,
          payload: res?.data,
        });
        localStorage.setItem("user", JSON.stringify(res.result));
        localStorage.setItem("token", JSON.stringify(res.auth));
        toast.success("SignUp Successful");
        navigate("/");
      } else {
        toast.error("please enter correct details");
      }
      })
      .catch((err) => {
        console.log(err, "api err");
      });
  };