/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from '../constants/orderConstants';
import {
  CreatedOrderType,
  OrderAllListType,
  OrderListType,
  OrderType,
} from '../reducers/orderRedusers';
import { userInfoType } from '../reducers/userReducers';

import { AppDispatch, RootState } from '../store';

export const createOrder =
  (order: Partial<OrderType>) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      });

      const userInfo = getState().userLogin.userInfo as userInfoType;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.post(`/api/orders`, order, config);
      const data = response.data as OrderType & {
        user: string;
        _id: string;
        email: string;
      };

      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getOrderDetails =
  (id: string) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      });

      const userInfo = getState().userLogin.userInfo as userInfoType;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.get(`/api/orders/${id}`, config);
      const data = response.data as CreatedOrderType;

      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const payOrder =
  (orderId: string, paymentResult: any) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });

      const userInfo = getState().userLogin.userInfo as userInfoType;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config,
      );
      const data = response.data as CreatedOrderType;

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deliverOrder =
  (order: CreatedOrderType) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({
        type: ORDER_DELIVER_REQUEST,
      });

      const userInfo = getState().userLogin.userInfo as userInfoType;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        config,
      );
      const data = response.data as CreatedOrderType;

      dispatch({
        type: ORDER_DELIVER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_DELIVER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listMyOrders =
  () =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({
        type: ORDER_LIST_MY_REQUEST,
      });

      const userInfo = getState().userLogin.userInfo as userInfoType;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.get(`/api/orders/myorders`, config);
      const data = response.data as OrderListType[];

      dispatch({
        type: ORDER_LIST_MY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listOrders =
  () =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
      });

      const userInfo = getState().userLogin.userInfo as userInfoType;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.get(`/api/orders`, config);
      const data = response.data as OrderAllListType[];

      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
