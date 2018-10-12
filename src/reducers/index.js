import { combineReducers } from "redux";
import auth from "./auth";

const appReducer = combineReducers({
  auth
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
