/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Col,
  ListGroup,
  Row,
  Image,
  Card,
  ListGroupItem,
  Button,
} from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { useAppSelector } from '../hooks';
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { CreatedOrderType } from '../reducers/orderRedusers';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';
import { userInfoType } from '../reducers/userReducers';

const OrderScreen: React.VFC = () => {
  const { id: orderId } = useParams<{ id: string }>();

  const [sdkReady, setSdkReady] = useState<boolean>(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const orderDetails = useAppSelector((state) => state.orderDetails);
  const { loading, error } = orderDetails;
  const order = orderDetails.order as CreatedOrderType;

  const orderPay = useAppSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useAppSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useAppSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo as userInfoType;

  if (!loading) {
    // Calculate price
    const addDecimals = (num: number): number =>
      Number((Math.round(num * 100) / 100).toFixed(2));

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    const addPayPalScript = async () => {
      const { data: clientId }: { data: string } = await axios.get(
        '/api/config/paypal',
      );

      const script: HTMLScriptElement = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      void addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, [dispatch, history, order, orderId, successDeliver, successPay, userInfo]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sucessPaymentHandler = (paymentResult: any) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                {' '}
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>

              {order.isDeliverd ? (
                <Message variant="success">
                  Deliverd on {order.deliverdAt}
                </Message>
              ) : (
                <Message variant="danger">Not Deliverd</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>PaymentMethod</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} × ${item.price} =${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={sucessPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDeliverd && (
                  <ListGroupItem>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Deliverd
                    </Button>
                  </ListGroupItem>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
