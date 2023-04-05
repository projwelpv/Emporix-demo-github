/***
 *  Products Reducers
 ***/

const initialState = {
  products: "",
};
const Products = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return {
        ...state,
        productId: action.products,
      };
    default:
      return state;
  }
};
export default Products;
