/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Reducer } from 'redux';
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';

export type ReviewType = {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  user: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductType = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  brand: string;
  category: string;
  countInStock: number;
  reviews: Partial<ReviewType>[];
  numReviews: number;
  createdAt: string;
  updatedAt: string;
  rating: number;
};

export type ProductListType = {
  products?: ProductType[];
  loading?: boolean;
  error?: string;
  page?: number;
  pages?: number;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ProductListAction = {
  type: string;
  payload: {
    products: ProductType[];
    page: number;
    pages: number;
    error: string;
  };
};

export const productListReducer: Reducer<ProductListType, ProductListAction> = (
  state: ProductListType = { products: [] },
  action: ProductListAction,
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] } as ProductListType;
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page ?? 1,
        pages: action.payload.pages ?? 1,
      } as ProductListType;
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export type ProductDetailsType = {
  product?: Partial<ProductType>;
  loading?: boolean;
  error?: string;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ProductDetailsAction = { type: string; payload?: any };

export const productDetailsReducer: Reducer<
  ProductDetailsType,
  ProductDetailsAction
> = (
  state: ProductDetailsType = { product: {} },
  action: ProductDetailsAction,
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DETAILS_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export type ProductDeleteType = {
  loading?: boolean;
  error?: string;
  success?: boolean;
};

export type ProductDeleteAction = { type: string; payload?: string };

export const productDeleteReducer: Reducer<
  ProductDeleteType,
  ProductDeleteAction
> = (state: ProductDeleteType = {}, action: ProductDeleteAction) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export type ProductCreateType = {
  loading?: boolean;
  error?: string;
  success?: boolean;
  product?: ProductType;
};

export type ProductCreateAction = {
  type: string;
  payload?: ProductType | string;
};

export const productCreateReducer: Reducer<
  ProductCreateType,
  ProductCreateAction
> = (state: ProductCreateType = {}, action: ProductCreateAction) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true } as ProductCreateType;
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      } as ProductCreateType;
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload } as ProductCreateType;
    case PRODUCT_CREATE_RESET:
      return {} as ProductCreateType;
    default:
      return state;
  }
};

export type ProductUpdateType = {
  loading?: boolean;
  error?: string;
  success?: boolean;
  product?: Partial<ProductType>;
};

export type ProductUpdateAction = {
  type: string;
  payload?: ProductType | string;
};

export const productUpdateReducer: Reducer<
  ProductUpdateType,
  ProductUpdateAction
> = (
  state: ProductUpdateType = { product: {} },
  action: ProductUpdateAction,
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true } as ProductUpdateType;
    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      } as ProductUpdateType;
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload } as ProductUpdateType;
    case PRODUCT_UPDATE_RESET:
      return { product: {} } as ProductUpdateType;
    default:
      return state;
  }
};

export type ProductReviewCreateType = {
  loading?: boolean;
  error?: string;
  success?: boolean;
};

export type ProductReviewCreateAction = {
  type: string;
  payload?: string;
};

export const productReviewCreateReducer: Reducer<
  ProductReviewCreateType,
  ProductReviewCreateAction
> = (
  state: ProductReviewCreateType = {},
  action: ProductReviewCreateAction,
) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true } as ProductReviewCreateType;
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      } as ProductReviewCreateType;
    case PRODUCT_CREATE_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      } as ProductReviewCreateType;
    case PRODUCT_CREATE_REVIEW_RESET:
      return {} as ProductReviewCreateType;
    default:
      return state;
  }
};

export type ProductTopRatedType = {
  loading?: boolean;
  error?: string;
  products: ProductType[];
};

export type ProductTopRatedAction = {
  type: string;
  payload?: string | ProductType[];
};

export const ProductTopRatedReducer: Reducer<
  ProductTopRatedType,
  ProductTopRatedAction
> = (
  state: ProductTopRatedType = { products: [] },
  action: ProductTopRatedAction,
) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] } as ProductTopRatedType;
    case PRODUCT_TOP_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      } as ProductTopRatedType;
    case PRODUCT_TOP_FAIL:
      return {
        loading: false,
        error: action.payload,
      } as ProductTopRatedType;
    default:
      return state;
  }
};
