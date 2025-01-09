import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Loading from "./Loading";
import AlertMessage from "./AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { get_all_users, delete_user } from "../../state/actions/user";
import { useNavigate } from "react-router-dom";

export default function ListUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.listAllUsers);
  const { loading, users, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const userDelete = useSelector((state) => state.deleteUser);
  const { success: deleteSuccess } = userDelete;

  useEffect(() => {
    if (userDetails && userDetails.is_admin) {
      dispatch(get_all_users());
    } else {
      navigate("/login");
    }
  }, [dispatch, deleteSuccess, navigate, userDetails]);

  const handleEdit = (id) => {
    // console.log("edit ", id);
    navigate(`/admin-edit-user/${id}`);
  };

  const handleDelete = (id, name) => {
    // console.log("delete ", id);
    if (window.confirm(`Are you sure you want to delete ${name}?`))
      dispatch(delete_user(id));
  };

  return (
    <div className='mt-4'>
      <h3>All Users, Admin</h3>

      {loading && <Loading />}
      {error && <AlertMessage variant='danger'>{error}</AlertMessage>}

      {users && (
        <Table striped bordered hover responsive className='table-sm mt-4'>
          <thead>
            <tr>
              <th className='text-center'>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th className='text-center'>Admin</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id}>
                <td className='text-center align-middle'>{item.id}</td>
                <td className='align-middle'>{item.name}</td>
                <td className='align-middle'>{item.email}</td>
                <td className='text-center align-middle'>
                  {item.is_admin ? (
                    <i className='fas fa-check' style={{ color: "green" }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td className='align-middle'>
                  <Button
                    size='sm'
                    variant='primary'
                    className='mx-2'
                    onClick={() => handleEdit(item.id)}
                  >
                    <i className='fas fa-edit'></i>
                  </Button>

                  <Button
                    size='sm'
                    variant='danger'
                    onClick={() => handleDelete(item.id, item.name)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
