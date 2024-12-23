import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import Loading from "./Loading";
import AlertMessage from "./AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../state/actions/user";
import FormLoginRegister from "./FormLoginRegister";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get the redirect value from the url query
  const query = window.location.search;
  const param = new URLSearchParams(query);
  const redirect = param.get("redirect");
  // console.log("redirect value: ", redirect);

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userDetails } = userRegister;

  useEffect(() => {
    if (userDetails) {
      navigate(redirect);
    }
  }, [navigate, userDetails, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setMessage("Passwords must match");
    } else {
      dispatch(register(email, password, name));
      navigate("/");
    }
  };

  return (
    <FormLoginRegister>
      <h3>Register</h3>

      {message && <AlertMessage variant='danger'>{message}</AlertMessage>}
      {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
      {loading && <Loading />}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email' className='my-3 mt-4'>
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='name' className='my-3 mt-4'>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type='name'
            placeholder='Your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password2' className='my-3'>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Register
        </Button>

        <Row className='py-3'>
          <Col>
            Already a Customer?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Col>
        </Row>
      </Form>
    </FormLoginRegister>
  );
}
