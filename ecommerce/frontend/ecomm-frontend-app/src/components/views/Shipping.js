import React, { useState /*, useEffect */ } from "react";
import { Form, /*Row, Col,*/ Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormLoginRegister from "./FormLoginRegister";
import { useNavigate } from "react-router-dom";
import { saveShippingDetails } from "../../state/actions/cart";
import Progress from "./Progress";

// import { Link } from "react-router-dom";
// import Loading from "./Loading";
// import AlertMessage from "./AlertMessage";
// import { register } from "../../state/actions/user";

export default function Shipping() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingDetails } = cart;

  const [address, setAddress] = useState(shippingDetails.address);
  const [city, setCity] = useState(shippingDetails.city);
  const [postalCode, setPostalCode] = useState(shippingDetails.postalCode);
  const [country, setCountry] = useState(shippingDetails.country);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handle form submit");
    dispatch(saveShippingDetails({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormLoginRegister>
      <Progress login shipping />

      <h3>Shipping</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='address' className='my-3 mt-4'>
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your address'
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city' className='my-3 mt-4'>
          <Form.Label>City, State:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your city'
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode' className='my-3 mt-4'>
          <Form.Label>Postal code:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your Postal Code'
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country' className='my-3 mt-4'>
          <Form.Label>Country:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your Country'
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Submit Shipping Information and Continue
        </Button>
      </Form>
    </FormLoginRegister>
  );
}
