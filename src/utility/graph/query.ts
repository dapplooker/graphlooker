import { gql } from '@apollo/client';
import Constants from '../constant';
import { ColumnProps } from '../interface/props';
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
export const getGraphDataForID = (columnNames: ColumnProps[], entity: string, filterID: string) => {
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
/*
function to get Query based on last ID and applied filter.
columnNames = name of perticular column in table .
entity = selected entity.
filterOption = applied filter ex: is, isNot
attributeName = attribute name or column name.
userInputValue = user input for specific filter
skip = number of records to skip
sortType = sorting type : asc or desc
count = required number of records
whereId = ID from where we need data
errorMsg = specific error msg
*/
export const getStringFilterGraphData = (
  columnNames: ColumnProps[],
  entity: string,
  filterOption: string,
  attributeName: string,
  userInputValue: any,
  skip: number,
  sortType: string,
  count: number,
  whereId: string,
  errorMsg: string
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
      (element.type === label.LIST ||
        element.type === label.OBJECT ||
        element.type === label.NON_NULL) &&
      !errorMsg
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
/*
function to get Query based on last ID and skip.
columnNames = name of perticular column in table .
entity = selected entity.
attributeName = attribute name or column name.
skip = number of records to skip
count = required number of records
whereId = ID from where we need data
errorMsg = specific error msg
*/
export const getDataQuery = (
  columnNames: ColumnProps[],
  entity: any,
  count: number,
  skip: number,
  globalQuery: string,
  whereId: any,
  errorMsg: string
) => {
  const selectedEntity = Utility.makePluralChanges(entity);
  let orderByColumnName = 'id';
  orderByColumnName = Utility.getColumnNameForOptimizeQuery(columnNames);
  let queryData = ` `;
  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index];
    if (element.name === commonLables.ID) {
      continue;
    }
    if (
      (element.type === label.LIST ||
        element.type === label.OBJECT ||
        element.type === label.NON_NULL) &&
      !errorMsg
    ) {
      queryData = queryData + `${element.name} { ${commonLables.ID} } `;
    } else if (element.type !== label.OBJECT) {
      queryData = queryData + `${element.name} `;
    }
  }
  return gql`
    query {
      entity: ${selectedEntity}(first:${count}, skip:${skip}, orderBy: ${orderByColumnName}, orderDirection: desc, where: {id_gt:"${whereId}" } ){
        id      
        ${queryData}
        }
    }
    `;
};
/*
function to get Query based on last ID and sort type : asc, desc.
columnNames = name of perticular column in table .
entity = selected entity.
sortType = sorting type : asc or desc
attributeName = attribute name or column name.
skip = number of records to skip
count = required number of records
whereId = ID from where we need data
errorMsg = specific error msg
*/
export const getSortedDataQuery = (
  columnNames: ColumnProps[],
  entity: string,
  sortType: string,
  attributeName: string,
  skip: number,
  count: number,
  whereId: string,
  errorMsg: string
) => {
  const selectedEntity = Utility.makePluralChanges(entity);
  let queryData = ` `;
  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index];
    if (element.name === commonLables.ID) {
      continue;
    }
    if (
      (element.type === label.LIST ||
        element.type === label.OBJECT ||
        element.type === label.NON_NULL) &&
      !errorMsg
    ) {
      //element.name = column name
      queryData = queryData + `${element.name} { ${commonLables.ID} } `;
    } else {
      queryData = queryData + `${element.name} `;
    }
  }
  return gql`
    query {
      entity: ${selectedEntity}(first:${count}, skip:${skip}, orderBy: ${attributeName}, orderDirection: ${sortType}, where: {id_gt:"${whereId}" }){
        id
        ${queryData}
      }
    }
    `;
};
