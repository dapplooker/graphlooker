import { gql } from '@apollo/client';
import Constants from '../constant';
import Utility from '../utility';

const label = Constants.FILTERLABELS.dataTypeLabels;

export const getAllEntities = gql`
  query {
    __schema {
      queryType {
        fields {
          name
        }
      }
    }
  }
`;

export const getAllAttributes = (entity: string) => {
  entity = Utility.getProperEntity(entity);
  return gql`
        query{
          __type(name:"${entity}"){
            name
          fields{
            name
            type{
              ofType{
                name
                kind
              }
            }
          }
        }
        }
    `;
};

export const getGraphData = (
  columnNames: { name: string; type: string; typeName: string }[],
  entity: string,
  count: number,
  skip: number
) => {
  let queryData = ` `;
  const selectedEntity = Utility.makePluralChanges(entity);
  let orderByColumnName = 'id';
  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index];
    if (element.name === 'id') {
      continue;
    }
    if (
      element.type === label.LIST ||
      element.type === label.OBJECT ||
      element.type === label.NON_NULL
    ) {
      queryData = queryData + `${element.name} { id } `;
    } else {
      queryData = queryData + `${element.name} `;
    }
  }

  orderByColumnName = Utility.getColumnNameForOptimizeQuery(columnNames);

  return gql`
    query {
      entity: ${selectedEntity}(first:${count},skip:${skip}, orderBy:${orderByColumnName}, orderDirection: desc){
        id      
        ${queryData}
        }
    }
    `;
};

export const getGraphDataForID = (
  columnNames: { name: string; type: string; typeName: string }[],
  entity: string,
  filterID: string
) => {
  let queryData = ` `;
  const selectedEntity = Utility.makePluralChanges(entity);
  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index];
    if (element.name === 'id') {
      continue;
    }
    if (
      element.type === label.LIST ||
      element.type === label.OBJECT ||
      element.type === label.NON_NULL
    ) {
      queryData = queryData + `${element.name} { id } `;
    } else {
      queryData = queryData + `${element.name} `;
    }
  }

  return gql`
      query {
        entity: ${selectedEntity}(where:{id:"${filterID}"}){
          id      
          ${queryData}
          }
      }
      `;
};

export const getSortedGraphData = (
  columnNames: { name: string; type: string; typeName: string }[],
  entity: string,
  sortType: string,
  attributeName: string
) => {
  let queryData = ` `;
  const selectedEntity = Utility.makePluralChanges(entity);
  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index];
    if (element.name === 'id') {
      continue;
    }
    if (
      element.type === label.LIST ||
      element.type === label.OBJECT ||
      element.type === label.NON_NULL
    ) {
      queryData = queryData + `${element.name} { id } `;
    } else {
      queryData = queryData + `${element.name} `;
    }
  }

  return gql`
      query {
        entity: ${selectedEntity}(first:100, orderBy: ${attributeName}, orderDirection: ${sortType} ){
          id      
          ${queryData}
          }
      }
      `;
};

//Query for Filter Menu
export const getStringFilterGraphData = (
  columnNames: { name: string; type: string; typeName: string }[],
  entity: string,
  filterOption: string,
  attributeName: string,
  userInputValue: string
) => {
  let queryData = ` `;
  const selectedEntity = Utility.makePluralChanges(entity);
  attributeName = attributeName.concat(filterOption);
  let orderByColumnName = 'id';
  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index];
    if (element.name === 'id') {
      continue;
    }
    if (
      element.type === label.LIST ||
      element.type === label.OBJECT ||
      element.type === label.NON_NULL
    ) {
      queryData = queryData + `${element.name} { id } `;
    } else {
      queryData = queryData + `${element.name} `;
    }
  }

  if (userInputValue === '') {
    userInputValue = 'null';
  } else {
    userInputValue = '"' + userInputValue + '"';
  }

  orderByColumnName = Utility.getColumnNameForOptimizeQuery(columnNames);

  return gql`
      query {
        entity: ${selectedEntity}(first:100,orderBy:${orderByColumnName}, orderDirection: desc,where: {${attributeName} :${userInputValue}}){
          id      
          ${queryData}
          }
      }
      `;
};

// Query based on last ID (export to csv)

export const getCsvDataQuery = (
  columnNames: { name: string; type: string; typeName: string }[],
  queryData: string,
  entity: any,
  count: number,
  whereId: any
) => {
  const selectedEntity = Utility.makePluralChanges(entity);
  let orderByColumnName = 'id';
  orderByColumnName = Utility.getColumnNameForOptimizeQuery(columnNames);

  return gql`
    query {
      entity: ${selectedEntity}(first:${count}, orderBy: ${orderByColumnName}, orderDirection: desc, where: {id_gt:"${whereId}" } ){
        id      
        ${queryData}
        }
    }
    `;
};

// Query based on last ID and asc, desc (export to csv)

export const getSortedCsvDataQuery = (
  queryData: string,
  entity: any,
  count: number,
  sortType: string,
  attributeName: string,
  whereId: any
) => {
  const selectedEntity = Utility.makePluralChanges(entity);

  return gql`
    query {
      entity: ${selectedEntity}(first:${count}, orderBy: ${attributeName}, orderDirection: ${sortType}, where: {id_gt:"${whereId}" }){
        id      
        ${queryData}
        }
    }
    `;
};

//Query for Filter Menu
export const getStringFilterCsvData = (
  queryData: string,
  columnNames: { name: string; type: string; typeName: string }[],
  entity: string,
  filterOption: string,
  attributeName: string,
  userInputValue: string,
  whereId: any
) => {
  const selectedEntity = Utility.makePluralChanges(entity);
  attributeName = attributeName.concat(filterOption);
  let orderByColumnName = 'id';

  if (userInputValue === '') {
    userInputValue = 'null';
  } else {
    userInputValue = '"' + userInputValue + '"';
  }

  orderByColumnName = Utility.getColumnNameForOptimizeQuery(columnNames);

  return gql`
      query {
        entity: ${selectedEntity}(first:100,orderBy:${orderByColumnName}, orderDirection: desc,where: {${attributeName} :${userInputValue}}, where: {id_gt:"${whereId}"}){
          id      
          ${queryData}
          }
      }
      `;
};
