/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { listOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useAppSelector } from '../hooks';
import { OrderAllListOrdersType } from '../reducers/orderRedusers';

const OrderListScreen: React.VFC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useAppSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useAppSelector((state) => state.orderList);
  const { loading, error } = orderList;
  const orders = orderList.orders as OrderAllListOrdersType[];

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>Oeders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERD</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red ' }} />
                  )}
                </td>
                <td>
                  {order.isDeliverd ? (
                    order.deliverdAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red ' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
export default OrderListScreen;
