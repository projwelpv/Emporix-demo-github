import { receiveProducts } from "..";
import { get, post } from "../../api/APIController";
import store from "../../Store";
import { getCartItems } from "../Cart";
import { extractCustomerID } from "../../utilities/common";
import LocalStorageService from "../../storage/LocalStorageService";
export const loginCustomer = (params) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return post(`login`, params)
        .then((response) => {
          console.log("Login ", response);
          if (response.status === 200) {
            if (
              response.data["status"] !== undefined &&
              response.data.status === 404
            ) {
              resolve(false, response.data.detail);
              return;
            }
          }
          // const foundCustomerId = extractCustomerID(response.data?.scope)
          LocalStorageService.setUserToken(response.data?.accessToken);
          LocalStorageService.setSaasToken(response.data?.saasToken);
          // console.log("login API response", response.data, 'customer id: ', foundCustomerId);
          get("getCustomerDetails")
            .then((response) => {
              if (response.status === 200) {
                LocalStorageService.setCustId(response.data?.id);
                let data = {
                  customerId: response.data?.id,
                  siteCode: "main",
                  type: "shopping",
                  channel: {
                    name: "storefront",
                    source: "https://your-storefront.com/",
                  },
                  currency: "USD",
                };
                dispatch({
                  type: "GET_CUSTOMER_SUCCESS",
                  user: response,
                });
                localStorage.setItem(
                  "customerInfo",
                  JSON.stringify(response.data)
                );
                get(`getCustomerCart/${response.data?.id}`)
                  .then((response) => {
                    if (response.status === 200) {
                      if (response?.data?.id) {
                        dispatch({
                          type: "GET_CUSTOMER_CART",
                          cart: response.data.id,
                        });
                      }

                      resolve(response);
                    } else {
                      resolve(false);
                    }
                  })
                  .catch(() => {
                    post("createCart", data, true)
                      .then((response) => {
                        if (response.status == 201) {
                          dispatch({
                            type: "GET_CUSTOMER_CART",
                            cart: response.data.cartId,
                          });
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      })
                      .finally();
                  })
                  .finally();

                resolve(response);
              } else {
                resolve(false);
              }
            })
            .catch()
            .finally();
          if (response.status === 200) {
            dispatch({
              type: "LOGIN_SUCCESS",
              user: response,
            });
            return true;
          } else {
            return false;
          }
        })
        .catch((error) => {
          console.log("Login error", error);
          return true;
        })
        .finally();
    });
  };
};

export const getCustomerInformation = () => {
  return (dispatch) => {
    return get("getCustomerDetails")
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("customerInfo", JSON.stringify(response.data));
          dispatch({
            type: "GET_CUSTOMER_SUCCESS",
            user: response.data,
          });
          return true;
        } else {
          return false;
        }
      })
      .catch()
      .finally();
  };
};

export const logoutCustomer = (params) => {
  return (dispatch) => {
    dispatch(
      {
        type: "LOGOUT",
        user: {},
      },
      {
        type: "GET_CUSTOMER_CART",
        cart: {},
      }
    );
    LocalStorageService.clearToken();
    localStorage.clear();
    window.location.replace("/");
  };
};

export const associateCart = async () => {
  return new Promise((resolve, reject) => {
    const checkCartIdExist = localStorage.getItem("cartInfo");
    const customerInfo = JSON.parse(localStorage.getItem("customerInfo"));
    if (checkCartIdExist !== null) {
      const cartID = JSON.parse(checkCartIdExist)?.id;
      const cartVersion = Number(JSON.parse(checkCartIdExist)?.version);

      const data = {
        version: cartVersion,
        actions: [
          {
            action: "setCustomerId",
            customerId: customerInfo.id,
          },
          {
            action: "setCustomerEmail",
            email: customerInfo.email,
          },
        ],
      };
      post(`createCustomerCartAssociation/${cartID}`, data)
        .then((response) => {
          console.log(
            "Finished cart association with Logged in User:",
            response
          );
          if (response.status === 200) {
            localStorage.setItem("cartInfo", JSON.stringify(response.data));
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          reject(false);
          console.log(error);
        })
        .finally();
    }
  });
};

export const mergeCart = async (userCartId, guestCartId) => {
  let cartId = guestCartId;
  let data = {
    data: [
      {
        type: "cart_items",
        cart_id: cartId,
      },
    ],
    options: {
      add_all_or_nothing: false,
    },
  };
  return post(`carts/${userCartId}/items`, data);
};

export const getCustomerLoginCart = (token, customerId) => {
  console.log("getCustomerCart", customerId);
  return new Promise((resolve, reject) => {
    get(`get_customer_cart/${token}`)
      .then((response) => {
        console.log("getCustomerCart", response);
        if (response.status == 200) {
          if (response.data.data.length > 0) {
            let loginCartId = response.data.data[0].id;
            let gustCartId = localStorage.getItem("MYID");
            mergeCart(loginCartId, gustCartId).then((response1) => {
              console.log("mergeCartmergeCart", response);
              // localStorage.setItem("MYID", response.data.data[0].id);
              // store.dispatch(getCartItems()).then((result) => {
              //   console.log(
              //     "LocalCartItemsLocalCartItemsLocalCartItems",
              //     result
              //   );
              //   localStorage.setItem("LocalCartItems", JSON.stringify(result));
              //   window.location.reload();
              // });
            });
          } else {
            let dataParams = {
              data: [
                {
                  type: "customer",
                  id: customerId,
                },
              ],
            };
            associateCart(dataParams);
          }
          return true;
        } else {
          return false;
        }
      })
      .catch()
      .finally();
  });
};
