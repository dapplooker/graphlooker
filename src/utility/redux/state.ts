
interface GraphiqlEditor {
  editorState: boolean;
}
export interface graphiqlEditorState {
  graphiqlEditor: GraphiqlEditor;
}

interface ThemeSelector {
  theme: string;
}
export interface ThemeState {
  themeSelector: ThemeSelector;
}
interface GraphEndpoint {
  endpoint: string;
}
export interface EndpointState {
  graphEndpoint: GraphEndpoint;
}
interface GraphName {
  subgraphName: string;
}

export interface GraphNameState {
  graphName: GraphName;
}

interface SelectedEntity {
  entity: string;
}
export interface EntityState {
  selectedEntity: SelectedEntity;
}
interface AllAttributes {
  attributes: { name: string; type: string; typeName: string }[];
}
export interface AttributesState {
  allAttributes: AllAttributes;
}

interface QueryData {
  query: string;
}
export interface QueryDataState {
  queryState: any;
  queryData: QueryData;
}
interface DataLoading {
  loading: boolean;
}
export interface LoadingState {
  dataLoading: DataLoading;
}
