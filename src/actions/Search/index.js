import Axios from "axios";
import ProductsList from "../../api/product.json";
import Request from "../../api/config/Interceptor";
import { get } from "../../api/APIController";
import { receiveProducts } from "..";
import store from "../../Store";
export const getSearchProduct = (searchText, category) => {
  return (dispatch) => {
    if (searchText && searchText.length > 0) {
      return get(`algolia_query/product/${searchText}/2000`)
        .then((response) => {
          if (response.status == 200) {
            let data = response.data.hits;
            let products = [];

            data.map((info) => {
              let product = {
                id: info.objectID,
                name: info.name,
                pictures: [info.imgUrl],
                stock: info.status == "draft" ? 0 : 1,
                price: info.amount / 100,
                discount: 0,
                salePrice: info.amount / 100,
                description: info.description,
                rating: 4,
                tags: info.categories,
                size: ["100 CM", "90 CM", "95 CM"],
                sku: info.slug,
                category: info.categories,
                colors: ["black", "gray", "red"],
              };
              products.push(product);
            });
            dispatch({
              type: "ACTUAL_PRODUCTS",
              products: products,
            });

            return { status: 200, searchText: searchText };
          } else {
            return { status: 400, searchText: searchText };
          }
        })
        .catch((error) => {
          return { status: 400, searchText: searchText };
        })
        .finally();
    } else {
      return new Promise((resolve, reject) => {
        store.dispatch(receiveProducts(category)).then(() => {
          resolve({ status: 200, searchText: searchText });
        });
      });
    }
  };
};
