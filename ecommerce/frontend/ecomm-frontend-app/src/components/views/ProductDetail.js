import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Rating from "./Rating";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../state/actions/product_detail";
import Loading from "./Loading";
import AlertMessage from "./AlertMessage";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { productAddReview } from "../../state/actions/product";
import { constants } from "../../utl/constants";

// import axios from "axios";
// import products from "../../products_mock_data";

function ProductDetail() {
  // -
  const { id } = useParams();
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  const dispatch = useDispatch();
  const productItem = useSelector((state) => state.productItem);
  const { error, loading, product } = productItem;

  let the_product = product;

  const navigate = useNavigate();
  const handleAddToCart = () => {
    // console.log("cart clicked ", id);
    navigate(`/cart/${id}?quantity=${purchaseQuantity}`);

    // productAddedReview
  };

  // Product Review
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const productReviewCreated = useSelector((state) => state.productAddedReview);
  const {
    loading: loadingReview,
    success: successReview,
    error: errorReview,
  } = productReviewCreated;

  const handleProductReview = (e) => {
    e.preventDefault();
    console.log("add review for item ", id);
    dispatch(
      productAddReview(id, { rating: userRating, comment: userComment })
    );
  };

  // - initial assembly...
  // const the_product = products.find((item) => item._id === id);
  // console.log("the_product\n", JSON.stringify(the_product));

  /*
  const [the_product, set_the_product] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(`/api/product/${id}`);
      set_the_product(data);
    }
    fetchProduct();
  }, [id]);
  */

  useEffect(() => {
    if (successReview) {
      setUserRating(0);
      setUserComment("");
      dispatch({ type: constants.PRODUCT_ADD_REVIEW_RESET });
    }
    dispatch(listProduct(id));
  }, [dispatch, id, successReview]);

  return (
    <div>
      <div>
        <Link to='/' className='btn btn-light my-3'>
          Back to Main List
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <AlertMessage variant='alert-danger'>There was an eror</AlertMessage>
      ) : (
        <>
          <Row>
            <Col md={6}>
              {the_product.uploadedImage ? (
                <Image
                  src={the_product.uploadedImage}
                  alt={the_product.name}
                  fluid
                />
              ) : (
                <Image src={the_product.image} alt={the_product.name} fluid />
              )}
            </Col>

            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{the_product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    rating={the_product.rating}
                    reviews={the_product.numReviews}
                    star_color={`rgb(253, 168, 0)`}
                  ></Rating>
                </ListGroup.Item>
              </ListGroup>

              <ListGroup.Item>
                {the_product.brand}
                <br />
                {the_product.description}
              </ListGroup.Item>
            </Col>

            <Col>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>${the_product.price}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    {the_product.countInStock > 0
                      ? `${the_product.countInStock} Stock`
                      : "Currently of stock."}
                  </ListGroup.Item>

                  {the_product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col xs='auto' className='my-1'>
                          <Form.Control
                            as='select'
                            value={purchaseQuantity}
                            onChange={(e) =>
                              setPurchaseQuantity(e.target.value)
                            }
                          >
                            {[...Array(the_product.countInStock).keys()].map(
                              (theItem) => {
                                return (
                                  <option key={theItem + 1} value={theItem + 1}>
                                    {theItem + 1}
                                  </option>
                                );
                              }
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <button
                      className='btn-block'
                      type='button'
                      disabled={the_product.countInStock === 0}
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h3>Product Reviews</h3>

              {productItem.product.reviews &&
                productItem.product.reviews.length === 0 && (
                  <AlertMessage variant='info'>
                    There are no reviews of this item yet.
                  </AlertMessage>
                )}

              {loadingReview && <Loading />}
              {errorReview && (
                <AlertMessage variant='danger'>{errorReview}</AlertMessage>
              )}
              {successReview && (
                <AlertMessage varian='success'>Review Posted!</AlertMessage>
              )}

              {productItem.product.reviews &&
                productItem.product.reviews.length > 0 &&
                productItem.product.reviews.map((item) => (
                  <ListGroup.Item key={item.id}>
                    {item.name} - &nbsp;
                    {new Date(item.createdAt).toLocaleString("en-US", {
                      timeZone: "America/New_York",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}{" "}
                    <br />
                    {item.comment}
                    <Rating
                      rating={item.rating}
                      reviews={the_product.numReviews}
                      star_color={`rgb(253, 168, 0)`}
                    ></Rating>
                  </ListGroup.Item>
                ))}

              {userDetails && (
                <ListGroup.Item>
                  <Form onSubmit={handleProductReview}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={userRating}
                        onChange={(e) => setUserRating(e.target.value)}
                      >
                        <option value='1'>1 - Very Poor</option>
                        <option value='2'>2 - Not So Good</option>
                        <option value='3'>3 - Average</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group id='comments'>
                      <Form.Label>Comments</Form.Label>
                      <Form.Control
                        as='textarea'
                        value={userComment}
                        row='5'
                        onChange={(e) => setUserComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Button
                      disabled={loadingReview}
                      type='submit'
                      className='mt-3'
                    >
                      Send Review
                    </Button>
                  </Form>
                </ListGroup.Item>
              )}

              {/* {console.log(
                "item reviews:\n",
                JSON.stringify(productItem.product.reviews)
              )} */}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default ProductDetail;
