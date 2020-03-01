const initialValue = {
  productData: [],
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false
};

const productReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_PRODUCT_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_PRODUCT_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_PRODUCT_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        productData: action.payload.data
      };
    case "SEARCH_PRODUCT_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "SEARCH_PRODUCT_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "SEARCH_PRODUCT_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        productData: action.payload.data
      };
    case "PAGE_PRODUCT_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "PAGE_PRODUCT_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "PAGE_PRODUCT_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        productData: action.payload.data
      };
    case "POST_PRODUCT_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "POST_PRODUCT_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "POST_PRODUCT_FULFILLED":
      state.productData.concat(action.payload.data.productData);
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        productData: state.productData
      };
    case "DELETE_PRODUCT_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "DELETE_PRODUCT_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "DELETE_PRODUCT_FULFILLED":
      // state.productData.filter(({ id }) => id.id !== action.payload.data.id);
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        productData: state.productData
      };
    case "UPDATE_PRODUCT_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "UPDATE_PRODUCT_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "UPDATE_PRODUCT_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        productData: state.productData
      };
    default:
      return state;
  }
};

export default productReducer;
