const initialState = {
    products:[]
 
};
const CustomerCart = (state = initialState, action) => {
 
  switch (action.type) {
    case "GET_CUSTOMER_CART":
      return {
        ...state,
        cartId: action.cart,
      };
    default:
      return state;
  }
};
export default CustomerCart;
