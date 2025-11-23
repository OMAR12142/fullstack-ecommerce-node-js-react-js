import React, { useEffect, useState } from "react";
import { FormContainer } from "../components/FormContainer";
import { Button, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentails } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/loader";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password do not match");
      return;
    } else {
      console.log();
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentails({ ...res }));
        console.log("RESPONSE:", res);

        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className="app-auth-screen-wrapper mt-5">
      <FormContainer className="app-auth-container-custom">
        <h1 className="mb-4 app-auth-heading">Create Account</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label className="fw-bold">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="app-form-control-custom"
            />
          </Form.Group>

          <Form.Group controlId="email" className="my-3">
            <Form.Label className="fw-bold">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="app-form-control-custom"
            />
          </Form.Group>
          <Form.Group controlId="password" className="my-3">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="app-form-control-custom"
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label className="fw-bold">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              className="app-form-control-custom"
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="mt-4 w-100 app-auth-btn-custom"
            disabled={isLoading}
          >
            Register
          </Button>
          {isLoading && <Loader />}
        </Form>
        <Row className="py-3 app-auth-link-row">
          <span className="text-center">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="app-auth-link-custom"
            >
              Login
            </Link>
          </span>
        </Row>
      </FormContainer>
    </div>
  );
};
