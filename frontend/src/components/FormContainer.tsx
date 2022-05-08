import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const FormContainer: React.FC = ({ children }) => (
  <Container>
    <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
        {children}
      </Col>
    </Row>
  </Container>
);
export default FormContainer;
