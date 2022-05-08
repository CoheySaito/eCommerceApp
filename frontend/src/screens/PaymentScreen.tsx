import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import { useAppSelector } from '../hooks';

const PaymentScreen: React.VFC = () => {
  const cart = useAppSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const history = useHistory();

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState<string>('Paypal');

  const dispatch = useDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(
                e: React.ChangeEvent<typeof Form.Check & HTMLInputElement>,
              ) => setPaymentMethod(e.target.value)}
            />

            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(
                e: React.ChangeEvent<typeof Form.Check & HTMLInputElement>,
              ) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};
export default PaymentScreen;
