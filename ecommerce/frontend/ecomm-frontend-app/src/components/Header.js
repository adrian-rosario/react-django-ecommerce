import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/actions/user";
import { useNavigate } from "react-router-dom";
import Search from "./Search";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  // console.log("header, user details\n", JSON.stringify(userDetails));

  const dispatch = useDispatch();

  const handleLogOut = () => {
    // console.log("log-out");
    dispatch(logout());
    navigate("/");
  };

  const navigate = useNavigate();
  const handleProfileNavigate = () => {
    navigate("/profile");
  };

  const handleCartNavigate = () => {
    navigate("/cart");
  };

  const handleUsersNavigate = () => {
    navigate("/user-list");
  };

  const handleProducts = () => {
    // console.log("go to products page");
    navigate("/admin-edit-products");
  };

  const handleOrders = () => {
    // console.log("go to all orders");
    navigate("/admin-edit-orders");
  };
  // const handleShippingNavigate = () => {
  //   navigate("/shipping");
  // };

  return (
    <div>
      <header>
        <Navbar expand='lg' className='bg-body-tertiary'>
          <Container>
            <Link to='/'>
              <Navbar.Brand>eCommerce App</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link onClick={handleCartNavigate}>
                  <i className='fas fa-shopping-cart'></i>
                  Cart
                </Nav.Link>

                {userDetails ? (
                  <NavDropdown title={userDetails.name} id='user_dropdown'>
                    <NavDropdown.Item onClick={handleProfileNavigate}>
                      Profile
                    </NavDropdown.Item>

                    {userDetails.is_admin && (
                      <>
                        <NavDropdown.Item onClick={handleUsersNavigate}>
                          All Users
                        </NavDropdown.Item>

                        <NavDropdown.Item onClick={handleProducts}>
                          All Products
                        </NavDropdown.Item>

                        <NavDropdown.Item onClick={handleOrders}>
                          All Orders
                        </NavDropdown.Item>
                      </>
                    )}

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogOut}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link href='/login'>
                    <i className='fas fa-user'></i>
                    Login
                  </Nav.Link>
                )}

                {!userDetails && (
                  <Nav.Link disabled>
                    <i className='fas fa-user'></i>
                  </Nav.Link>
                )}

                {userDetails && (
                  <>
                    <Nav.Link onClick={handleProfileNavigate}>
                      {!userDetails.is_admin && <i className='fas fa-user'></i>}
                      {userDetails.is_admin && <i className='fas fa-users'></i>}
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
            <Search />
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default Header;
