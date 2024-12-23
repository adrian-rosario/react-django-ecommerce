import { constants as cartConstants } from "../../utl/constants";
import { order_constants as constants } from "../../utl/constants_order";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.ORDER_CREATE,
    });

    const {
      userLogin: { userDetails },
    } = getState();

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.post(`/order/`, order, configuration);

    console.log("reducer, order, returned data\n", JSON.stringify(data));

    dispatch({
      type: constants.ORDER_CREATE_SUCCESS,
      payload: data,
    });

    console.log("shouild be clearing items... 🥴");

    dispatch({
      type: cartConstants.CART_CLEAR_ITEMS,
      payload: data,
    });

    localStorage.removeItem("cartStorage");
  } catch (error) {
    dispatch({
      type: constants.ORDER_CREATE_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.ORDER_DETAIL,
    });

    const {
      userLogin: { userDetails },
    } = getState();

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.get(`/order/view/${id}`, configuration);

    dispatch({
      type: constants.ORDER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.ORDER_DETAIL_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};

export const setOrderAsPaid =
  (id, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.ORDER_PAY,
      });

      const {
        userLogin: { userDetails },
      } = getState();

      const configuration = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails.token}`,
        },
      };

      const { data } = await axios.put(
        `/order/view/${id}/paid/`,
        paymentResult,
        configuration
      );

      dispatch({
        type: constants.ORDER_PAY_SUCCESS,
        payload: data,
      });

      // dispatch({
      //   type: constants.ORDER_PAY_RESET,
      // });
    } catch (error) {
      dispatch({
        type: constants.ORDER_PAY_FAILED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail // so we can use custom error messaging
            : error.message,
      });
    }
  };

export const getOrderHistory = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.ORDER_LIST_PURCHASES,
    });

    const {
      userLogin: { userDetails },
    } = getState();

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.get(`/order/view/orders/`, configuration);

    dispatch({
      type: constants.ORDER_LIST_PURCHASES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.ORDER_LIST_PURCHASES_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};

export const adminListOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.ORDER_ADMIN_LIST_ORDERS,
    });

    const {
      userLogin: { userDetails },
    } = getState();

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.get(
      `/order/admin-view/orders/`,
      configuration
    );

    dispatch({
      type: constants.ORDER_ADMIN_LIST_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.ORDER_ADMIN_LIST_ORDERS_RESET,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};

export const adminSetOrderAsDelivered =
  (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.ORDER_ADMIN_SET_ORDER_DELIVERED,
      });

      const {
        userLogin: { userDetails },
      } = getState();

      const configuration = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails.token}`,
        },
      };

      const { data } = await axios.put(
        `/order/shipped/${order.id}`,
        {},
        configuration
      );

      dispatch({
        type: constants.ORDER_ADMIN_SET_ORDER_DELIVERED_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: constants.ORDER_ADMIN_SET_ORDER_DELIVERED_FAILED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail // so we can use custom error messaging
            : error.message,
      });
    }
  };

export const adminDeleteOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.ORDER_ADMIN_DELETE_ORDER,
    });

    const {
      userLogin: { userDetails },
    } = getState();

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.delete(
      `/order/admin-view/delete/${id}`,
      configuration
    );

    dispatch({
      type: constants.ORDER_ADMIN_DELETE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.ORDER_ADMIN_DELETE_ORDER_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};
