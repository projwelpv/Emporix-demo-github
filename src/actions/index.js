import Axios from "axios";
import ProductsList from "../api/product.json";
import Request from "../api/config/Interceptor";
import { get } from "../api/APIController";

export const receiveProducts = (categoryData) => {
  return (dispatch) => {
    const productdata = ProductsList;

    return get("getAllProducts")
      .then((response) => {
        console.log("GET PRODUCT", response.data);
        if (response.status == 200) {
          // let data = response.data.data.filter((info) => info.status == "live");
          let products = response.data

          // data.map((info) => {
          //   let category = [];
          //   if (info.relationships.categories) {
          //     info.relationships.categories.data.forEach((info) => {
          //       categoryData.data.forEach((catInfo) => {
          //         if (catInfo.id == info.id) {
          //           category.push(catInfo.name);
          //         }
          //       });
          //     });
          //   }

          //   let product = {
          //     id: info.id,
          //     name: info.name,
          //     pictures: [
          //       info.relationships.main_image
          //         ? `https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/73101adf-a3b2-4b36-b040-0cc4fe7b7df1/${info.relationships.main_image.data.id}.png`
          //         : info.image
          //         ? info.image.href
          //         : "",
          //     ],
          //     stock: info.status == "draft" ? 0 : 1,
          //     price: info.meta.display_price.with_tax.amount / 100,
          //     discount: 0,
          //     salePrice: info.meta.display_price.with_tax.amount / 100,
          //     description: info.description,
          //     rating: 4,
          //     tags: category,
          //     size: ["100 CM", "90 CM", "95 CM"],
          //     sku: info.sku,
          //     category: "",
          //     colors: ["black", "gray", "red"],
          //   };
          //   products.push(product);
          // });
          
          dispatch({
            type: "ACTUAL_PRODUCTS",
            products: products,
          });
        }
      })
      .catch()
      .finally();
  };
};
