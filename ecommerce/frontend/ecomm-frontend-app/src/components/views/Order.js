import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Progress from "./Progress";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import AlertMessage from "./AlertMessage";
import { Link } from "react-router-dom";
import { createOrder } from "../../state/actions/order";
import { useNavigate } from "react-router-dom";
import { order_constants } from "../../utl/constants_order";

export default function Order() {
  const cart = useSelector((state) => state.cart.cart);
  const shipping = useSelector((state) => state.cart.shippingDetails);
  const payment = useSelector((state) => state.cart.paymentDetails);
  const orderState = useSelector((state) => state.order);
  const { order, error, success } = orderState;
  // console.log("the cart\n", JSON.stringify(cart));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  cart.itemsTotal = cart
    .reduce(
      (acc, item) => acc + item.price * item.quantity,
      0 // starting value
    )
    .toFixed(2);

  cart.shipping = (cart.itemsTotal >= 100 ? 0 : 10).toFixed(2);
  cart.tax = Number(cart.itemsTotal * 0.0825).toFixed(2);
  cart.paymentTotal = (
    Number(cart.itemsTotal) +
    Number(cart.shipping) +
    Number(cart.tax)
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      navigate(`/order/view/${order.id}`);
      dispatch({ type: order_constants.ORDER_RESET });
    }

    if (payment === undefined || !payment) {
      navigate("/payment");
    }
  }, [navigate, order, success, payment, dispatch]);

  const handlePlaceOrder = () => {
    // console.log("place order");
    dispatch(
      createOrder({
        cart: cart,
        shippingAddress: shipping,
        shippingAmount: cart.shipping,
        paymentMethod: payment,
        taxAmount: cart.tax,
        totalAmount: cart.paymentTotal,
      })
    );
  };

  return (
    <div>
      <Progress login shipping payment order />
      <h3>Place Order</h3>

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4>Shipping</h4>
              <p>
                {shipping.address}, {shipping.city}, {shipping.postalCode},{" "}
                {shipping.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Payment</h4>
              <p>{payment}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Items</h4>
              {cart.length === 0 ? (
                <AlertMessage variant='info'>Cart is empty</AlertMessage>
              ) : (
                <ListGroup variant='flush'>
                  {cart.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.quantity} @ ${item.price} ={" "}
                          {(item.quantity * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>Order Summary</h4>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total items:</Col>
                  <Col>${cart.itemsTotal}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shipping}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.tax}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Payment Total:</Col>
                  <Col>${cart.paymentTotal}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Button
                    type='button'
                    className='btn-block'
                    onClick={handlePlaceOrder}
                    disabled={cart.length === 0}
                  >
                    Place Order
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
