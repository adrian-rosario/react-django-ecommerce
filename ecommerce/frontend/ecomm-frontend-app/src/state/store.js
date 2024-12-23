import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  productLists,
  productItem,
  adminDeleteProduct,
  adminAddEmptyProduct,
  adminEditProduct,
  productAddedReview,
  productTopProducts,
} from "./reducers/product";
import { cartReducer } from "./reducers/cart";
import {
  userLogin,
  userRegister,
  userDetails,
  userProfileUpdate,
  listAllUsers,
  deleteUser,
  userDetailsByAdmin,
  userUpdateByAdmin,
} from "./reducers/user";
import {
  orderCreate,
  orderDetail,
  orderPay,
  orderHistory,
  adminGetOrders,
  adminSetOrderDelivered,
  adminOrderDelete,
} from "./reducers/order";

const reducer = combineReducers({
  cart: cartReducer,
  orderDetail,
  order: orderCreate,
  orderPay,
  orderHistory,
  productList: productLists,
  productItem,
  productAddedReview,
  productTopProducts,
  adminDeleteProduct,
  adminAddEmptyProduct,
  adminEditProduct,
  adminGetOrders,
  adminSetOrderDelivered,
  adminOrderDelete,
  userLogin,
  userRegister,
  userDetails,
  userUpdateProfile: userProfileUpdate,
  listAllUsers,
  deleteUser,
  userDetailsByAdmin,
  userUpdateByAdmin,
});

const cartFromLocalStorage = localStorage.getItem("cartStorage")
  ? JSON.parse(localStorage.getItem("cartStorage"))
  : [];

const userFromLocalStorage = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : null;

const shippingFromLocalStorage = localStorage.getItem("shippingDetails")
  ? JSON.parse(localStorage.getItem("shippingDetails"))
  : {};

const initialState = {
  cart: {
    cart: cartFromLocalStorage.cart,
    shippingDetails: shippingFromLocalStorage,
  },
  userLogin: { userDetails: userFromLocalStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
