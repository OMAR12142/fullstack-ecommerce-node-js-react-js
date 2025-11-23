import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Table, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Message from "../components/Message";
import { FaTimes, FaEye, FaUserEdit } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { setCredentails } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice.JS";
import Loader from "../components/Loader";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentails(res));
        toast.success("Profile Updated Successfully");
        setPassword("");
        setConfirmPassword("");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Row className="app-profile-container">
      <Col md={4}>
        <Card className="app-profile-card shadow-sm border-0">
          <Card.Header className="app-profile-header bg-black rounded text-white">
            <div className="d-flex align-items-center bg-black p-2 rounded">
              <FaUserEdit className="me-2" />
              <h4 className="mb-0 bg-black">User Profile</h4>
            </div>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="my-3">
                <Form.Label className="fw-bold">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="app-form-control-custom"
                />
              </Form.Group>

              <Form.Group controlId="email" className="my-3">
                <Form.Label className="fw-bold">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="app-form-control-custom"
                />
              </Form.Group>

              <Form.Group controlId="password" className="my-3">
                <Form.Label className="fw-bold">New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="app-form-control-custom"
                />
                <Form.Text className="text-muted">
                  Leave blank to keep current password
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="my-3">
                <Form.Label className="fw-bold">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="app-form-control-custom"
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100 app-auth-btn-custom mt-4"
                disabled={loadingUpdateProfile}
              >
                {loadingUpdateProfile ? "Updating..." : "Update Profile"}
              </Button>
              {loadingUpdateProfile && <Loader />}
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Col md={8}>
        <Card className="app-orders-card shadow-sm border-0">
          <Card.Header className="  text-white bg-black rounded">
            <h4 className="mb-0 bg-black p-2 rounded">Order History</h4>
          </Card.Header>
          <Card.Body>
            {isLoading ? (
              <div className="text-center py-4">
                <Loader />
              </div>
            ) : error ? (
              <Message variant="danger">
                {error?.data?.message || error.error}
              </Message>
            ) : orders?.length === 0 ? (
              <div className="text-center py-5">
                <FaTimes className="text-muted mb-3" size={48} />
                <h5 className="text-muted">No Orders Yet</h5>
                <p className="text-muted">
                  Start shopping to see your orders here
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="app-orders-table mb-0">
                  <thead className="app-table-header">
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((order) => (
                      <tr key={order._id} className="app-order-row">
                        <td className="app-order-id">
                          {order._id.substring(0, 8)}...
                        </td>
                        <td className="app-order-date">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="app-order-total fw-bold">
                          ${order.totalPrice.toFixed(2)}
                        </td>
                        <td>
                          <div className="d-flex flex-column">
                            <span
                              className={`badge ${
                                order.isPaid ? "bg-success" : "bg-danger"
                              } mb-1`}
                            >
                              {order.isPaid ? "Paid" : "Unpaid"}
                            </span>
                            <span
                              className={`badge ${
                                order.isDelivered ? "bg-success" : "bg-warning"
                              }`}
                            >
                              {order.isDelivered ? "Delivered" : "Processing"}
                            </span>
                          </div>
                        </td>
                        <td>
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="app-order-details-btn"
                            >
                              <FaEye className="me-1" />
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
