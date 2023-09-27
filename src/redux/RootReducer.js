import { combineReducers } from "redux";
import itemReducer from "./Items/Reducer";

const rootReducer = combineReducers({
  itemReducer,
});

export default rootReducer;