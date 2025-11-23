import React from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../slices/cartSlice";

export const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const deleteItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Row className="mt-4 app-cart-screen">
      <Col md={8}>
        <h1 className="mb-4 app-cart-heading text-black">
          <strong>Shopping Cart</strong>
        </h1>
        {cartItems.length === 0 ? (
          <Message className=" bg-black text-white p-4">
            <p className="text-black">
              <strong>Your cart is empty</strong>
            </p>
            <Link to={"/"} className="app-link-primary text-black fw-bold">
              Go Back
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush" className="app-cart-list">
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item._id}
                className="py-3 px-0 app-cart-item"
              >
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image
                      src={item.image}
                      fluid
                      rounded
                      className="app-cart-image"
                    />
                  </Col>

                  <Col md={3} className="fw-semibold app-item-name">
                    <Link to={`/product/${item._id}`} className="text-dark">
                      {item.name}
                    </Link>
                  </Col>

                  <Col md={2} className="fw-bold app-item-price">
                    ${item.price}
                  </Col>

                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.quantity}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                      className="app-qty-select-cart"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2} className="text-end">
                    <Button
                      variant="light"
                      type="button"
                      onClick={() => deleteItemHandler(item._id)}
                      className="app-remove-btn"
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card className="p-4 app-summary-card shadow-lg border-0">
          <ListGroup variant="flush">
            <ListGroup.Item className="py-3 border-0">
              <h4 className="fw-bold app-subtotal-text">
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
              </h4>
              <h3 className="fw-bold app-total-price mt-3">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </h3>
            </ListGroup.Item>

            <ListGroup.Item className="pt-3 border-0">
              <Button
                type="button"
                className="w-100 app-checkout-btn"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
