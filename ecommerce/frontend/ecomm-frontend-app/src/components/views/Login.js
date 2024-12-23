import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import Loading from "./Loading";
import AlertMessage from "./AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/actions/user";
import FormLoginRegister from "./FormLoginRegister";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log("form submit triggered");
    dispatch(login(email, password));
  };

  // get the redirect value from the url query
  const query = window.location.search;
  const param = new URLSearchParams(query);
  const redirect = param.get("redirect");
  console.log("redirect value: ", redirect);

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userDetails } = userLogin;

  useEffect(() => {
    if (userDetails) {
      // navigate(redirect);
      navigate("/cart");
    }
  }, [navigate, userDetails, redirect]);

  return (
    <FormLoginRegister>
      <h3>Login</h3>

      {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
      {loading && <Loading />}

      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId='email' className='my-3 mt-4'>
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Login
        </Button>

        <Row className='py-3'>
          <Col>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
      </Form>
    </FormLoginRegister>
  );
}
