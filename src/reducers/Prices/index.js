/***
 *  Products Reducers
 ***/

const initialState = {
  
    prices: [],
  };
  const PriceReducer = (state = initialState, action) => {
    console.log("alsg", action.products);
    switch (action.type) {
      case "GET_ALL_PRICES":
        return {
          ...state,
          prices: action.prices,
        };
      default:
        return state;
    }
  };
  export default PriceReducer;
  