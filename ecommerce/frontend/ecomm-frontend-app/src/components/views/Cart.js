import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import AlertMessage from "./AlertMessage";
import { addToCart, removeFromCart } from "../../state/actions/cart";
import { useNavigate } from "react-router-dom";

function Cart(/*{ match, location, history }*/) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const query = window.location.search;
  const param = new URLSearchParams(query);
  const theQuantity = param.get("quantity");
  const navigate = useNavigate();

  // console.log("id: " + id);
  // console.log("the quantity: ", theQuantity);

  const cartState = useSelector((state) => state.cart);
  const { cart } = cartState;
  // console.log("cart state:\n", JSON.stringify(cart));

  const handleDeleteItem = (itemId) => {
    // console.log("remove item: ", itemId);
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    console.log("checkout clicked");
    navigate("/shipping"); //login/?redirect=shipping/
  };

  useEffect(() => {
    if (id && theQuantity) {
      dispatch(addToCart(id, theQuantity));
    }
  }, [dispatch, id, theQuantity]);

  return (
    <div className='cart_page'>
      <div>
        <h3>Cart</h3>
      </div>

      <Row>
        <Col md={8}>
          <div>
            {!cart || cart.length === 0 ? (
              <AlertMessage>
                The Cart is empty.{" "}
                <Button type='button' onClick={() => navigate("/")}>
                  Go Back.
                </Button>
              </AlertMessage>
            ) : (
              <ListGroup variant='flush'>
                {cart.length > 0 &&
                  cart.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={3}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col md={3}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={2}>${item.price}</Col>

                        <Col md={1}>
                          <Form.Control
                            as='select'
                            value={item.theQuantity}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map(
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

                        <Col md={3} className='text-center'>
                          <Button
                            className='border border-white'
                            type='buton'
                            variant='light'
                            onClick={() => handleDeleteItem(item.product)}
                          >
                            Remove Item <i className='fas fa-trash'></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            )}
          </div>
        </Col>

        <Col md={4}>
          {cart !== undefined && (
            <>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4>Subtotal</h4>
                    {cart.reduce(
                      (acc, item) => Number(acc + item.quantity),
                      0
                    )}{" "}
                    - items
                    <br />$
                    {cart
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn-block'
                      onClick={handleCheckout}
                      disabled={cart.length === 0}
                    >
                      Checkout
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
