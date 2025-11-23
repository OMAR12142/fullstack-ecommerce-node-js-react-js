import React from "react";
import { useState } from "react";
import { FormContainer } from "../components/FormContainer";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    dispatch(saveShippingAddress({ address, postalCode, city, country }));
    navigate("/payment");
  };

  return (
    <FormContainer className="app-auth-container-custom">
      <CheckoutSteps step1 step2 />

      <h1 className="app-auth-heading">Shipping</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="address" className="my-2">
          <Form.Label className="fw-bold">Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            className="app-form-control-custom"
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="city" className="my-2">
          <Form.Label className="fw-bold">City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            className="app-form-control-custom"
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="postalcode" className="my-2">
          <Form.Label className="fw-bold">Postal Code</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="app-form-control-custom"
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="country" className="my-2">
          <Form.Label className="fw-bold">Country</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="app-form-control-custom"
          ></Form.Control>
        </FormGroup>
        <Button
          type="submit"
          variant="primary"
          className="my-2 w-100 app-auth-btn-custom"
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
