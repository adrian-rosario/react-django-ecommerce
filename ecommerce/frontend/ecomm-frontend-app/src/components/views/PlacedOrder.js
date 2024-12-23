import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import AlertMessage from "./AlertMessage";
import { Link, useNavigate } from "react-router-dom";
import {
  getOrderDetails,
  setOrderAsPaid,
  adminSetOrderAsDelivered,
} from "../../state/actions/order";
import { order_constants } from "../../utl/constants_order";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { useState } from "react";
import PayPalButton from "../PayPalButton";

export default function PlacedOrder() {
  const { id } = useParams();
  const orderDetail = useSelector((state) => state.orderDetail);

  // console.log("order detail: \n", JSON.stringify(orderDetail));

  const { order, error, loading } = orderDetail;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!loading && !error) {
    order.itemsTotal = order.order
      .reduce(
        (acc, item) => acc + item.price * item.quantity,
        0 // starting value
      )
      .toFixed(2);
  }

  // PayPal
  const [ppsdkReady, setPpSdkReady] = useState(false);
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingOrderPay, success: successOrderPay } = orderPay;

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=xxx-yyyy-zzz&currency=USD";
    script.async = true;
    script.onload = () => setPpSdkReady(true);
    document.body.appendChild(script);
  };

  // <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>

  const orderDeliveredState = useSelector(
    (state) => state.adminSetOrderDelivered
  );
  const {
    success: successDeliveredState,
    loading: loadingDeliveredState,
    error: errorDeliveredState,
  } = orderDeliveredState;

  const userInformation = useSelector((state) => state.userLogin);
  const { userDetails } = userInformation;

  useEffect(() => {
    if (!userDetails) {
      navigate("/login");
    }

    if (
      !order ||
      successOrderPay ||
      order.id !== Number(id) ||
      successDeliveredState
    ) {
      dispatch({ type: order_constants.ORDER_PAY_RESET });
      dispatch({ type: order_constants.ORDER_ADMIN_SET_ORDER_DELIVERED_RESET });

      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setPpSdkReady(true);
      }
    }
  }, [
    id,
    order,
    dispatch,
    successOrderPay,
    successDeliveredState,
    navigate,
    userDetails,
  ]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(setOrderAsPaid(id, paymentResult));
  };

  const setDeliveredHandler = () => {
    console.log("deliver order");
    dispatch(adminSetOrderAsDelivered(order));
  };

  return (
    <>
      <div>
        <h3>Order Charges</h3>

        {loading ? (
          <Loading />
        ) : error ? (
          <AlertMessage variant='danger'>{error}</AlertMessage>
        ) : (
          <div>
            <h4>Order: #{order.id}</h4>
            <Row>
              <Col md={8}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4>Shipping</h4>

                    <p>
                      Name: {order.user.name} <br /> Email:{" "}
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>

                    <p>
                      {order.shippingAddress.address}, &nbsp;
                      {order.shippingAddress.city}, &nbsp;
                      {order.shippingAddress.zipCode}, &nbsp;
                      {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <AlertMessage variant='success'>
                        Sent on &nbsp;
                        {new Date(order.deliveredAt).toLocaleString("en-US", {
                          timeZone: "America/New_York",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </AlertMessage>
                    ) : (
                      <AlertMessage variant='warning'>
                        Delivery Pending
                      </AlertMessage>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h4>Payment</h4>
                    <div>
                      {order.paymentMethod}
                      {order.isPaid ? (
                        <AlertMessage variant='success'>
                          Paid on &nbsp;
                          {new Date(order.paidDate).toLocaleString("en-US", {
                            timeZone: "America/New_York",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </AlertMessage>
                      ) : (
                        <AlertMessage variant='warning'>
                          Payment Pending
                        </AlertMessage>
                      )}
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h4>Items</h4>
                    {order.length === 0 ? (
                      <AlertMessage variant='info'>Order is empty</AlertMessage>
                    ) : (
                      <ListGroup variant='flush'>
                        {order.order.map((item, index) => (
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
                        <Col>${order.itemsTotal}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping:</Col>
                        <Col>${order.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Tax:</Col>
                        <Col>${order.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Payment Total:</Col>
                        <Col>${order.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    {!order.isPaid && (
                      <ListGroup.Item>
                        {loadingOrderPay && <Loading />}

                        {!ppsdkReady ? (
                          <Loading />
                        ) : (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                        )}
                      </ListGroup.Item>
                    )}
                  </ListGroup>

                  {loadingDeliveredState && <Loading />}
                  {errorDeliveredState && (
                    <AlertMessage variant='danger'>
                      {errorDeliveredState}
                    </AlertMessage>
                  )}

                  {userDetails &&
                    userDetails.is_admin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup>
                        <Button onClick={setDeliveredHandler} type='button'>
                          Post Order As Shipped
                        </Button>
                      </ListGroup>
                    )}
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
}
