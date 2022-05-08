import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useAppSelector } from '../hooks';

const RegisterScreen: React.VFC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const userRegister = useAppSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
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
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Accunt?
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default RegisterScreen;
