import { ethers } from 'ethers';
import Constants from './constant';
import pluralizer from 'pluralize';
import humanizeString from 'humanize-string';
import moment from 'moment';
import { Allfilters } from '../utility/interface/props';
const urlLabels = Constants.LABELS.commonUrls;
const dataTypeLabel = Constants.FILTERLABELS.dataTypeLabels;
const entityArray = Constants.FILTERLABELS.checkProperEntityName;
const regex = Constants.REGEX;
const columnLabels = Constants.FILTERLABELS.columnNameLabels;
const timestampColumnNames = Constants.FILTERLABELS.timestampColumnNames;

export default class Utility {
  public static getColumnNameForOptimizeQuery = (columnNames: any) => {
    let columnName = columnLabels.ID;
    for (let index = 0; index < columnNames.length; ++index) {
      const element = columnNames[index].name;
      const datatype = columnNames[index].typeName;
      if (element.includes('date')) {
        columnName = element;
        break;
      } else if (element.includes('timestamp')) {
        columnName = element;
        break;
      } else if (element.includes('createdAt')) {
        columnName = element;
        break;
      } else if (element.includes('updatedAt')) {
        columnName = element;
        break;
      } else if (element.includes('blockNumber')) {
        columnName = element;
        break;
      } else if (element.includes('accrualBlockNumber')) {
        columnName = element;
        break;
      } else if (element.includes('blockTimestamp')) {
        columnName = element;
        break;
      } else if (element.includes('blockTime')) {
        columnName = element;
        break;
      } else if (element.includes('block')) {
        columnName = element;
        break;
      } else if (element.includes('mintedAtTimestamp')) {
        columnName = element;
        break;
      } else if (element.includes('initTimestamp')) {
        columnName = element;
        break;
      } else if (element.includes('dayStartTimestamp')) {
        columnName = element;
        break;
      } else if (element.includes('preparedTimestamp')) {
        columnName = element;
        break;
      } else if (element.includes('hourStartTimestamp')) {
        columnName = element;
        break;
      } else if (datatype === 'Int') {
        columnName = element;
      }
    }
    return columnName;
  };

  public static verifyAddress = (
    row: any,
    columnName: string,
    columnType: string,
    endpoint: string,
    subgraphNetworkName: string,
    theme: string
  ) => {
    let inputValue = row[`${columnName}`];
    let address = ethers.utils.isAddress(inputValue);

    let verifyTxHash = Boolean(regex.TXHASH_REGEX.test(inputValue));

    if (columnType === dataTypeLabel.OBJECT) {
      Utility.checkAttributeIsEntity(inputValue.__typename, inputValue.id, endpoint, theme);
    } else if (columnName === columnLabels.ID) {
      let splitNumber = inputValue.split('-');
      let addressFound = '';
      // eslint-disable-next-line array-callback-return
      splitNumber.map((el: string) => {
        if (ethers.utils.isAddress(el) || Boolean(regex.TXHASH_REGEX.test(el))) {
          addressFound = el;
        }
      });
      if (addressFound !== '') {
        let isOpenSnackbar = Utility.checkAddressValidity(
          columnName,
          addressFound,
          columnType,
          subgraphNetworkName,
          endpoint
        );

        return isOpenSnackbar;
      } else if (verifyTxHash) {
        let openSnackbar = Utility.checkAddressValidity(
          columnName,
          inputValue,
          columnType,
          subgraphNetworkName,
          endpoint
        );
        return openSnackbar;
      }
    } else if (address) {
      let openSnackbar = Utility.checkAddressValidity(
        columnName,
        inputValue,
        columnType,
        subgraphNetworkName,
        endpoint
      );

      return openSnackbar;
    } else if (verifyTxHash) {
      let openSnackbar = Utility.checkAddressValidity(
        columnName,
        inputValue,
        columnType,
        subgraphNetworkName,
        endpoint
      );
      return openSnackbar;
    }
  };
  public static filterData() {
    let ListOfFiltersWithMsg = new Map<string, string>([
      ['_is', 'Is Equals to'],
      ['_not', 'Is Not Equals to'],
      ['_includes', 'includes'],
      ['does_not_contain', 'does not contain'],
      ['starts_with', 'Starts with'],
      ['ends_with', 'Ends with'],
      ['_gt', 'Greater than'],
      ['_lt', 'Less than'],
      ['_gte,_lte', 'Between the values'],
      ['_gte', 'Greater than or equal to'],
      ['_lte', 'Less than or equal to'],
      ['asc', 'Ascending Order'],
      ['desc', 'Descending Order'],
    ]);
    return ListOfFiltersWithMsg;
  }
  public static filterDataOfTime() {
    let mapOfTime = new Map<string, string>([
      ['_is', 'Is Empty '],
      ['_not', 'Is Not Empty'],
      ['_gt', 'From The Date of '],
      ['_lt', 'Before the Date of'],
      ['_gte,_lte', 'From'],
      ['_gte', 'Greater than or equal to'],
      ['_lte', 'Less than or equal to'],
      ['_gte', 'Greater than or equal to'],
      ['_lte', 'Less than or equal to'],
    ]);
    return mapOfTime;
  }
  public static filterDataOfString() {
    let mapForString = new Map<string, string>([
      ['_is', 'Is Empty '],
      ['_not', 'Is Not Empty'],
      ['_includes', 'includes'],
      ['does_not_contain', 'does not contain'],
      ['starts_with', 'Starts with'],
      ['_lt', 'Less than'],
    ]);
    return mapForString;
  }
  // Map For the Address and Transaction URL
  public static getNetworkDetails() {
    let mapOfNetworkNames = new Map<string, any>([
      [
        'MAINNET',
        {
          DISPLAY_VALUE: 'Ethereum',
          transactionBaseurl: 'https://etherscan.io/tx/',
          addressBaseurl: 'https://etherscan.io/address/',
        },
      ],
      [
        'MOONRIVER',
        {
          DISPLAY_VALUE: 'Moonriver',
          transactionBaseurl: 'https://moonriver.moonscan.io/tx/',
          addressBaseurl: 'https://moonriver.moonscan.io/address/',
        },
      ],
      [
        'MOONBEAM',
        {
          DISPLAY_VALUE: 'Moonbeam',
          transactionBaseurl: 'https://moonbeam.moonscan.io/tx/',
          addressBaseurl: 'https://moonbeam.moonscan.io/address/',
        },
      ],
      [
        'CELO',
        {
          DISPLAY_VALUE: 'Celo',
          transactionBaseurl: 'https://celoscan.xyz/tx/',
          addressBaseurl: 'https://celoscan.xyz/address/',
        },
      ],
      [
        'AVALANCHE',
        {
          DISPLAY_VALUE: 'Avalanche',
          transactionBaseurl: 'https://explorer.avax.network/tx/',
          addressBaseurl: 'https://explorer.avax.network/address/',
        },
      ],

      [
        'POLYGON',
        {
          DISPLAY_VALUE: 'Polygon',
          transactionBaseurl: 'https://polygonscan.com/tx/',
          addressBaseurl: 'https://polygonscan.com/address/',
        },
      ],
      [
        'ROPSTEN',
        {
          DISPLAY_VALUE: 'ROPSTEN',
          transactionBaseurl: 'https://ropsten.etherscan.io/tx',
          addressBaseurl: 'https://ropsten.etherscan.io/address/',
        },
      ],
    ]);
    return mapOfNetworkNames;
  }

  public static checkAttributeIsEntity = (
    entity: string,
    id: string,
    endpoint: string,
    theme: any
  ) => {
    const URI = encodeURIComponent(endpoint);
    const selectedEntity = entity.charAt(0).toLowerCase() + entity.slice(1);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${selectedEntity}&th=${theme}&id=${id}`;
  };

  /*
  This method recived all filter and combine them and return a list of Filters in stringify form
  - For same column two filters cannot be applied. The latest one will apply.
  - For each column one filter can be applied.
  - For any column, sorting and any one filter can be applied.
  - Sorting can be only for one column at a time, the latest will apply.
  */
  public static getAllFilters = (
    filterName: string | null,
    columnName: string | null,
    inputName: string | string[] | null,
    listOfFilterInStrigify?: any
  ) => {
    let listOfFilters: Allfilters[] = [];
    let filterObj: Allfilters = {
      filterName: filterName,
      columnName: columnName,
      inputValue: inputName,
    };
    //This is for pagination
    if ((!filterName || !columnName) && listOfFilterInStrigify !== 'undefined') {
      let oldFilters: Allfilters[] = listOfFilterInStrigify && JSON.parse(listOfFilterInStrigify);
      listOfFilters = oldFilters.length ? [...oldFilters] : [];
    } else if (listOfFilterInStrigify !== 'undefined') {
      let oldFilters: Allfilters[] = listOfFilterInStrigify && JSON.parse(listOfFilterInStrigify);
      if (!oldFilters) {
        listOfFilters.push(filterObj);
      } else if (oldFilters && oldFilters.length && filterName === 'sort') {
        let noSortFilterList = oldFilters.filter((val) => val.filterName !== 'sort');
        if (noSortFilterList && noSortFilterList.length) {
          listOfFilters = [...noSortFilterList];
          listOfFilters.push(filterObj);
        } else {
          listOfFilters.push(filterObj);
        }
      } else {
        let isColumnExist = oldFilters.filter(
          (val) => val.columnName === columnName && val.filterName !== 'sort'
        );
        if (isColumnExist && isColumnExist.length) {
          let noSameColumnList = oldFilters.filter(
            (val) => val.columnName !== columnName || val.filterName === 'sort'
          );
          if (noSameColumnList && noSameColumnList.length) {
            listOfFilters = [...noSameColumnList];
            listOfFilters.push(filterObj);
          } else {
            listOfFilters.push(filterObj);
          }
        } else {
          listOfFilters = [...oldFilters];
          listOfFilters.push(filterObj);
        }
      }
    } else {
      if (filterName || columnName) listOfFilters.push(filterObj);
    }

    return JSON.stringify(listOfFilters);
  };

  public static checkAddressValidity = (
    entity: string,
    id: string,
    type: string,
    subgraphNetworkName: string,
    endpoint: string
  ) => {
    const subgraphNetworkNameUrl = Utility.getNetworkDetails().get(subgraphNetworkName);

    let verifyAddress = ethers.utils.isAddress(id);

    if (
      verifyAddress &&
      endpoint.includes(Constants.VALID_ENDPOINT.SUBGRAPH) &&
      subgraphNetworkName !== null
    ) {
      window.open(
        `${subgraphNetworkNameUrl.addressBaseurl}${id}`,
        '_blank' // <- This is what makes it open in a new window.
      );
    } else if (id && id.length === 66 && regex.TXHASH_REGEX.test(id)) {
      window.open(
        // `${urlLabels.TNX_URL}${id}`,
        `${subgraphNetworkNameUrl.transactionBaseurl}${id}`,
        '_blank' // <- This is what makes it open in a new window.
      );
    } else {
      return true;
    }
  };

  public static getTimestampColumns = (columnName: string) => {
    let isColumnExist = false;
    // eslint-disable-next-line array-callback-return

    timestampColumnNames.map((items: string) => {
      if (items === columnName) {
        isColumnExist = true;
      }
    });
    return isColumnExist;
  };

  public static getProperEntity = (entity: string) => {
    let newEntity = entity;
    // eslint-disable-next-line array-callback-return
    entityArray.map((item) => {
      if (item === entity) {
        newEntity = entity.toUpperCase();
      }
    });
    return newEntity;
  };

  public static getIntUptoTwoDecimal = (row: any, inputValue: string) => {
    let convertedInt = parseFloat(row[`${inputValue}`]);
    if (convertedInt % 1 !== 0) {
      return true;
    }
  };

  // Function to make of entities plural
  public static makePluralChanges = (normalStr: string) => {
    let pluralStr = pluralizer(normalStr);
    if (pluralStr === normalStr) {
      return pluralStr + 's';
    } else if (pluralStr[pluralStr.length - 1] === pluralStr[pluralStr.length - 1].toUpperCase()) {
      pluralStr = pluralStr.slice(0, -1) + pluralStr.charAt(pluralStr.length - 1).toLowerCase();
      return pluralStr;
    } else {
      return pluralStr;
    }
  };

  public static linkToAddressAndTxHash = (row: any, columnName: string, columnType: string) => {
    if (columnType === dataTypeLabel.OBJECT) {
      return true;
    } else if (columnName === columnLabels.ID) {
      let splitNumber = row[`${columnName}`].split('-');

      for (let i = 0; i < splitNumber.length; i++) {
        if (!regex.CHECK_NUMBER_REGEX.test(splitNumber[i])) {
          return true;
        }
      }
    } else if (ethers.utils.isAddress(row[`${columnName}`])) {
      return true;
    } else if (
      regex.TXHASH_REGEX.test(row[`${columnName}`]) &&
      row[`${columnName}`].length === 66
    ) {
      return true;
    }
  };

  public static sortedTimeData = (data: object[]) => {
    let sortedByTime: any = data.map((item) => {
      let array = Object.entries(item);

      array.forEach((itm) => {
        if (Utility.getTimestampColumns(itm[0])) {
          itm[1] = moment(new Date(itm[1] * 1000)).format(
            Constants.LABELS.commonLables.TIME_FORMAT
          );
        }
      });
      let sortedObj = Object.fromEntries(array);

      return sortedObj;
    });
    return sortedByTime;
  };
}

export const sortData = (sortedData: object[]) => {
  sortedData = sortedData.map((item: object) => {
    let array = Object.entries(item);

    array.forEach((itm: any) => {
      if (typeof itm[1] === 'object') {
        itm[0] = `${itm[0]}_id`;
        itm[1] = itm[1]?.id;
      }
      itm[0] = humanizeString(itm[0]);
    });

    let sortedObj = Object.fromEntries(array);
    return sortedObj;
  });

  return sortedData;
};

export const customMessages = (message: string | any, endpoint: string) => {
  let customMessage: string = message;

  try {
    if (endpoint) {
      if (message.includes('Subgraph' && 'not found')) {
        return (customMessage = Constants.ERROR_MESSAGES.NOT_FOUND);
      }
      if (message.includes('Failed to fetch')) {
        return (customMessage = Constants.ERROR_MESSAGES.FAILED_TO_FETCH);
      }
      if (message.includes('indexing_error')) {
        return (customMessage = Constants.ERROR_MESSAGES.INDEXING_ERROR);
      }
      if (message.includes('Unexpected token')) {
        return (customMessage = Constants.ERROR_MESSAGES.UNEXPECTED);
      }
    } else {
      return (customMessage = Constants.ERROR_MESSAGES.INVALID);
    }
  } catch (err) {}
  return customMessage;
};
