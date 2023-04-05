/***
 *  SLIDER Reducers
 ***/

const initialState = {
  slider: [],
};
const SliderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CONTENT_SUCCESS":
      return {
        ...state,
        slider: action.slider,
      };
    default:
      return state;
  }
};
export default SliderReducer;
