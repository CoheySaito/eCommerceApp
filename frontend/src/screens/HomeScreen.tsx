/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { VFC, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Paginate from '../components/Pagenate';
import Product from '../components/Product';
import ProductCarousel from '../components/ProductCarousel';
import { ProductListType } from '../reducers/productReducers';
import { RootState } from '../store';
// import products from '../products';

const HomeScreen: VFC = () => {
  const { keyword, pageNumber = '1' } =
    useParams<{ keyword: string; pageNumber: string }>();

  const dispatch = useDispatch();

  const productList = useSelector<RootState, ProductListType>(
    (state) => state.productList,
  );

  const { loading = false, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta title="Welcome To Proshop | Home" />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products &&
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product {...{ product }} />
                </Col>
              ))}
          </Row>
          <Paginate
            pages={pages || 1}
            page={page || 1}
            keyword={keyword || ''}
          />
        </>
      )}
    </>
  );
};
export default HomeScreen;
