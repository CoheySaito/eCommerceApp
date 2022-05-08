/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Pagenate';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { useAppSelector } from '../hooks';
import { ProductType } from '../reducers/productReducers';

const ProductListScreen: React.VFC = () => {
  const { pageNumber = '1' } = useParams<{ pageNumber: string }>();
  const history = useHistory();
  const dispatch = useDispatch();

  const productList = useAppSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useAppSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: sucessDelete,
  } = productDelete;

  const productCreate = useAppSelector((state) => state.productCreate) as {
    loading: boolean;
    error: string;
    success: boolean;
    product: ProductType;
  };

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useAppSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    }
    dispatch(listProducts('', pageNumber));
  }, [
    dispatch,
    history,
    userInfo,
    sucessDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id: string) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa--plus" />
            Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages || 1} page={page || 1} keyword="" isAdmin />
        </>
      )}
    </>
  );
};
export default ProductListScreen;
