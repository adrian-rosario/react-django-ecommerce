import { constants } from "../../utl/constants";
import axios from "axios";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/product/${id}`);

  dispatch({
    type: constants.CART_ADD,
    payload: {
      product: data.id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity: quantity,
    },
  });

  // console.log("cart from state\n", JSON.stringify(getState().cart/*.cartItems*/));
  localStorage.setItem("cartStorage", JSON.stringify(getState().cart));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: constants.CART_REMOVE,
    payload: id,
  });
  localStorage.setItem("cartStorage", JSON.stringify(getState().cart));
};

export const saveShippingDetails = (data) => (dispatch) => {
  dispatch({
    type: constants.CART_SAVE_SHIPPING,
    payload: data,
  });
  localStorage.setItem("shippingDetails", JSON.stringify(data));
};

export const savePaymentDetails = (data) => (dispatch) => {
  dispatch({
    type: constants.CART_SAVE_PAYMENT,
    payload: data,
  });
  localStorage.setItem("paymentDetails", JSON.stringify(data));
};
