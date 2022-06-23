import {
  EndpointActionObjectTypes,
  EntityActionObjectTypes,
  AttributesActionObjectTypes,
  QueryActionObjectTypes,
  SubgraphNetworkActionObjectTypes,
  GraphiqlEditorActionObjectTypes
} from '../../utility/redux/action-object-type';
import { EndpointActionTypes, GraphiqlEditorActionTypes } from '../../utility/redux/action-types';

const ENDPOINT_INITIAL_STATE = {
  endpoint: '',
};

const GraphiQL_INTIAL_STATE={
  editorState:false,
}

export const graphiqlEditorReducer=(
  state = GraphiQL_INTIAL_STATE,
  { type, payload }: GraphiqlEditorActionObjectTypes
) => {
  switch (type) {
    case GraphiqlEditorActionTypes.SET_EDITOR_STATE:
      return { ...state, editorState: payload };
    default:
      return state;
  }
}




export const graphNameReducer=(
  state = ENDPOINT_INITIAL_STATE,
  { type, payload }: SubgraphNetworkActionObjectTypes
) => {
  switch (type) {
    case EndpointActionTypes.SET_SUBGRAPH_NETWORKNAME:
      return { ...state, subgraphName: payload };
    default:
      return state;
  }
}
export const endpointReducer = (
  state = ENDPOINT_INITIAL_STATE,
  { type, payload }: EndpointActionObjectTypes
) => {
  switch (type) {
    case EndpointActionTypes.SET_ENDPOINT:
      return { ...state, endpoint: payload };
    default:
      return state;
  }
};
export const entityReducer = (state = {}, { type, payload }: EntityActionObjectTypes) => {
  switch (type) {
    case EndpointActionTypes.SET_ENTITY:
      return { ...state, entity: payload };
    default:
      return state;
  }
};

export const attributesReducer = (state = {}, { type, payload }: AttributesActionObjectTypes) => {
  switch (type) {
    case EndpointActionTypes.SET_ATTRIBUTES:
      return { ...state, attributes: payload };
    default:
      return state;
  }
};

export const queryReducer = (state = {}, { type, payload }: QueryActionObjectTypes) => {
  switch (type) {
    case EndpointActionTypes.SET_QUERY:
      return { ...state, query: payload };
    default:
      return state;
  }
};
