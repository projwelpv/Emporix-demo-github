/***
 *  CART Reducers
 ***/

const initialState = {
  cartItems: [],
};
const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CART_SUCCESS":
      return {
        ...state,
        cartItems: action.cartItems,
      };
    case "DELETE_CART_ITEMS":
      return {
        ...state,
        cartItems: action.cartItems,
      };
    default:
      return state;
  }
};
export default CartReducer;
