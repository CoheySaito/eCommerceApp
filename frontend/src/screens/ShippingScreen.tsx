import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import { useAppSelector } from '../hooks';

const ShippingScreen: React.VFC = () => {
  const cart = useAppSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState<string>(
    shippingAddress.address ? shippingAddress.address : '',
  );
  const [city, setCity] = useState<string>(
    shippingAddress.city ? shippingAddress.city : '',
  );
  const [postalCode, setPostalCode] = useState<string>(
    shippingAddress.postalCode ? shippingAddress.postalCode : '',
  );
  const [country, setCountry] = useState<string>(
    shippingAddress.country ? shippingAddress.country : '',
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(
              e: React.ChangeEvent<typeof FormControl & HTMLInputElement>,
            ) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(
              e: React.ChangeEvent<typeof FormControl & HTMLInputElement>,
            ) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter PostalCode"
            value={postalCode}
            required
            onChange={(
              e: React.ChangeEvent<typeof FormControl & HTMLInputElement>,
            ) => setPostalCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(
              e: React.ChangeEvent<typeof FormControl & HTMLInputElement>,
            ) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};
export default ShippingScreen;
