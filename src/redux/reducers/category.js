const initialValue = {
  categoryData: [],
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false
};

const categoryReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_CATEGORY_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_CATEGORY_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_CATEGORY_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        categoryData: action.payload.data
      };
    case "POST_CATEGORY_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "POST_CATEGORY_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "POST_CATEGORY_FULFILLED":
      state.categoryData.concat(action.payload.data.categoryData);
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        categoryData: state.categoryData
      };
    case "DELETE_CATEGORY_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "DELETE_CATEGORY_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "DELETE_CATEGORY_FULFILLED":
      state.categoryData.filter(({ id }) => id.id !== action.payload.data.id);
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        categoryData: state.categoryData
      };
    case "UPDATE_CATEGORY_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "UPDATE_CATEGORY_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "UPDATE_CATEGORY_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        categoryData: action.payload.data
      };
    default:
      return state;
  }
};

export default categoryReducer;
