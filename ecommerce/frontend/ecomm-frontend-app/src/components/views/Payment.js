import React, { useEffect } from "react";
import Progress from "./Progress";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { savePaymentDetails } from "../../state/actions/cart";

export default function Payment() {
  const [paymentVendor, setPaymentVendor] = useState("PayPal");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingDetails } = cart;

  if (!shippingDetails) {
    console.log("no shipping information, redirect");
    navigate("/shipping");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle form submit");
    dispatch(savePaymentDetails(paymentVendor));
    navigate("/order");
  };

  const userInformation = useSelector((state) => state.userLogin);
  const { error: userInformationError, userDetails } = userInformation;

  useEffect(() => {
    if (!userDetails || userInformationError) {
      navigate("/login");
    }
  }, [navigate, userDetails, userInformationError]);
  return (
    <div>
      <Progress login shipping payment />
      <h3>Payment</h3>

      <Form onSubmit={handleSubmit} className='w-25 paymentForm'>
        <Form.Group controlId='payment_paypal'>
          <Col>
            <Form.Label as='legend'>Select Payment</Form.Label>
            <Form.Check
              type='radio'
              label='PayPal or CC'
              id='paypal'
              name='paymentMethod'
              checked
              onChange={(e) => setPaymentVendor(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Place Order
        </Button>
      </Form>
    </div>
  );
}
