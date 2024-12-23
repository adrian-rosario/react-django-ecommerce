import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Loading from "./Loading";
import AlertMessage from "./AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  admin_get_user_details,
  admin_update_user,
} from "../../state/actions/user";
import FormLoginRegister from "./FormLoginRegister";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { user_constants } from "../../utl/constants_user";

export default function AdminEditUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [is_admin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInformation = useSelector((state) => state.userDetailsByAdmin);
  const { error, loading, userDetails } = userInformation;

  const userUpdateInformation = useSelector((state) => state.userUpdateByAdmin);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = userUpdateInformation;

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails: adminUserDetails } = userLogin;

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: user_constants.USER_UPDATE_BY_ADMIN_RESET });
      navigate("/user-list");
    } else {
      if (adminUserDetails && adminUserDetails.is_admin) {
        if (!userDetails.name || userDetails.id !== id) {
          // console.log("no user details");
          dispatch(admin_get_user_details(id));
        }

        if (userDetails.name) {
          setEmail(userDetails.email);
          setName(userDetails.name);
          setIsAdmin(userDetails.is_admin);
        }
      } else {
        navigate("/login");
      }
    }
  }, [
    dispatch,
    id,
    userDetails.id,
    userDetails.name,
    userDetails.email,
    userDetails.is_admin,
    navigate,
    updateSuccess,
    adminUserDetails,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      admin_update_user({
        id,
        name,
        email,
        is_admin,
      })
    );
  };

  return (
    <div>
      <Link to='/user-list'>Go Back</Link>
      <FormLoginRegister>
        <h3>Admin, Edit User</h3>

        {loading && <Loading />}
        {error && <AlertMessage variant='danger'>{error}</AlertMessage>}

        {updateLoading && <Loading />}
        {updateError && (
          <AlertMessage variant='danger'>{updateError}</AlertMessage>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='email' className='my-3 mt-4'>
            <Form.Label>Email Address:</Form.Label>
            <Form.Control
              type='email'
              placeholder='Your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='name' className='my-3 mt-4'>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type='name'
              placeholder='Your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='is_admin' className='my-3 mt-4'>
            <Form.Label>Is Admin:</Form.Label>
            <Form.Check
              type='checkbox'
              checked={is_admin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type='submit' variant='primary' className='mt-3'>
            Update
          </Button>
        </Form>
      </FormLoginRegister>
    </div>
  );
}
