import { order_constants as constants } from "../../utl/constants_order";

export const orderCreate = (state = {}, action) => {
  switch (action.type) {
    case constants.ORDER_CREATE:
      return {
        loading: true,
      };

    case constants.ORDER_CREATE_SUCCESS:
      console.log("order create success");
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case constants.ORDER_CREATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case constants.ORDER_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDetail = (
  state = { loading: true, order: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case constants.ORDER_DETAIL:
      return {
        ...state,
        loading: true,
      };

    case constants.ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case constants.ORDER_DETAIL_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderPay = (state = {}, action) => {
  switch (action.type) {
    case constants.ORDER_PAY:
      return {
        loading: true,
      };

    case constants.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case constants.ORDER_PAY_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case constants.ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const orderHistory = (state = {}, action) => {
  switch (action.type) {
    case constants.ORDER_LIST_PURCHASES:
      return { loading: true };

    case constants.ORDER_LIST_PURCHASES_SUCCESS:
      return {
        loading: false,
        purchases: action.payload,
      };
    case constants.ORDER_LIST_PURCHASES_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case constants.ORDER_LIST_PURCHASES_RESET:
      return {};

    default:
      return state;
  }
};

export const adminGetOrders = (state = { orders: [] }, action) => {
  switch (action.type) {
    case constants.ORDER_ADMIN_LIST_ORDERS:
      return { loading: true };

    case constants.ORDER_ADMIN_LIST_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case constants.ORDER_ADMIN_LIST_ORDERS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    // TODO: cleanup/not needed?
    case constants.ORDER_ADMIN_LIST_ORDERS_RESET:
      return {
        orders: [],
      };

    default:
      return state;
  }
};

export const adminSetOrderDelivered = (state = {}, action) => {
  switch (action.type) {
    case constants.ORDER_ADMIN_SET_ORDER_DELIVERED:
      return { loading: true };

    case constants.ORDER_ADMIN_SET_ORDER_DELIVERED_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case constants.ORDER_ADMIN_SET_ORDER_DELIVERED_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case constants.ORDER_ADMIN_SET_ORDER_DELIVERED_RESET:
      return {};

    default:
      return state;
  }
};

export const adminOrderDelete = (state = {}, action) => {
  switch (action.type) {
    case constants.ORDER_ADMIN_DELETE_ORDER:
      return { loading: true };

    case constants.ORDER_ADMIN_DELETE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case constants.ORDER_ADMIN_DELETE_ORDER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
