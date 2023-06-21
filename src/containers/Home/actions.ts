import * as types from './types';

export const increaseRequest = (data: number) => ({
  type: types.INCREASE_REQUEST,
  payload: data,
});

export const increaseSuccess = (data: number) => ({
  type: types.INCREASE_REQUEST_SUCCESS,
  payload: data,
});

export const increaseFailed = () => ({
  type: types.INCREASE_REQUEST_FAILED,
});
