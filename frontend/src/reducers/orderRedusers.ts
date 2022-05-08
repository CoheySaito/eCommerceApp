/* eslint-disable camelcase */
import { Reducer } from 'redux';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from '../constants/orderConstants';

import { CartPayloadType, shippingDataType } from './cartReducers';

export type UserType = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export type OrderType = {
  orderItems: CartPayloadType[];
  shippingAddress: shippingDataType;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

export type OrderCreateType = {
  loading?: boolean;
  success?: boolean;
  order?: Partial<OrderType & { user: string; _id: string }>;
  error?: string | null;
};

export type OrderCreateAction = {
  type: string;
  payload?: OrderType & { user: string; _id: string };
};

export const orderCreateReducer: Reducer<OrderCreateType, OrderCreateAction> = (
  state = {
    loading: false,
    success: false,
    order: {},
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST: {
      return { loading: true } as OrderCreateType;
    }
    case ORDER_CREATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        order: action.payload,
      } as OrderCreateType;
    }
    case ORDER_CREATE_FAIL: {
      return { loading: false } as OrderCreateType;
    }

    default:
      return state;
  }
};

export type CreatedOrderType = OrderType & {
  user: UserType;
  _id: string;
  email: string;
  isPaid: boolean;
  paidAt: string;
  isDeliverd: boolean;
  deliverdAt: string;
};

export type OrderDetailsType = {
  loading: boolean;
  orderItems: CartPayloadType[];
  shippingAddress: shippingDataType;
  error?: string | null;
  order?: Partial<CreatedOrderType>;
};

export type OrderDetailsAction = {
  type: string;
  payload?: CreatedOrderType | string;
};

export const orderDetailsReducer: Reducer<
  OrderDetailsType,
  OrderDetailsAction
> = (
  state = {
    loading: true,
    orderItems: [],
    shippingAddress: { address: '', city: '', postalCode: '', country: '' },
    order: {
      orderItems: [
        {
          product: '',
          name: '',
          image: '',
          price: 0,
          countInStock: 0,
          qty: 0,
        },
      ],
    },
  },
  action,
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST: {
      return { ...state, loading: true } as OrderDetailsType;
    }
    case ORDER_DETAILS_SUCCESS: {
      return {
        loading: false,
        order: action.payload,
      } as OrderDetailsType;
    }
    case ORDER_DETAILS_FAIL: {
      return {
        loading: false,
        error: action.payload,
      } as OrderDetailsType;
    }

    default:
      return state;
  }
};

export type OrderPayType = {
  loading?: boolean;
  success?: boolean;
  error?: string | null;
};

export type OrderPayAction = {
  type: string;
  payload?: string;
};

export const orderPayReducer: Reducer<OrderPayType, OrderPayAction> = (
  state = {},
  action,
) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST: {
      return { loading: true } as OrderPayType;
    }
    case ORDER_PAY_SUCCESS: {
      return {
        loading: false,
        success: true,
      } as OrderPayType;
    }
    case ORDER_PAY_FAIL: {
      return {
        loading: false,
        error: action.payload,
      } as OrderPayType;
    }
    case ORDER_PAY_RESET: {
      return {} as OrderPayType;
    }

    default:
      return state;
  }
};

export type OrderDeliverType = {
  loading?: boolean;
  success?: boolean;
  error?: string | null;
};

export type OrderDeliverAction = {
  type: string;
  payload?: string;
};

export const orderDeliverReducer: Reducer<
  OrderDeliverType,
  OrderDeliverAction
> = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST: {
      return { loading: true } as OrderDeliverType;
    }
    case ORDER_DELIVER_SUCCESS: {
      return {
        loading: false,
        success: true,
      } as OrderDeliverType;
    }
    case ORDER_DELIVER_FAIL: {
      return {
        loading: false,
        error: action.payload,
      } as OrderDeliverType;
    }
    case ORDER_DELIVER_RESET: {
      return {} as OrderDeliverType;
    }

    default:
      return state;
  }
};

export type PaymentResulType = {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
};

export type OrderListType = {
  orderItems: CartPayloadType[];
  shippingAddress: shippingDataType;
  paymentResult: PaymentResulType;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: string;
  isDeliverd: boolean;
  deliverdAt: string;
  _id: string;
  user: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderListMyType = {
  loading?: boolean;
  orders: OrderListType[];
  error?: string | null;
};

export type OrderListMyAction = {
  type: string;
  payload?: OrderListType[] | string;
};

export const orderListMyReducer: Reducer<OrderListMyType, OrderListMyAction> = (
  state = { orders: [] },
  action,
) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST: {
      return { loading: true } as OrderListMyType;
    }
    case ORDER_LIST_MY_SUCCESS: {
      return {
        loading: false,
        orders: action.payload,
      } as OrderListMyType;
    }
    case ORDER_LIST_MY_FAIL: {
      return {
        loading: false,
        error: action.payload,
      } as OrderListMyType;
    }
    case ORDER_LIST_MY_RESET: {
      return { orders: [] } as OrderListMyType;
    }

    default:
      return state;
  }
};

export type OrderAllListOrdersType = Omit<OrderListType, 'user'> & {
  user: { _id: string; name: string };
};

export type OrderAllListType = {
  loading?: boolean;
  orders?: OrderAllListOrdersType[];
  error?: string | null;
};

export type OrderAllListAction = {
  type: string;
  payload?: OrderAllListType[] | string;
};

export const orderListReducer: Reducer<OrderAllListType, OrderAllListAction> = (
  state = { orders: [] },
  action,
) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST: {
      return { ...state, loading: true } as OrderAllListType;
    }
    case ORDER_LIST_SUCCESS: {
      return {
        loading: false,
        orders: action.payload,
      } as OrderAllListType;
    }
    case ORDER_LIST_FAIL: {
      return {
        loading: false,
        error: action.payload,
      } as OrderAllListType;
    }

    default:
      return state;
  }
};
