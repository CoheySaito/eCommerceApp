import React, { useEffect } from 'react';
import {
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  FormControl,
  Button,
  Card,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';
import { useAppSelector } from '../hooks';

const CartScreen: React.VFC = () => {
  // 分割代入をするとき変数名を別の名前に
  const { id: productId } = useParams<{ id: string }>();
  const location = useLocation();
  const history = useHistory();

  const qty: number = location.search
    ? Number(location.search.split('=')[1])
    : 1;

  const dispatch = useDispatch();

  const cart = useAppSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCarthandler = (id: string): void => {
    dispatch(removeFromCart(id));
  };

  const checkouthandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  ${item.price}
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(
                        e: React.ChangeEvent<
                          typeof FormControl & HTMLInputElement
                        >,
                      ) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value)),
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCarthandler(item.product)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup.Item>
            <h2>
              Subtotal({cartItems.reduce((acc, item) => acc + item.qty, 0)}
              )items
            </h2>
            $
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={checkouthandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
};
export default CartScreen;
