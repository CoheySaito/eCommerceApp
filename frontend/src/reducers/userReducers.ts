import { Reducer } from 'redux';
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
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
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

export type userInfoType = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  token: string;
};

export type userLoginType = {
  loading?: boolean;
  userInfo?: userInfoType | null;
  error?: string;
};

export type userLoginAction = { type: string; payload: userInfoType | string };

export const userLoginReducer: Reducer<userLoginType, userLoginAction> = (
  state = {} as userLoginType,
  action,
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return { loading: true } as userLoginType;
    }
    case USER_LOGIN_SUCCESS: {
      return { loading: false, userInfo: action.payload } as userLoginType;
    }
    case USER_LOGIN_FAIL: {
      return { loading: false, error: action.payload } as userLoginType;
    }
    case USER_LOGOUT:
      return {} as userLoginType;
    default:
      return state;
  }
};

export type userRegisterType = {
  loading?: boolean;
  userInfo?: userInfoType | null;
  error?: string;
};

export type userRegisterAction = {
  type: string;
  payload: userRegisterType | string;
};

export const userRegisterReducer: Reducer<
  userRegisterType,
  userRegisterAction
> = (state = {} as userRegisterType, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST: {
      return { loading: true } as userRegisterType;
    }
    case USER_REGISTER_SUCCESS: {
      return {
        loading: false,
        userInfo: action.payload,
      } as userRegisterType;
    }
    case USER_REGISTER_FAIL: {
      return { loading: false, error: action.payload } as userRegisterType;
    }

    default:
      return state;
  }
};

export type userDetailsType = {
  loading?: boolean;
  user?: userInfoType & { _id: string };
  error?: string;
};

export type userDetailsAction = {
  type: string;
  payload: userDetailsType | string;
};

export const userDetailsReducer: Reducer<userDetailsType, userDetailsAction> = (
  state = { user: {} } as userDetailsType,
  action,
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST: {
      return { ...state, loading: true } as userDetailsType;
    }
    case USER_DETAILS_SUCCESS: {
      return {
        loading: false,
        user: action.payload,
      } as userDetailsType;
    }
    case USER_DETAILS_FAIL: {
      return { loading: false, error: action.payload } as userDetailsType;
    }
    case USER_UPDATE_PROFILE_RESET: {
      return { user: {} } as userDetailsType;
    }

    default:
      return state;
  }
};

export type userUpdateProfileType = {
  loading?: boolean;
  userInfo?: userInfoType;
  error?: string;
  success?: boolean;
};

export type userUpdateProfileAction = {
  type: string;
  payload: userUpdateProfileType | string;
};

export const userUpdateProfileReducer: Reducer<
  userUpdateProfileType,
  userUpdateProfileAction
> = (state = {} as userUpdateProfileType, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST: {
      return { ...state, loading: true } as userUpdateProfileType;
    }
    case USER_UPDATE_PROFILE_SUCCESS: {
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      } as userUpdateProfileType;
    }
    case USER_UPDATE_PROFILE_FAIL: {
      return { loading: false, error: action.payload } as userUpdateProfileType;
    }
    case USER_UPDATE_PROFILE_RESET: {
      return { success: false } as userUpdateProfileType;
    }

    default:
      return state;
  }
};

export type createdUserType = userInfoType & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
export type userListType = {
  loading?: boolean;
  users?: createdUserType[];
  error?: string;
};

export type userListAction = {
  type: string;
  payload: createdUserType[] | string;
};

export const userListReducer: Reducer<userListType, userListAction> = (
  state = { users: [] } as userListType,
  action,
) => {
  switch (action.type) {
    case USER_LIST_REQUEST: {
      return { ...state, loading: true } as userListType;
    }
    case USER_LIST_SUCCESS: {
      return {
        loading: false,
        users: action.payload,
      } as userListType;
    }
    case USER_LIST_FAIL: {
      return { loading: false, error: action.payload } as userListType;
    }
    case USER_LIST_RESET: {
      return { users: [] } as userListType;
    }

    default:
      return state;
  }
};

export type userDeleteType = {
  loading?: boolean;
  error?: string;
  success?: boolean;
};

export type userDeleteAction = {
  type: string;
  payload: string;
};

export const userDeleteReducer: Reducer<userDeleteType, userDeleteAction> = (
  state = {} as userDeleteType,
  action,
) => {
  switch (action.type) {
    case USER_DELETE_REQUEST: {
      return { loading: true } as userDeleteType;
    }
    case USER_DELETE_SUCCESS: {
      return {
        loading: false,
        success: true,
      } as userDeleteType;
    }
    case USER_DELETE_FAIL: {
      return { loading: false, error: action.payload } as userDeleteType;
    }

    default:
      return state;
  }
};

export type userUpdateInfoType = Pick<
  userInfoType,
  'name' | 'email' | 'isAdmin'
> & { _id: string };

export type userUpdateType = {
  loading?: boolean;
  error?: string;
  success?: boolean;
  user?: createdUserType;
};

export type userUpdateAction = {
  type: string;
  payload: string;
};

export const userUpdateReducer: Reducer<userUpdateType, userUpdateAction> = (
  state = { user: {} } as userUpdateType,
  action,
) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST: {
      return { loading: true } as userUpdateType;
    }
    case USER_UPDATE_SUCCESS: {
      return {
        loading: false,
        success: true,
      } as userUpdateType;
    }
    case USER_UPDATE_FAIL: {
      return { loading: false, error: action.payload } as userUpdateType;
    }

    case USER_UPDATE_RESET: {
      return { user: {} } as userUpdateType;
    }

    default:
      return state;
  }
};
