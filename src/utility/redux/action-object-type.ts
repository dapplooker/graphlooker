export interface SubgraphNetworkActionObjectTypes {
  type: string;
  payload: string;
}
export interface GraphiqlEditorActionObjectTypes {
  type: boolean;
  payload: boolean;
}
export interface ThemeActionObjectTypes {
  type: string;
  payload: string;
}
export interface EndpointActionObjectTypes {
  type: string;
  payload: string;
}
export interface EntityActionObjectTypes {
  type: string;
  payload: string;
}
export interface AttributesActionObjectTypes {
  type: string;
  payload: { name: string; type: string; typeName: string }[];
}
export interface LoadingActionObjectTypes {
  type: boolean;
  payload: boolean;
}
export interface QueryActionObjectTypes {
  type: string;
  payload: any;
}
