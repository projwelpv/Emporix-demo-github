import { receiveProducts } from "..";
import { get, post } from "../../api/APIController";
import store from "../../Store";
export const signUpCustomer = (params) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return post("createCustomer", params)
        .then((response) => {
          console.log("Signup Response", response);
          if (response.status == 200) {
            if (response.data.status && response.data.status == 409) {
              resolve({ status: false, message: response.data.detail });
              return;
            }
          }

          if (response.status == 201) {
            console.log("ASdasdasd");
            dispatch({
              type: "SIGN_UP_SUCCESS",
              user: response.data.data,
            });
            resolve({ status: true, message: "Successfully registered" });
          } else {
            console.log("errorASdasdasd");
            resolve({ status: false, message: "Something went wrong" });
          }
        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally();
    });
  };
};
