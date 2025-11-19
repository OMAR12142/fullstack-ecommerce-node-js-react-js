import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../slices/ordersApiSlice.js"; // 🔥 صحح المسار
import Loader from "../components/loader";
import Message from "./../components/Message";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate(); // 🔥 أضف useNavigate
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  // 🔥 تحقق من التخويل
  useEffect(() => {
    if (order && userInfo && order.user && order.user._id !== userInfo._id) {
      toast.error("You are not authorized to view this order");
      navigate("/");
    }
  }, [order, userInfo, navigate]);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  // 🔥 صحح دالة onApprove
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      console.log("PayPal Details Received:", details);
      try {
        await payOrder({
          orderId,
          details: {
            id: details.id,
            status: details.status,
            update_time: details.update_time,
            payer: {
              email_address: details.payer.email_address,
            },
          },
        }).unwrap(); // 🔥 أضف unwrap()
        refetch();
        toast.success("Payment successful");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  // 🔥 صحح دالة onApproveTest
  async function onApproveTest() {
    try {
      // 🔥 تحقق من التخويل قبل الدفع
      if (
        !userInfo ||
        (order && order.user && order.user._id !== userInfo._id)
      ) {
        toast.error("You are not authorized to pay this order");
        return;
      }

      await payOrder({
        orderId,
        details: {
          id: `test_${Date.now()}`,
          status: "completed",
          update_time: new Date().toISOString(),
          payer: { email_address: userInfo.email },
        },
      }).unwrap(); // 🔥 أضف unwrap()

      refetch();
      toast.success("Payment successful");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
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

  // 🔥 تحقق إذا لم يكن المستخدم مصرح له
  if (order && userInfo && order.user && order.user._id !== userInfo._id) {
    return (
      <Message variant="danger">
        You are not authorized to view this order
      </Message>
    );
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">
      {error?.data?.message || "Error loading order"}
    </Message>
  ) : (
    <>
      <h1>Order : {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              <p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on:{" "}
                    {new Date(order.deliveredAt).toLocaleDateString()}
                  </Message>
                ) : (
                  <Message variant="warning">Not Delivered</Message>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on: {new Date(order.paidAt).toLocaleDateString()}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.quantity} x ${item.price} = $
                      {(item.quantity * item.price).toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice.toFixed(2)}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice.toFixed(2)}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice.toFixed(2)}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Total</strong>
                  </Col>
                  <Col>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* 🔥 اخف زر الاختبار في production */}
                      {process.env.NODE_ENV === "development" && (
                        <Button
                          onClick={onApproveTest}
                          style={{ marginBottom: "10px" }}
                          disabled={loadingPay}
                        >
                          Test Pay Order
                        </Button>
                      )}
                      <PayPalButtons
                        onError={onError}
                        createOrder={createOrder}
                        onApprove={onApprove}
                        disabled={loadingPay}
                      />
                    </div>
                  )}
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
