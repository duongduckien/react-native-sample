import * as types from './types';
import { IAction } from  '../../interfaces/store';

interface IState {
  loading: boolean;
  number: number;
}

const initialState: IState = {
  loading: false,
  number: 0,
};

const homeReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case types.INCREASE_REQUEST: {
      return { ...state, loading: true };
    }
    case types.INCREASE_REQUEST_SUCCESS: {
      return { ...state, number: action.payload + 1, loading: false };
    }
    case types.INCREASE_REQUEST_FAILED: {
      return { ...state, loading: false };
    }
    default: {
      return state;
    }
  }
};

export default homeReducer;
