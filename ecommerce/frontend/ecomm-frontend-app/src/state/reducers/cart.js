import { constants } from "../../utl/constants";

export const cartReducer = (
  state = { cart: [], shippingDetails: {} },
  action
) => {
  switch (action.type) {
    case constants.CART_ADD:
      // -
      const newItem = action.payload;
      // console.log("new item:\n", newItem);

      let existingItem;

      if (state.cart) {
        existingItem = state.cart.find(
          (item) => item.product === newItem.product // id, not the object
        );
      }

      if (existingItem) {
        // console.log("existing item");
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product === existingItem.product ? newItem : item
          ),
        };
      } else {
        // console.log("not an exiting item");
        return {
          ...state,
          cart: state.cart ? [newItem, ...state.cart] : [newItem],
        };
      }

    case constants.CART_REMOVE:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product !== action.payload),
      };

    case constants.CART_SAVE_SHIPPING:
      return {
        ...state,
        shippingDetails: action.payload,
      };

    case constants.CART_SAVE_PAYMENT:
      return {
        ...state,
        paymentDetails: action.payload,
      };

    case constants.CART_CLEAR_ITEMS:
      console.log("clear items called");
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};
