import React, { useEffect } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  deleteProduct,
  adminAddEmptyProduct,
} from "../../state/actions/product";
import Loading from "./Loading";
import AlertMessage from "./AlertMessage";
import { useNavigate } from "react-router-dom";
import { constants } from "../../utl/constants";
import Paginate from "../Paginate";
import { useLocation } from "react-router-dom";

export default function AdminEditProducts() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;
  const navigate = useNavigate();

  const adminDeleteProduct = useSelector((state) => state.adminDeleteProduct);
  const {
    loading: adminDeleteLoading,
    error: adminDeleteError,
    success: adminDeleteSuccess,
  } = adminDeleteProduct;

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const adminAddEmptyProductState = useSelector(
    (state) => state.adminAddEmptyProduct
  );
  const {
    loading: adminAddEmptyLoading,
    success: adminAddEmptySuccess,
    product: emptyProduct,
    error: adminAddEmptyError,
  } = adminAddEmptyProductState;

  // Pagination
  const location = useLocation();
  let keywordSearch = location.search;

  useEffect(() => {
    dispatch({ type: constants.PRODUCT_ADMIN_RESET });

    if (userDetails && userDetails.is_admin) {
      dispatch(listProducts(keywordSearch));
    } else {
      navigate("/login");
    }

    if (adminAddEmptySuccess) {
      navigate(`/admin-edit-product/${emptyProduct.id}`);
    }
  }, [
    dispatch,
    adminDeleteSuccess,
    navigate,
    userDetails,
    adminAddEmptySuccess,
    emptyProduct,
    keywordSearch,
  ]);

  const handleAddNewProduct = () => {
    // console.log("add new product...");
    dispatch(adminAddEmptyProduct());
  };

  const handleEditProduct = (id) => {
    // console.log("edit: ", id);
    navigate(`/admin-edit-product/${id}`);
  };

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Are you sure you want to delete: ${name}?`)) {
      // console.log("delete ", id);
      dispatch(deleteProduct(id));
    }
  };
  return (
    <div>
      <Row className='align-items-center'>
        <Col>
          <h3>Products, Admin view</h3>
        </Col>
        <Col className='d-flex'>
          <Button
            type='button'
            onClick={handleAddNewProduct}
            className='ms-auto'
          >
            Add New &nbsp; <i className='fas fa-plus'></i>
          </Button>
        </Col>
      </Row>

      {adminDeleteLoading && <Loading />}
      {adminDeleteError && (
        <AlertMessage variant='danger'>{adminDeleteError}</AlertMessage>
      )}

      <div>
        {loading && <Loading />}
        {error && <AlertMessage variant='danger'>{error}</AlertMessage>}

        {adminAddEmptyLoading && <Loading />}
        {adminAddEmptyError && (
          <AlertMessage variant='danger'>{adminAddEmptyError}</AlertMessage>
        )}

        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th className='text-center'>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th className='text-center'>In Stock</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((item) => (
                <tr key={item.id}>
                  <td className='text-center align-middle'>{item.id}</td>
                  <td className='align-middle'>{item.name}</td>
                  <td className='align-middle'>${item.price}</td>
                  <td className='align-middle'>{item.category}</td>
                  <td className='align-middle'>{item.brand}</td>
                  <td className='text-center align-middle'>
                    {item.countInStock}
                  </td>
                  <td className='text-center align-middle'>
                    <Button
                      variant='light'
                      className='button-sm mx-2'
                      type='button'
                      onClick={() => handleEditProduct(item.id)}
                    >
                      <i className='fas fa-edit'></i>
                    </Button>

                    <Button
                      variant='danger'
                      className='btn-sm'
                      type='button'
                      onClick={() => handleDeleteProduct(item.id, item.name)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keywordSearch}
            isAdmin={true}
          />
        </Row>
      </div>
    </div>
  );
}
