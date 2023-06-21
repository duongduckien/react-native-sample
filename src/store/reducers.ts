import { combineReducers } from 'redux';
import homeReducer from '../containers/Home/reducer';

export const combinedReducers = combineReducers({
  home: homeReducer,
});
