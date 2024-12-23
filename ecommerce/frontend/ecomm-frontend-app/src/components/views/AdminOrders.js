import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminListOrders, adminDeleteOrder } from "../../state/actions/order";
import Loading from "./Loading";
import AlertMessage from "./AlertMessage";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

export default function AdminOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const allOrders = useSelector((state) => state.adminGetOrders);
  const { orders, loading, error } = allOrders;

  const orderDeleted = useSelector((state) => state.adminOrderDelete);
  const {
    success: deleteSuccess,
    loading: loadingDelete,
    error: errorDelete,
  } = orderDeleted;

  useEffect(() => {
    if (userDetails && userDetails.is_admin) {
      dispatch(adminListOrders());
      // TODO: handle case for fulfillment group login
    } else {
      navigate("/login");
    }

    if (deleteSuccess) {
      dispatch(adminListOrders());
    }
  }, [dispatch, navigate, userDetails, deleteSuccess]);

  const handleDeleteOrder = (id, user, price) => {
    // console.log("delete orderid: ", id);

    if (
      window.confirm(
        `Are you sure you want to delete order #${id} for $${price} from ${user}?`
      )
    ) {
      // console.log("delete ", id);
      dispatch(adminDeleteOrder(id));
    }
  };

  return (
    <div>
      <h3>Admin, All Orders</h3>

      {loadingDelete && <Loading />}
      {errorDelete && (
        <AlertMessage variant='danger'>{errorDelete}</AlertMessage>
      )}

      {loading && <Loading />}
      {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
      {orders && (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>User</th>
              <th className='text-center'>Payment Method</th>
              <th className='text-center'>Tax</th>
              <th className='text-center'>Shipping</th>
              <th className='text-center'>Total Price</th>
              <th className='text-center'>Is Paid</th>
              <th className='text-center'>Paid Date</th>
              <th className='text-center'>Is Delivered</th>
              <th>Delivered At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr key={item.id}>
                <td className='align-middle'>{item.user.email}</td>
                <td className='text-center align-middle'>
                  {item.paymentMethod}
                </td>
                <td className='align-middle'>${item.taxPrice}</td>
                <td className='text-center align-middle'>
                  ${item.shippingPrice}
                </td>
                <td className='align-middle'>${item.totalPrice}</td>
                <td className='text-center align-middle'>
                  {item.isPaid ? (
                    <i className='fas fa-check' style={{ color: "green" }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td className='text-center align-middle'>
                  {!item.paidDate
                    ? "Payment Pending"
                    : new Date(item.paidDate).toLocaleString("en-US", {
                        timeZone: "America/New_York",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                </td>
                <td className='text-center align-middle'>
                  {item.isDelivered ? (
                    <i className='fas fa-check' style={{ color: "green" }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td className='align-middle'>
                  {item.deliveredAt
                    ? new Date(item.deliveredAt).toLocaleString("en-US", {
                        timeZone: "America/New_York",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : "Delivery Pending"}
                </td>
                <td className='align-middle'>
                  <div className='d-flex'>
                    <Button
                      className='me-1'
                      size='sm'
                      variant='light'
                      onClick={() => navigate(`/order/view/${item.id}`)}
                    >
                      Details
                    </Button>

                    <Button
                      size='sm'
                      variant='danger'
                      onClick={() =>
                        handleDeleteOrder(
                          item.id,
                          item.user.email,
                          item.totalPrice
                        )
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* <ul>{orders && orders.map((item) => <li>{item.id} - </li>)}</ul> */}
    </div>
  );
}
