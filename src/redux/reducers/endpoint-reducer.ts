import {
  EndpointActionObjectTypes,
  EntityActionObjectTypes,
  AttributesActionObjectTypes,
  QueryActionObjectTypes,
} from '../../utility/redux/action-object-type';
import { EndpointActionTypes } from '../../utility/redux/action-types';
const ENDPOINT_INITIAL_STATE = {
  endpoint: '',
};
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
