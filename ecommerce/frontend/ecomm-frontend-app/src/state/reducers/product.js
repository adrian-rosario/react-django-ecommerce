import { constants } from "../../utl/constants";

export const productLists = (state = { products: [] }, action) => {
  switch (action.type) {
    case constants.PRODUCT_LIST:
      return { loading: true, products: [] };

    case constants.PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case constants.PRODUCT_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productItem = (state = { product: {} }, action) => {
  switch (action.type) {
    case constants.PRODUCT_DETAIL_LIST:
      return { loading: true, product: {} };

    case constants.PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload };

    case constants.PRODUCT_DETAIL_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const adminDeleteProduct = (state = {}, action) => {
  switch (action.type) {
    case constants.PRODUCT_ADMIN_DELETE:
      return { loading: true };

    case constants.PRODUCT_ADMIN_DELETE_SUCCESS:
      return { loading: false, success: true };

    case constants.PRODUCT_ADMIN_DELETE_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const adminAddEmptyProduct = (state = {}, action) => {
  switch (action.type) {
    case constants.PRODUCT_ADMIN_ADD_EMPTY:
      return { loading: true };

    case constants.PRODUCT_ADMIN_ADD_EMPTY_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case constants.PRODUCT_ADMIN_ADD_EMPTY_FAILED:
      return { loading: false, error: action.payload };

    case constants.PRODUCT_ADMIN_RESET:
      return {};

    default:
      return state;
  }
};

export const adminEditProduct = (state = { product: {} }, action) => {
  switch (action.type) {
    case constants.PRODUCT_ADMIN_EDIT_PRODUCT:
      return { loading: true };

    case constants.PRODUCT_ADMIN_EDIT_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case constants.PRODUCT_ADMIN_EDIT_PRODUCT_FAILED:
      return { loading: false, error: action.payload };

    case constants.PRODUCT_ADMIN_EDIT_PRODUCT_RESET:
      return { product: {} };

    default:
      return state;
  }
};

export const productAddedReview = (state = {}, action) => {
  switch (action.type) {
    case constants.PRODUCT_ADD_REVIEW:
      return { loading: true };

    case constants.PRODUCT_ADD_REVIEW_SUCCESS:
      return { loading: false, success: true };

    case constants.PRODUCT_ADD_REVIEW_FAILED:
      return { loading: false, error: action.payload };

    case constants.PRODUCT_ADD_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};

export const productTopProducts = (state = { products: [] }, action) => {
  switch (action.type) {
    case constants.PRODUCT_TOP_RATED:
      return { loading: true, products: [] };

    case constants.PRODUCT_TOP_RATED_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case constants.PRODUCT_TOP_RATED_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
