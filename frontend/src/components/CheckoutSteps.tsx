import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

type CheckoutStepsProps = {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
};

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({
  step1 = false,
  step2 = false,
  step3 = false,
  step4 = false,
}) => (
  <Nav className="justify-content-cneter mb-4">
    <Nav.Item>
      {step1 ? (
        <LinkContainer to="/login">
          <Nav.Link>Sign In</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Sign In</Nav.Link>
      )}
    </Nav.Item>

    <Nav.Item>
      {step2 ? (
        <LinkContainer to="/shipping">
          <Nav.Link>Shipping</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Shipping</Nav.Link>
      )}
    </Nav.Item>

    <Nav.Item>
      {step3 ? (
        <LinkContainer to="/payment">
          <Nav.Link>Payment</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Payment</Nav.Link>
      )}
    </Nav.Item>

    <Nav.Item>
      {step4 ? (
        <LinkContainer to="/placeorder">
          <Nav.Link>Place Order</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Place Order</Nav.Link>
      )}
    </Nav.Item>
  </Nav>
);
export default CheckoutSteps;
