/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, Row, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { listMyOrders } from '../actions/orderActions';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { useAppSelector } from '../hooks';

const ProfileScreen: React.VFC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const history = useHistory();

  const dispatch = useDispatch();

  const userDetails = useAppSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useAppSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useAppSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useAppSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!user || !user.name) {
      dispatch(getUserDetails('profile'));
      dispatch(listMyOrders());
    } else if (success) {
      dispatch(getUserDetails('profile'));
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    } else {
      setName(user?.name ? user.name : '');
      setEmail(user?.email ? user.email : '');
    }
  }, [dispatch, history, user, userInfo, success]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(
        updateUserProfile({
          id: user?._id ? user._id : '',
          name,
          email,
          password,
        }),
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(
                e: React.ChangeEvent<typeof FormControl & HTMLInputElement>,
              ) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Emeil Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(
                e: React.ChangeEvent<typeof FormControl & HTMLInputElement>,
              ) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(
                e: React.ChangeEvent<typeof FormControl & HTMLInputElement>,
              ) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter confirmPassword"
              value={confirmPassword}
              onChange={(
                e: React.ChangeEvent<typeof FormControl & HTMLInputElement>,
              ) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
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
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
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
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};
export default ProfileScreen;
