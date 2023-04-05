/***
 *  Products Reducers
 ***/

const initialState = {
  products: [],
  detail_products: [],
};
const ProductReducer = (state = initialState, action) => {
  console.log("alsg", action.products);
  switch (action.type) {
    case "ACTUAL_PRODUCTS":
      return {
        ...state,
        products: action.products,
      };
    default:
      return state;
  }
};
export default ProductReducer;
