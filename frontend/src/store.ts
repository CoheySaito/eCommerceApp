import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  CartPayloadType,
  cartReducer,
  shippingDataType,
} from './reducers/cartReducers';
import {
  userDeleteReducer,
  userDetailsReducer,
  userInfoType,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from './reducers/orderRedusers';
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  ProductTopRatedReducer,
  productUpdateReducer,
} from './reducers/productReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productReviewCreate: productReviewCreateReducer,
  ProductTopRated: ProductTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
});

const cartItemFromStrage = localStorage.getItem('cartItems')
  ? (JSON.parse(localStorage.getItem('cartItems') ?? '') as CartPayloadType[])
  : [];

const userInfoFromStrage = localStorage.getItem('userInfo')
  ? (JSON.parse(localStorage.getItem('userInfo') ?? '') as userInfoType)
  : null;

const paymentMethodFromStrage = localStorage.getItem('paymentMethod')
  ? (JSON.parse(localStorage.getItem('paymentMethod') ?? '') as string)
  : '';

const shippingAddressFromStrage = localStorage.getItem('ShippngAddress')
  ? (JSON.parse(
      localStorage.getItem('ShippngAddress') ?? '',
    ) as shippingDataType)
  : {};

const initialState = {
  cart: {
    cartItems: cartItemFromStrage,
    shippingAddress: shippingAddressFromStrage as shippingDataType,
    paymentMethod: paymentMethodFromStrage,
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
  userLogin: { userInfo: userInfoFromStrage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
