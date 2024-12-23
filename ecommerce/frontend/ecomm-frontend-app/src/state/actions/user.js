import { user_constants } from "../../utl/constants_user";
import axios from "axios";
import { order_constants } from "../../utl/constants_order";

export const login = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: user_constants.USER_LOGIN,
    });

    const configuration = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/user/token/",
      {
        username: email,
        password: password,
      },
      configuration
    );

    dispatch({
      type: user_constants.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: user_constants.USER_LOGIN_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userDetails");
  dispatch({ type: user_constants.USER_LOGOUT });
  dispatch({ type: user_constants.USER_DETAIL_RESET });
  dispatch({ type: order_constants.ORDER_LIST_PURCHASES_RESET });
  dispatch({ type: user_constants.USER_LIST_ALL_USERS_RESET });
};

export const register =
  (email, password, name) => async (dispatch, getState) => {
    try {
      dispatch({
        type: user_constants.USER_REGISTER,
      });

      const configuration = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/user/register/",
        {
          email: email,
          password: password,
          name: name,
        },
        configuration
      );

      dispatch({
        type: user_constants.USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: user_constants.USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: user_constants.USER_REGISTER_FAILED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail // so we can use custom error messaging
            : error.message,
      });
    }
  };

export const update_get = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: user_constants.USER_DETAIL,
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

    const { data } = await axios.get(`/user/${id}/`, configuration);

    dispatch({
      type: user_constants.USER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: user_constants.USER_DETAIL_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};

export const update_user_profile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: user_constants.USER_PROFILE_UPDATE,
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

    const { data } = await axios.put(`/user/update/`, user, configuration);

    console.log("reducer, update user, returned data\n", JSON.stringify(data));

    dispatch({
      type: user_constants.USER_PROFILE_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: user_constants.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: user_constants.USER_PROFILE_UPDATE_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};

export const get_all_users = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: user_constants.USER_LIST_ALL_USERS,
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

    const { data } = await axios.get(`/user/`, configuration);

    dispatch({
      type: user_constants.USER_LIST_ALL_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: user_constants.USER_LIST_ALL_USERS_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};

export const delete_user = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: user_constants.USER_DELETE,
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

    const { data } = await axios.delete(`/user/delete/${id}/`, configuration);

    dispatch({
      type: user_constants.USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: user_constants.USER_DELETE_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};

export const admin_get_user_details = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: user_constants.USER_DETAIL_BY_ADMIN,
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
      `/user/admin/user-profile/${id}/`,
      configuration
    );

    console.log("admin, get user details\n", JSON.stringify(data));

    dispatch({
      type: user_constants.USER_DETAIL_BY_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: user_constants.USER_DETAIL_BY_ADMIN_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};

export const admin_update_user = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: user_constants.USER_UPDATE_BY_ADMIN,
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
      `/user/admin/update-user/${user.id}/`,
      user,
      configuration
    );

    dispatch({
      type: user_constants.USER_UPDATE_BY_ADMIN_SUCCESS,
    });

    dispatch({
      type: user_constants.USER_DETAIL_BY_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: user_constants.USER_UPDATE_BY_ADMIN_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};
