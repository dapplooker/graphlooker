import { EndpointActionTypes } from "../../utility/redux/action-types";
export const setGraphEndpoint = (endpoint: string) => {
  return {
    type: EndpointActionTypes.SET_ENDPOINT,
    payload: endpoint,
  };
};
export const setGraphEntity = (entity: string) => {
  return {
    type: EndpointActionTypes.SET_ENTITY,
    payload: entity,
  };
};
export const setGraphAttributes = (
  entity: { name: string; type: string; typeName: string }[]
) => {
  return {
    type: EndpointActionTypes.SET_ATTRIBUTES,
    payload: entity,
  };
};
export const setGraphQuery = (query: any) => {
  return {
    type: EndpointActionTypes.SET_QUERY,
    payload: query,
  };
};