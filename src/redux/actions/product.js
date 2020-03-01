import Axios from "axios";

export const searchProduct = keyword => {
  return {
    type: "SEARCH_PRODUCT", // string yang mendiskripsikan perintah
    payload: Axios.get(`http://localhost:4002/api/v1/shop/search/${keyword}`)
  };
};
export const getProduct = keyword => {
  return {
    type: "GET_PRODUCT", // string yang mendiskripsikan perintah
    payload: Axios.get(`http://localhost:4002/api/v1/product/`)
  };
};

export const postProduct = fde => {
  return {
    type: "POST_PRODUCT",
    payload: Axios.post("http://localhost:4002/api/v1/product", fde)
  };
};
export const deleteProduct = id => {
  return {
    type: "DELETE_PRODUCT",
    payload: Axios.delete(`http://localhost:4002/api/v1/product/${id}`)
  };
};
export const updateProduct = (fd, id) => {
  return {
    type: "UPDATE_PRODUCT",
    payload: Axios.patch(`http://localhost:4002/api/v1/product/${id}`, fd)
  };
};
export const pageProduct = page => {
  return {
    type: "PAGE_PRODUCT",
    payload: Axios.get(`http://localhost:4002/api/v1/product/${page}`)
  };
  // ${page}
};
