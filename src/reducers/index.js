/**
 * Combine Reducers Redux Data
 */
import { combineReducers } from "redux";
import { IntlReducer as ReducersIntl } from "react-redux-multilingual";

// Create Custome Reducers
import products from "./products";
import filters from "./filters";
import Category from "./Category";
import Login from "./Login/Login";
import Cart from "./Cart";
import slider from "./Home/Slider";
import Dealer from "./Checkout/Dealer";
import OrderReducer from "./Order";
import PriceReducer from "./Prices";
import CustomerCart from "./CustomerCart";

const appReducer = combineReducers({
  data: products,
  filters: filters,
  category: Category,
  user: Login,
  cart: Cart,
  ReducersIntl,
  content: slider,
  dealer: Dealer,
  orderHistory: OrderReducer,
  price:PriceReducer,
  cartId:CustomerCart
});

export const rootReducer = (state, action) => {
  console.log("State", state, "action", action);
  return appReducer(state, action);
};
