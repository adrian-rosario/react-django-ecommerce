import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import Loading from "./Loading";
import AlertMessage from "./AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { update_get, update_user_profile } from "../../state/actions/user";
import { useNavigate } from "react-router-dom";
import { user_constants } from "../../utl/constants_user";
import { getOrderHistory } from "../../state/actions/order";

// import FormLoginRegister from "./FormLoginRegister";
// import { Link } from "react-router-dom";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const query = window.location.search;
  // const param = new URLSearchParams(query);
  // const redirect = param.get("redirect");

  const userDetailsRoot = useSelector((state) => state.userDetails);
  const {
    error: errorUserDetails,
    loading: loadingUserDetails,
    user,
  } = userDetailsRoot;

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  // console.log("??", JSON.stringify(userLogin));

  const userUpdatedLogin = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdatedLogin;

  const orderHistory = useSelector((state) => state.orderHistory);
  const {
    loading: loadingHistory,
    error: errorLoadingHistory,
    purchases,
  } = orderHistory;

  // console.log("purchases:\n", JSON.stringify(purchases));

  //  clear any messages, giving user a chance to correct error
  const handlePasswordFocus = (e) => {
    // console.log("focus!");
    setMessage("");
  };

  useEffect(() => {
    if (!userDetails || errorUserDetails) {
      // console.log("no user details");
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: user_constants.USER_PROFILE_RESET });
        // console.log("no user or name");
        dispatch(update_get("profile"));
        dispatch(getOrderHistory());
        setMessage("Profile Updated.");
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userDetails, dispatch, user, success, errorUserDetails]);

  const handleSubmit = (e) => {
    setMessage("");
    e.preventDefault();

    if (password2 !== "") {
      if (password !== password2) {
        setMessage("Passwords don't match");
        return;
      }
    } else {
      dispatch(
        update_user_profile({
          id: user.id,
          name: name,
          email: email,
          password: password,
        })
      );
    }
  };

  const handleViewOrder = (id) => {
    navigate(`/order/view/${id}`);
  };

  return (
    <Row>
      <Col md={3}>
        <h3>Profile</h3>

        {message && <p>{message}</p>}
        {loadingUserDetails && <Loading />}

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handlePasswordFocus}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password2' className='my-3'>
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type='password'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              onFocus={handlePasswordFocus}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='mt-3'>
            Update Your Profile
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h3>Orders</h3>

        {loadingHistory ? (
          <Loading />
        ) : errorLoadingHistory ? (
          <AlertMessage variant='danger'>{errorLoadingHistory}</AlertMessage>
        ) : (
          <Table striped responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th className='text-center'>Paid</th>
                <th className='text-center'>Delivered</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {purchases &&
                purchases.length > 0 &&
                purchases.map((item) => (
                  <tr key={item.id}>
                    <td className='text-center'>{item.id}</td>
                    <td>
                      {new Date(item.createdAt).toLocaleString("en-US", {
                        timeZone: "America/New_York",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>
                    <td>${item.totalPrice}</td>
                    <td align='center'>
                      {item.isPaid ? (
                        <>
                          <small>
                            {new Date(item.paidDate).toLocaleString("en-US", {
                              timeZone: "America/New_York",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </small>
                          &nbsp;
                          <i
                            className='fas fa-check'
                            style={{ color: "green" }}
                          ></i>
                        </>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td align='center'>
                      {item.isDelivered ? (
                        <>
                          <small>
                            {new Date(item.deliveredAt).toLocaleString(
                              "en-US",
                              {
                                timeZone: "America/New_York",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                second: "2-digit",
                              }
                            )}
                            &nbsp;
                            <i
                              className='fas fa-check'
                              style={{ color: "green" }}
                            ></i>
                          </small>
                        </>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td className='align-middle'>
                      <Button
                        size='sm'
                        type='button'
                        variant='primary'
                        onClick={() => handleViewOrder(item.id)}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}

        {purchases && purchases.length === 0 && (
          <AlertMessage variant='info'>
            There are currently no Orders in your user history.
          </AlertMessage>
        )}
      </Col>
    </Row>
  );
}
