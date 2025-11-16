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
    <Row className="mt-4">
      <Col md={8}>
        <h1 className="mb-4">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Message>
            <p>Your cart is empty</p>
            <Link to={"/"}>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id} className="py-3">
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.image} fluid rounded />
                  </Col>

                  <Col md={3} className="fw-semibold">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>

                  <Col md={2} className="fw-bold">
                    ${item.price}
                  </Col>

                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.quantity}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
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
        <Card className="p-3 shadow-sm">
          <ListGroup variant="flush">
            <ListGroup.Item className="py-3">
              <h4>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
              </h4>
              <h3 className="fw-bold text-success mt-2">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </h3>
            </ListGroup.Item>

            <ListGroup.Item className="py-3">
              <Button
                type="button"
                className="w-100"
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
