/***
 *  Products Reducers
 ***/

const initialState = {
  products: [],
  detail_products: [],
};
const OrderReducer = (state = initialState, action) => {
  console.log("alsg", action.products);
  switch (action.type) {
    case "GET_ORDER_HISTORY_SUCCESS":
      return {
        ...state,
        orderHistory: action.products,
      };
    default:
      return state;
  }
};
export default OrderReducer;
