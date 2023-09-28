import axios from "axios";
import { BASE_URL } from "../../Const";
import { toast } from "react-hot-toast";

export const AT_SIGNUP = "AT_SIGNUP";
export const AT_LOGIN = "AT_LOGIN";

export const signUP = (data, navigate) => async (dispatch) => {

  axios
    .post(BASE_URL + "register", data)
    .then((res) => {
      if (res?.data?.auth) {
        localStorage.setItem("user", JSON.stringify(res?.data?.result));
        localStorage.setItem("token", JSON.stringify(res?.data?.auth));
        dispatch({
          type: AT_SIGNUP,
          payload: res?.data,
        });
        toast.success("SignUp Successful");
        // navigate("/");
        window.location.reload("/")
      } else {
        toast.error("please enter correct details");
      }
    })
    .catch((err) => {
      console.log(err, "api err");
    });
};
