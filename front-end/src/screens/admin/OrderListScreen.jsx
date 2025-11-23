import React from "react";
import { useGetAllOrdersQuery } from "../../slices/ordersApiSlice.JS";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaTimes } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();
  console.log(orders);

  return (
    <>
      <h1 className="app-section-heading">Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message />
      ) : (
        <table className="table table-striped table-bordered table-hover app-orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className="btn btn-sm btn-light app-details-btn">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderListScreen;
