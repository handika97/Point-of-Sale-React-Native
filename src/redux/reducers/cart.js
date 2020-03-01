const initialValue = {
  cartData: [],
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false
};

const cartReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_CART_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_CART_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_CART_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        cartData: state.cartData
      };
    case "POST_CART_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "POST_CART_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload
      };
    case "POST_CART_FULFILLED":
      if (state.cardData.length === 0) {
        let cart = state.cartData;
        cart.push(action.payload);
        state.cartData = cart;
      } else {
        state.cartData = [...state.cartData, action.payload];
      }
      //   state.cartData.concat(action.payload.data);
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        cartData: state.cartData
      };

    default:
      return state;
  }
};

export default cartReducer;
