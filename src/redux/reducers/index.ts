import { combineReducers } from 'redux';
import {
  attributesReducer,
  endpointReducer,
  entityReducer,
  queryReducer,
} from './endpoint-reducer';
import { loadingReducer } from './loading-reducer';
import { themeReducer } from './theme-reducer';
export const reducers = combineReducers({
  themeSelector: themeReducer,
  graphEndpoint: endpointReducer,
  selectedEntity: entityReducer,
  allAttributes: attributesReducer,
  dataLoading: loadingReducer,
  queryState: queryReducer,
});
