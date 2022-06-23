import { combineReducers } from 'redux';
import {
  attributesReducer,
  endpointReducer,
  entityReducer,
  graphNameReducer,
  queryReducer,
  graphiqlEditorReducer,
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
  graphName:graphNameReducer,
  graphiqlEditor:graphiqlEditorReducer,

});
