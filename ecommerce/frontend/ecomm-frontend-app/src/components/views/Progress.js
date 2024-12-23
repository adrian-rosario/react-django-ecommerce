import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Progress({ login, shipping, payment, order }) {
  return (
    <>
      <Nav className='justify-content-center mb-4'>
        <Nav.Item>
          {login ? (
            <Nav.Link as={Link} to='/login'>
              Login
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Login</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {shipping ? (
            <Nav.Link as={Link} to='/shipping'>
              Shipping
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Shipping</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {payment ? (
            <Nav.Link as={Link} to='/payment'>
              Payment
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Payment</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {order ? (
            <Nav.Link as={Link} to='/order'>
              Place Order
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Place Order</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </>
  );
}
