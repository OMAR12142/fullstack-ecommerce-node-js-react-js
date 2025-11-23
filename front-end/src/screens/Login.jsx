import React, { useEffect, useState } from "react";
import { FormContainer } from "../components/FormContainer";
import { Button, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentails } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/loader";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
    console.log();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentails({ ...res }));
      console.log("RESPONSE:", res);

      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className="app-auth-screen-wrapper mt-5">
      <FormContainer className="app-auth-container-custom">
        <h1 className="mb-4 app-auth-heading">Sign In</h1>
        <Form onSubmit={submitHandler}>
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
          <Button
            type="submit"
            variant="primary"
            className="mt-4 w-100 app-auth-btn-custom"
            disabled={isLoading}
          >
            Sign In
          </Button>
          {isLoading && <Loader />}
        </Form>
        <Row className="py-3 app-auth-link-row">
          <span className="text-center">
            New customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="app-auth-link-custom"
            >
              Register
            </Link>
          </span>
        </Row>
      </FormContainer>
    </div>
  );
};
