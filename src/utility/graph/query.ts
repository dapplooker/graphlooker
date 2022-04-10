import { gql } from '@apollo/client';
import Constants from '../constant';
import Utility from '../utility';

const label = Constants.FILTERLABELS.dataTypeLabels;
const commonLables = Constants.LABELS.commonLables;
const regex = Constants.REGEX;

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

export const getSubgraphNetworkId = gql`
  query {
    _meta {
      deployment
    }
  }
`;

export const getNetworkName = (networkId: any) => {
  return gql`
    query {
      indexingStatuses(subgraphs: ["${networkId}"]) {
        chains {
          network
        }
      }
    }
  `;
};

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

// export const getGraphData = (
//   columnNames: { name: string; type: string; typeName: string }[],
//   entity: string,
//   count: number,
//   skip: number
// ) => {
//   console.log('get graph data');
//   let queryData = ` `;
//   const selectedEntity = Utility.makePluralChanges(entity);
//   let orderByColumnName = commonLables.ID;
//   for (let index = 0; index < columnNames.length; ++index) {
//     const element = columnNames[index];
//     if (element.name === commonLables.ID) {
//       continue;
//     }
//     if (
//       element.type === label.LIST ||
//       element.type === label.OBJECT ||
//       element.type === label.NON_NULL
//     ) {
//       queryData = queryData + `${element.name} { id } `;
//     } else {
//       queryData = queryData + `${element.name} `;
//     }
//   }

//   orderByColumnName = Utility.getColumnNameForOptimizeQuery(columnNames);

//   return gql`
//     query {
//       entity: ${selectedEntity}(first:${count},skip:${skip}, orderBy:${orderByColumnName}, orderDirection: desc){
//         id
//         ${queryData}
//         }
//     }
//     `;
// };

export const getGraphDataForID = (
  columnNames: { name: string; type: string; typeName: string }[],
  entity: string,
  filterID: string
) => {
  let queryData = ` `;
  const selectedEntity = Utility.makePluralChanges(entity);
  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index];
    if (element.name === commonLables.ID) {
      continue;
    }
    if (
      element.type === label.LIST ||
      element.type === label.OBJECT ||
      element.type === label.NON_NULL
    ) {
      queryData = queryData + `${element.name} { ${commonLables.ID} } `;
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

// export const getSortedGraphData = (
//   columnNames: { name: string; type: string; typeName: string }[],
//   entity: string,
//   sortType: string,
//   attributeName: string,
//   skip: number
// ) => {
//   let queryData = ` `;
//   const selectedEntity = Utility.makePluralChanges(entity);
//   for (let index = 0; index < columnNames.length; ++index) {
//     const element = columnNames[index];
//     if (element.name === commonLables.ID) {
//       continue;
//     }
//     if (
//       element.type === label.LIST ||
//       element.type === label.OBJECT ||
//       element.type === label.NON_NULL
//     ) {
//       queryData = queryData + `${element.name} { id } `;
//     } else {
//       queryData = queryData + `${element.name} `;
//     }
//   }
//   return gql`
//       query {
//         entity: ${selectedEntity}(first:100, skip:${skip}, orderBy: ${attributeName}, orderDirection: ${sortType} ){
//           id
//           ${queryData}
//           }
//       }
//       `;
// };

//Query for Filter Menu
export const getStringFilterGraphData = (
  columnNames: { name: string; type: string; typeName: string }[],
  entity: string,
  filterOption: string,
  attributeName: string,
  userInputValue: any,
  skip: number,
  sortType: string,
  count: number,
  whereId: string
) => {
  let queryData = ` `;
  const selectedEntity = Utility.makePluralChanges(entity);
  if (filterOption === commonLables.UNDERSCORE_IS) {
    filterOption = commonLables.EMPTY;
  }
  let columnNameWithFilter = attributeName.concat(filterOption);
  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index];
    if (element.name === commonLables.ID) {
      continue;
    }
    if (
      element.type === label.LIST ||
      element.type === label.OBJECT ||
      element.type === label.NON_NULL
    ) {
      queryData = queryData + `${element.name} { ${commonLables.ID} } `;
    } else {
      queryData = queryData + `${element.name} `;
    }
  }

  if (sortType === commonLables.UNDEFINED) {
    sortType = commonLables.DESC;
  }

  if (userInputValue.includes(',')) {
    let splitInputValues = userInputValue.split(',');
    return gql`
      query {
        entity: ${selectedEntity}(first:${count}, skip:${skip},orderBy:${attributeName}, orderDirection: ${sortType},where: {${attributeName}_gte :${splitInputValues[0]}, ${attributeName}_lte :${splitInputValues[1]}, id_gt:"${whereId}"}){
          id      
          ${queryData}
          }
      }
      `;
  }

  if (userInputValue === commonLables.EMPTY || userInputValue === commonLables.NULL) {
    userInputValue = commonLables.NULL;
  } else if (regex.CHECK_NUMBER_REGEX.test(userInputValue)) {
    userInputValue = Number(userInputValue);
  } else {
    userInputValue = commonLables.DOUBLE_QUOTES + userInputValue + commonLables.DOUBLE_QUOTES;
  }

  return gql`
      query {
        entity: ${selectedEntity}(first:${count}, skip:${skip},orderBy:${attributeName}, orderDirection: ${sortType},where: {${columnNameWithFilter} :${userInputValue}, id_gt:"${whereId}"}){
          id      
          ${queryData}
          }
      }
      `;
};

// Query based on last ID (export to csv)
export const getCsvDataQuery = (
  columnNames: { name: string; type: string; typeName: string }[],
  entity: any,
  count: number,
  skip: number,
  queryData: string,
  whereId: any
) => {
  const selectedEntity = Utility.makePluralChanges(entity);
  let orderByColumnName = 'id';
  orderByColumnName = Utility.getColumnNameForOptimizeQuery(columnNames);

  return gql`
    query {
      entity: ${selectedEntity}(first:${count}, skip:${skip}, orderBy: ${orderByColumnName}, orderDirection: desc, where: {id_gt:"${whereId}" } ){
        id      
        ${queryData}
        }
    }
    `;
};

// Query based on last ID and asc, desc (export to csv)

export const getSortedCsvDataQuery = (
  queryData: string,
  entity: string,
  sortType: string,
  attributeName: string,
  skip: number,
  count: number,
  whereId: string
) => {
  const selectedEntity = Utility.makePluralChanges(entity);

  return gql`
    query {
      entity: ${selectedEntity}(first:${count}, skip:${skip}, orderBy: ${attributeName}, orderDirection: ${sortType}, where: {id_gt:"${whereId}" }){
        id      
        ${queryData}
        }
    }
    `;
};
