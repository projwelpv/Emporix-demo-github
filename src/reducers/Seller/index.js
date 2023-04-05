/***
 *  Products Reducers
 ***/

 const initialState = {
    products: "",
  };
  const Seller = (state = initialState, action) => {
    switch (action.type) {
      case "GET_SELLER_NAME":
        return {
          ...state,
          seller_Name: action.products,
        };
      default:
        return state;
    }
  };
  export default Seller;
