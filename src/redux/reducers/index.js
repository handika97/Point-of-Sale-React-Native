import { combineReducers } from "redux";
import productReducer from "./product";
import cartReducer from "./cart.js";
import categoryReducer from "./category.js";

const reducers = combineReducers({
  product: productReducer,
  cart: cartReducer,
  category: categoryReducer
});

export default reducers;
