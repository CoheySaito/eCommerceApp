import React, { VFC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer: VFC = () => (
  <footer>
    <Container>
      <Row>
        <Col className="text-center py-3">Copyright &copy;ProShop</Col>
      </Row>
    </Container>
  </footer>
);
export default Footer;
