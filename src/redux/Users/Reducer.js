import { AT_SIGNUP, AT_LOGIN } from "./Action";
const initialState = {
  userList: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT_SIGNUP:
      state = {
        ...state,
        userList: action.payload,
      };
      break;

    default:
      console.log("default in user reducer");
      state = { ...state };
      break;
  }
  return state;
};

export default userReducer;
