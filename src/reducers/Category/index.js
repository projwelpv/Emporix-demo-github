/***
 *  CATEGORY Reducers
 ***/

const initialState = {
  category: [],
};
const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORY_SUCCESS":
      return {
        ...state,
        category: action.category,
      };
    default:
      return state;
  }
};
export default CategoryReducer;
