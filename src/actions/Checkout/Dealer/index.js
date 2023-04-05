import { get } from "../../../api/APIController";
import store from "../../../Store";
export const getDealer = (zipcode = 78204) => {
  return (dispatch) => {
    get(`get-dealers/${zipcode}`)
      .then((response) => {
        if (response.status == 200) {
          dispatch({
            type: "GET_DEALER_SUCCESS",
            dealer: response.data,
          });
        }
      })
      .catch()
      .finally();
  };
};
