import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  Button,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Message from "../components/Message";
import { useCreateOrderMutation } from "../slices/ordersApiSlice.JS";
import Loader from "../components/Loader";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress.address, navigate, cart.paymentMethod]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row className="app-place-order-row">
        <Col md={8}>
          <ListGroup variant="flush" className="app-order-sections">
            <ListGroupItem className="app-order-section-item">
              <h2 className="app-section-heading">Shipping</h2>
              <p className="app-shipping-info">
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroupItem>
            <ListGroupItem className="app-order-section-item">
              <h2 className="app-section-heading">Payment Method</h2>
              <p className="app-payment-info">
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </ListGroupItem>
            <ListGroupItem className="app-order-section-item">
              <h2 className="app-section-heading">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush" className="app-order-items-list">
                  {cart.cartItems.map((item, index) => {
                    return (
                      <ListGroupItem key={index} className="app-order-item">
                        <Row className="align-items-center">
                          <Col md={1}>
                            <Image
                              src={item.image}
                              fluid
                              rounded
                              className="app-item-image"
                            />
                          </Col>
                          <Col md={5}>
                            <Link
                              to={`/product/${item.product}`}
                              className="app-item-link"
                            >
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4} className="text-end app-item-price">
                            {item.quantity} x ${item.price} ={" "}
                            <strong>
                              ${(item.quantity * item.price).toFixed(2)}
                            </strong>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush" className="app-order-summary">
            <ListGroupItem className="app-summary-header">
              <h2 className="app-section-heading mb-0">Order Summary</h2>
            </ListGroupItem>
            <ListGroupItem className="app-summary-item">
              <Row>
                <Col className="fw-bold">Items:</Col>
                <Col className="text-end">${cart.itemsPrice}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem className="app-summary-item">
              <Row>
                <Col className="fw-bold">Shipping:</Col>
                <Col className="text-end">${cart.shippingPrice}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem className="app-summary-item">
              <Row>
                <Col className="fw-bold">Tax:</Col>
                <Col className="text-end">${cart.taxPrice}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem className="app-summary-total-item">
              <Row>
                <Col className="fw-bold app-final-total-text">Total:</Col>
                <Col className="text-end fw-bold app-final-total-price">
                  ${cart.totalPrice}
                </Col>
              </Row>
            </ListGroupItem>
            {error && (
              <ListGroupItem>
                <Message variant="danger">
                  {error?.data?.message || error.error}
                </Message>
              </ListGroupItem>
            )}
            <ListGroupItem className="app-place-order-btn-section">
              <Button
                type="button"
                className="w-100 app-place-order-btn"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
              {isLoading && <Loader />}
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
