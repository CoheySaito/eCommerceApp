import { Reducer } from 'redux';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export type shippingDataType = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type CartPayloadType = {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
};
export type CartType = {
  cartItems: CartPayloadType[];
  shippingAddress: shippingDataType;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};

export type CartAction =
  | { type: string; payload?: CartPayloadType }
  | { type: string; payload?: string }
  | { type: string; payload?: shippingDataType };

export const cartReducer: Reducer<CartType, CartAction> = (
  state: CartType = {
    cartItems: [],
    shippingAddress: { address: '', city: '', postalCode: '', country: '' },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
  action: CartAction,
) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload as CartPayloadType;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x,
          ),
        } as CartType;
      }

      return { ...state, cartItems: [...state.cartItems, item] } as CartType;
    }

    case CART_REMOVE_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    }

    case CART_SAVE_SHIPPING_ADDRESS: {
      return {
        ...state,
        shippingAddress: action.payload as shippingDataType,
      };
    }

    case CART_SAVE_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: action.payload as string,
      };
    }
    default:
      return state;
  }
};
