/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Button, Form, FormCheck, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getUserDetails, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import { useAppSelector } from '../hooks';

const UserEditScreen: React.VFC = () => {
  const { id: userId } = useParams<{ id: string }>();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const userDetails = useAppSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useAppSelector((state) => state.userUpdate);
  const {
    loading: loadingUpate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userList');
    } else if (!user?.name || user?._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user, userId, successUpdate, history]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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

            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(
                e: React.ChangeEvent<typeof FormCheck & HTMLInputElement>,
              ) => setIsAdmin(e.target.checked)}
            />

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default UserEditScreen;
