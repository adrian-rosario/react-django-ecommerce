import { user_constants } from "../../utl/constants_user";

export const userLogin = (state = {}, action) => {
  switch (action.type) {
    case user_constants.USER_LOGIN:
      return { loading: true };

    case user_constants.USER_LOGIN_SUCCESS:
      return { loading: false, userDetails: action.payload };

    case user_constants.USER_LOGIN_FAILED:
      return { loading: false, error: action.payload };

    case user_constants.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegister = (state = {}, action) => {
  switch (action.type) {
    case user_constants.USER_REGISTER:
      return { loading: true };

    case user_constants.USER_REGISTER_SUCCESS:
      return { loading: false, userDetails: action.payload };

    case user_constants.USER_REGISTER_FAILED:
      return { loading: false, error: action.payload };

    case user_constants.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userDetails = (state = { user: {} }, action) => {
  switch (action.type) {
    case user_constants.USER_DETAIL:
      return { ...state, loading: true };

    case user_constants.USER_DETAIL_SUCCESS:
      return { loading: false, user: action.payload };

    case user_constants.USER_DETAIL_FAILED:
      return { loading: false, error: action.payload };

    case user_constants.USER_DETAIL_RESET:
      return { user: {} };

    default:
      return state;
  }
};

export const userProfileUpdate = (state = {}, action) => {
  switch (action.type) {
    case user_constants.USER_PROFILE_UPDATE:
      return { loading: true };

    case user_constants.USER_PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true, userDetails: action.payload };

    case user_constants.USER_PROFILE_UPDATE_FAILED:
      return { loading: false, error: action.payload };

    case user_constants.USER_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

export const listAllUsers = (state = { users: [] }, action) => {
  switch (action.type) {
    case user_constants.USER_LIST_ALL_USERS:
      return { loading: true };

    case user_constants.USER_LIST_ALL_USERS_SUCCESS:
      return { loading: false, users: action.payload };

    case user_constants.USER_LIST_ALL_USERS_FAILED:
      return { loading: false, error: action.payload };

    case user_constants.USER_LIST_ALL_USERS_RESET:
      return { users: [] };

    default:
      return state;
  }
};

export const deleteUser = (state = {}, action) => {
  switch (action.type) {
    case user_constants.USER_DELETE:
      return { loading: true };

    case user_constants.USER_DELETE_SUCCESS:
      return { loading: false, success: true };

    case user_constants.USER_DELETE_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userDetailsByAdmin = (state = { userDetails: {} }, action) => {
  switch (action.type) {
    case user_constants.USER_DETAIL_BY_ADMIN:
      return { ...state, loading: true };

    case user_constants.USER_DETAIL_BY_ADMIN_SUCCESS:
      return { loading: false, userDetails: action.payload };

    case user_constants.USER_DETAIL_BY_ADMIN_FAILED:
      return { loading: false, error: action.payload };

    case user_constants.USER_DETAIL_BY_ADMIN_RESET:
      return { userDetails: {} };

    default:
      return state;
  }
};

export const userUpdateByAdmin = (state = { user: {} }, action) => {
  switch (action.type) {
    case user_constants.USER_UPDATE_BY_ADMIN:
      return { loading: true };

    case user_constants.USER_UPDATE_BY_ADMIN_SUCCESS:
      return { loading: false, success: true };

    case user_constants.USER_UPDATE_BY_ADMIN_FAILED:
      return { loading: false, error: action.payload };

    case user_constants.USER_UPDATE_BY_ADMIN_RESET:
      return { user: {} };

    default:
      return state;
  }
};
