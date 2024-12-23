import { constants } from "../../utl/constants";
import axios from "axios";

export const listProducts =
  (search = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: constants.PRODUCT_LIST });
      const { data } = await axios.get(`/api/all-products/${search}`);

      dispatch({ type: constants.PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: constants.PRODUCT_FAILED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail // so we can use custom error messaging
            : error.message,
      });
    }
  };

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.PRODUCT_ADMIN_DELETE,
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
      `/api/admin/delete-product/${id}`,
      configuration
    );

    dispatch({
      type: constants.PRODUCT_ADMIN_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.PRODUCT_ADMIN_DELETE_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};

export const adminAddEmptyProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.PRODUCT_ADMIN_ADD_EMPTY,
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

    const { data } = await axios.post(
      `/api/admin/add-empty-product/`,
      {},
      configuration
    );

    dispatch({
      type: constants.PRODUCT_ADMIN_ADD_EMPTY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.PRODUCT_ADMIN_ADD_EMPTY_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};

export const adminEditProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.PRODUCT_ADMIN_EDIT_PRODUCT,
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
      `/api/admin/edit-product/${product.id}`,
      product,
      configuration
    );

    dispatch({
      type: constants.PRODUCT_ADMIN_EDIT_PRODUCT_SUCCESS,
      payload: data,
    });

    // to reload the newly edited Product
    dispatch({
      type: constants.PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.PRODUCT_ADMIN_EDIT_PRODUCT_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};

export const productAddReview = (id, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.PRODUCT_ADD_REVIEW,
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

    const { data } = await axios.post(
      `/api/create-review/${id}`,
      review,
      configuration
    );

    dispatch({
      type: constants.PRODUCT_ADD_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.PRODUCT_ADD_REVIEW_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};

export const listTopRatedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: constants.PRODUCT_TOP_RATED });
    const { data } = await axios.get(`/api/top-products/`);

    dispatch({ type: constants.PRODUCT_TOP_RATED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.PRODUCT_TOP_RATED_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};
