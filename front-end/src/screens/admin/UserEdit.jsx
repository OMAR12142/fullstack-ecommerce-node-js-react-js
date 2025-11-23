import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FormContainer } from "../../components/FormContainer";
import Loader from "../../components/Loader";

export const UserEdit = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  const [updateuser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateuser({ userId, name, email, isAdmin }).unwrap();
      toast.success("user updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3 app-go-back-btn">
        go back
      </Link>
      <FormContainer className="app-auth-container-custom">
        <h1 className="app-auth-heading">Edit user</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="app-form-control-custom"
              />
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="app-form-control-custom"
              />
            </Form.Group>
            <Form.Group controlId="isadmin" className="my-2">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="app-checkbox-custom"
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="my-2 w-100 app-auth-btn-custom"
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEdit;
