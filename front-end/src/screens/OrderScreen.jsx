import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice.JS";
import Loader from "../components/loader";
import Message from "./../components/Message";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { usePayOrderMutation } from "../slices/ordersApiSlice.JS";
import { useSelector } from "react-redux";
import { useGetPayPalClientIdQuery } from "../slices/ordersApiSlice.JS";
import { toast } from "react-toastify";
import { useDeliverOrderMutation } from "../slices/ordersApiSlice.JS";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        }),
          paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success("payment successfull");
      } catch (err) {
        toast.error(err?.data.message || err.message);
      }
    });
  }
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("payment successfull");
  }
  function onError(err) {
    toast.error(err.message);
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice.toFixed(2),
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const DeliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
      toast.success("Order Delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <>
      <h1 className="app-order-id-heading">ORDER ID: {order._id}</h1>
      <Row className="app-order-details-row">
        <Col md={8}>
          <ListGroup variant="flush" className="app-order-info-list">
            <ListGroupItem className="app-order-section-item">
              <h2 className="app-section-heading">Shipping</h2>
              <p className="mb-1">
                <strong className="fw-bold">Name: </strong>
                {order.user.name}
              </p>
              <p className="mb-1">
                <strong className="fw-bold">Email: </strong>
                <a
                  href={`mailto:${order.user.email}`}
                  className="app-link-primary"
                >
                  {order.user.email}
                </a>
              </p>
              <p className="mb-3">
                <strong className="fw-bold">Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {order.shippingAddress.country}
              </p>
              <div>
                {order.isDelivered ? (
                  <Message variant="success" className="app-status-message">
                    Delivered on: {order.deliveredAt.substring(0, 10)}
                  </Message>
                ) : (
                  <Message variant="danger" className="app-status-message">
                    Not Delivered
                  </Message>
                )}
              </div>
            </ListGroupItem>

            <ListGroupItem className="app-order-section-item">
              <h2 className="app-section-heading">Payment Method</h2>
              <p className="mb-1 fw-bold">Method: {order.paymentMethod}</p>
              <div>
                {order.isPaid ? (
                  <Message variant="success" className="app-status-message">
                    Paid on: {order.paidAt.substring(0, 10)}
                  </Message>
                ) : (
                  <Message variant="danger" className="app-status-message">
                    Not Paid
                  </Message>
                )}
              </div>
            </ListGroupItem>

            <ListGroupItem className="app-order-section-item">
              <h2 className="app-section-heading">Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  className="app-order-item-list-item"
                >
                  <Row className="align-items-center">
                    <Col md={1}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                        className="app-item-image"
                      />
                    </Col>
                    <Col className="fw-bold">
                      <Link
                        to={`/products/${item.product}`}
                        className="app-link-primary"
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={4} className="text-end fw-bold">
                      {item.quantity} x ${item.price} ={" "}
                      <span className="app-item-total-price">
                        ${(item.quantity * item.price).toFixed(2)}
                      </span>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="app-summary-card shadow-lg border-0">
            <ListGroup variant="flush">
              <ListGroupItem className="app-summary-header">
                <h2 className="app-section-heading mb-0">Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem className="app-summary-item">
                <Row>
                  <Col className="fw-bold">Items Price:</Col>
                  <Col className="text-end">${order.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem className="app-summary-item">
                <Row>
                  <Col className="fw-bold">Shipping:</Col>
                  <Col className="text-end">${order.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem className="app-summary-item">
                <Row>
                  <Col className="fw-bold">Tax:</Col>
                  <Col className="text-end">${order.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem className="app-summary-total-item">
                <Row>
                  <Col className="fw-bold app-final-total-text">Total:</Col>
                  <Col className="text-end fw-bold app-final-total-price">
                    ${order.totalPrice}
                  </Col>
                </Row>
              </ListGroupItem>
              {!order.isPaid && (
                <ListGroupItem className="app-paypal-section">
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        onClick={onApproveTest}
                        className="w-100 mb-2 app-test-pay-btn"
                      >
                        Test Pay Order
                      </Button>
                      <PayPalButtons
                        onError={onError}
                        createOrder={createOrder}
                        onApprove={onApprove}
                      ></PayPalButtons>
                    </div>
                  )}
                </ListGroupItem>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item className="app-deliver-section">
                    <Button
                      type="button"
                      className="w-100 app-deliver-btn"
                      onClick={DeliverOrderHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
