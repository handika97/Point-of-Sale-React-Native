// import Axios from "axios";

export const postCart = addCart => {
  //   console.log(id_item);
  //   console.log(qty);
  //   let data = {
  //     id_item: id_item,
  //     qty: qty
  //   };
  return {
    type: "POST_CART", // string yang mendiskripsikan perintah
    payload: addCart
    //Axios.post("http://localhost:4002/api/v1/shop/1", data)
  };
};

export const getCart = () => {
  return {
    type: "GET_CART",
    payload: getCart
  };
};
