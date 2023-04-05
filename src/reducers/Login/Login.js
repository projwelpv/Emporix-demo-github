/***
 *  Login Reducers
 ***/

const initialState = {
  user: null,
};
const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.user.data,
      };
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        // user: action.user,
      };
    case "GET_CUSTOMER_SUCCESS":
      console.log("yatus", state.user);
      let customer_id = "";
      if (action.user.data && action.user.data["id"] != undefined) {
        customer_id = action.user.data.id;
      } else {
        customer_id = state.user.id;
      }
      console.log("cusomer", customer_id);
      return {
        ...state,
        user: {
          ...action.user.data,
          token: state.user.token,
          customer_id: customer_id,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};
export default LoginReducer;
