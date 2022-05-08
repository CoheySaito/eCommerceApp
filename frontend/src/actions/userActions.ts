/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';
import {
  createdUserType,
  userInfoType,
  userUpdateInfoType,
} from '../reducers/userReducers';

import { AppDispatch, RootState } from '../store';

export const login =
  (email: string, password: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(
        `/api/users/login`,
        { email, password },
        config,
      );
      const data = response.data as userInfoType;

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout =
  () =>
  (dispatch: AppDispatch): void => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_UPDATE_PROFILE_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
    dispatch({ type: USER_LIST_RESET });
  };

export const register =
  (name: string, email: string, password: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(
        `/api/users`,
        { name, email, password },
        config,
      );
      const data = response.data as userInfoType;

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserDetails =
  (id: string) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
      });

      const userInfo = getState().userLogin.userInfo as userInfoType;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.get(`/api/users/${id}`, config);
      const data = response.data as userInfoType & { _id: string };

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

type updateUserProfileType = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export const updateUserProfile =
  (user: updateUserProfileType) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      });

      const userInfo = getState().userLogin.userInfo as userInfoType;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.put(`/api/users/profile`, user, config);
      const data = response.data as userInfoType;

      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listUsers =
  () =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      });

      const userInfo = getState().userLogin.userInfo as userInfoType;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.get(`/api/users`, config);
      const data = response.data as createdUserType;

      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteUser =
  (id: string) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({
        type: USER_DELETE_REQUEST,
      });

      const userInfo = getState().userLogin.userInfo as userInfoType;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.delete(`/api/users/${id}`, config);
      response.data as createdUserType;

      dispatch({
        type: USER_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: USER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUser =
  (user: userUpdateInfoType) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
      });

      const userInfo = getState().userLogin.userInfo as userInfoType;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data }: { data: createdUserType } = await axios.put(
        `/api/users/${user._id}`,
        user,
        config,
      );

      dispatch({
        type: USER_UPDATE_SUCCESS,
      });
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_DETAILS_RESET,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
