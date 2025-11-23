import React from "react";
import { useGetAllOrdersQuery } from "../../slices/ordersApiSlice.JS";
import Message from "../../components/Message";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  useDeleteUserMutation,
  useGetusersQuery,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetusersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  //   console.log(users);
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure to delete the user")) {
      try {
        await deleteUser(id).unwrap();
        refetch();
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  return (
    <>
      <h1 className="app-section-heading">Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message />
      ) : (
        <table className="table table-striped table-bordered table-hover app-users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`} className="app-link-primary">
                    {user.email}
                  </a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button
                      variant="light"
                      className="btn-sm mx-2 app-edit-btn"
                    >
                      <span className="m-1">Edit</span> <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    className="btn-sm mx-2 app-delete-btn"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserListScreen;
