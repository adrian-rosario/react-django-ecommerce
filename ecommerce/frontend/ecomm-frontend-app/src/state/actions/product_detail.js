import { constants } from "../../utl/constants";
import axios from "axios";

export const listProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: constants.PRODUCT_DETAIL_LIST });
    const { data } = await axios.get(`/api/product/${id}`);

    dispatch({ type: constants.PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.PRODUCT_DETAIL_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // so we can use custom error messaging
          : error.message,
    });
  }
};
