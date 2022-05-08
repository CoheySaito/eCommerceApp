/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';
import { ProductType, ReviewType } from '../reducers/productReducers';
import { userInfoType } from '../reducers/userReducers';
import { AppDispatch, RootState } from '../store';

export const listProducts =
  (keyword = '', pageNumber = '') =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`,
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: {
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        },
      });
    }
  };

export const listProductDetails =
  (id: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteProduct =
  (id: string) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({
        type: PRODUCT_DELETE_REQUEST,
      });

      const userInfo = getState().userLogin.userInfo as userInfoType;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/products/${id}`, config);

      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createProduct =
  () =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      });

      const userInfo = getState().userLogin.userInfo as userInfoType;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data }: { data: ProductType } = await axios.post(
        `/api/products`,
        {},
        config,
      );

      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateProduct =
  (
    product: Pick<
      ProductType,
      | '_id'
      | 'name'
      | 'price'
      | 'image'
      | 'brand'
      | 'category'
      | 'countInStock'
      | 'description'
    >,
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
      });

      const userInfo = getState().userLogin.userInfo as userInfoType;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data }: { data: ProductType } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config,
      );

      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createProductReview =
  (productId: string, review: Pick<ReviewType, 'rating' | 'comment'>) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      });

      const userInfo = getState().userLogin.userInfo as userInfoType;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listTopProducts =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({ type: PRODUCT_TOP_REQUEST });
      const { data } = await axios.get(`/api/products/top`);
      dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_TOP_FAIL,
        payload: {
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        },
      });
    }
  };
