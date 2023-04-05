import { get } from "../../../api/APIController";
import store from "../../../Store";
export const getContent = () => {
  get("getcontent")
    .then((response) => {
      if (response.status == 200) {
        console.log("responseCONTENT", response);
        store.dispatch({
          type: "GET_CONTENT_SUCCESS",
          slider: response.data ? response.data.items : [],
        });
      }
    })
    .catch((error) => {})
    .finally();
};
