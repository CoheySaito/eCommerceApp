/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { Col, ListGroup, Row, Image, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { useAppSelector } from '../hooks';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen: React.VFC = () => {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();

  const history = useHistory();

  // Calculate price
  const addDecimals = (num: number): number =>
    Number((Math.round(num * 100) / 100).toFixed(2));

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
  cart.taxPrice = addDecimals(Number((0.1 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = Number(
    (cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2),
  );

  const orderCreate = useAppSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(order?._id ? `/order/${order._id}` : '/order');
    }
  }, [history, order, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }),
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Shipping</h2>
            <strong>Address:</strong>
            {cart.shippingAddress.address},{cart.shippingAddress.city},
            {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>PaymentMethod</h2>
            <strong>Method:</strong>
            {cart.paymentMethod}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ListGroup variant="flush">
                {cart.cartItems.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
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

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
