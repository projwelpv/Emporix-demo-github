
import { receiveProducts } from "..";
import { get } from "../../api/APIController";
import store from "../../Store";
export const getCategory = () => {
  return (dispatch) => {
   get('getAllProducts')
      .then((response) => {
        if (response.status == 200) {
            store.dispatch(receiveProducts(response.data));
          dispatch({
            type: "GET_CATEGORY_SUCCESS",
            category: response.data,
          });
        }
      })
      .catch()
      .finally();
  };
};