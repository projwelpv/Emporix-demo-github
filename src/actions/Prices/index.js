import { receiveProducts } from "..";
import { get, post } from "../../api/APIController";
import store from "../../Store";

export const getPrices = () => {
  const url = `getAllPrices`;

  return (dispatch) => {
    get(url)
      .then((response) => {
        if (response.status == 200) {
          dispatch({
            type: "GET_ALL_PRICES",
            prices: response.data,
          });
        }
      })
      .catch()
      .finally();
  };

  
};
