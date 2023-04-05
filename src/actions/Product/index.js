import { receiveProducts } from "..";
import { get, post } from "../../api/APIController";
import store from "../../Store";
export const getProductById = (id) => {
  const url = `getProductById/${id}`;
  let baseId;

  return (dispatch) => {
    get(url)
      .then((response) => {
        if (response.status == 200) {
          response.data.masterData.current.masterVariant.attributes.map(
            (each, index) => {
              if (each.name === "baseId") {
                return (baseId = each.value);
              }
            }
          );

          dispatch({
            type: "GET_PRODUCT",
            products: baseId,
          });
        }
      })
      .catch()
      .finally();
  };
};
//GET_SELLER_NAME
export const getSellerName = (id) => {
  const url = `get-dealer_details/${id}`;

  return (dispatch) => {
    get(url)
      .then((response) => {
        if (response.status == 200) {
          dispatch({
            type: "GET_SELLER_NAME",
            products: response?.data[0]?.dealer_Name,
          });
        }
      })
      .catch()
      .finally();
  };

  //   get(url)
  //     .then((response) => {
  //       if (response?.data[0]?.dealer_Name) {
  //         localStorage.setItem(
  //           "soldbyname",
  //           JSON.stringify(response?.data[0]?.dealer_Name)
  //         );
  //       } else {
  //         localStorage.clear("soldbyname");
  //       }
  //     })
  //     .catch()
  //     .finally();
};
