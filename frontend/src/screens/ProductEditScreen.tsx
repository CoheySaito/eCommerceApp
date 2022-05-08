/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import axios, { AxiosRequestConfig } from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { listProductDetails, updateProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { useAppSelector } from '../hooks';
import { ProductType } from '../reducers/productReducers';

const ProductEditScreen: React.VFC = () => {
  const { id: productId } = useParams<{ id: string }>();

  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [countInStock, setCountInStock] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const productDetails = useAppSelector((state) => state.productDetails);
  const { loading, error } = productDetails;
  const product = productDetails.product as ProductType;

  const productUpdate = useAppSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, history, product, productId, successUpdate]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }),
    );
  };

  const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : '';
    // FormData オブジェクトを生成
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      } as AxiosRequestConfig;

      const { data }: { data: string } = await axios.post(
        '/api/upload',
        formData,
        config,
      );
      setImage(data);
      setUploading(false);
    } catch (errorApiUpload) {
      // eslint-disable-next-line no-console
      console.error(errorApiUpload);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
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

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(
                  e: React.ChangeEvent<typeof FormControl & HTMLInputElement>,
                ) => setPrice(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(
                  e: React.ChangeEvent<typeof FormControl & HTMLInputElement>,
                ) => setImage(e.target.value)}
              />
              <Form.File
                id="image-file"
                label="Choose file"
                custom
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand url"
                value={brand}
                onChange={(
                  e: React.ChangeEvent<typeof FormControl & HTMLInputElement>,
                ) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(
                  e: React.ChangeEvent<typeof FormControl & HTMLInputElement>,
                ) => setCountInStock(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(
                  e: React.ChangeEvent<typeof FormControl & HTMLInputElement>,
                ) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(
                  e: React.ChangeEvent<typeof FormControl & HTMLInputElement>,
                ) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default ProductEditScreen;
