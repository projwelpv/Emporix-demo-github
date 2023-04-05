/***
 *  DEALER Reducers
 ***/

const initialState = {
  dealer: [],
};
const DealerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DEALER_SUCCESS":
      return {
        ...state,
        dealer: action.dealer,
      };
    default:
      return state;
  }
};
export default DealerReducer;
