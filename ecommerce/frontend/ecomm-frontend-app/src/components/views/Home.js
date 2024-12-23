import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../state/actions/product";
import Loading from "./Loading";
import AlertMessage from "./AlertMessage";
import { useLocation } from "react-router-dom";
import Paginate from "../Paginate";
import ProductCarousel from "./ProductCarousel";

// import { useState } from "react";
// import axios from "axios";
// import products from "../../products_mock_data";

function Home() {
  const dispatch = useDispatch();
  const location = useLocation();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keywordSearch = location.search;
  // console.log("Homepage, Search query = ", keywordSearch);

  useEffect(() => {
    dispatch(listProducts(keywordSearch));
  }, [dispatch, keywordSearch]);

  const the_products = products;

  // - inital build
  // const [the_products, set_the_products] = useState([]);
  /*
  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get("/api/all-products/");
      set_the_products(data);
    }
    fetchProducts();
  }, []);
  */

  return (
    <div>
      <h1>Welcome, to our online shop.</h1>

      {!keywordSearch && (
        <>
          <ProductCarousel></ProductCarousel>
        </>
      )}

      <h2>Latest inventory</h2>
      <div>
        <Row>
          {loading ? (
            <Loading />
          ) : error ? (
            <AlertMessage variant='alert-danger'>
              There was an error
            </AlertMessage>
          ) : (
            the_products.map((item) => (
              <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
                <Product product_data={item} />
              </Col>
            ))
          )}
        </Row>

        <Row>
          <Paginate pages={pages} page={page} keyword={keywordSearch} />
        </Row>
      </div>
    </div>
  );
}

export default Home;
