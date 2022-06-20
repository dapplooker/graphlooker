import moment from 'moment';
import Constants from '../constant';
import Utility from '../utility';

const urlLabels = Constants.LABELS.commonUrls;

export default class Timestamp {
  public static perviousFilter = (
    inputNumber: any,
    unitsOfTime: string,
    endpoint: string,
    selectedEntity: string,
    theme: string,
    columnName: string,
    listOFFiltersInStringify: string
  ) => {
    unitsOfTime = String(unitsOfTime.toLowerCase());
    let generatedUnixTime = moment().subtract(inputNumber, unitsOfTime).unix();
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    let filtersInStringify = Utility.getAllFilters(
      Constants.LABELS.filterTypes.GREATERTHAN,
      columnName,
      generatedUnixTime.toString(),
      listOFFiltersInStringify
    );
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&filterObj=${filtersInStringify}`;
  };

  public static currentFilter = (
    unitsOfTime: any,
    endpoint: string,
    selectedEntity: string,
    theme: string,
    columnName: string,
    listOFFiltersInStringify: string
  ) => {
    unitsOfTime = String(unitsOfTime.toLowerCase());
    let generatedUnixTime = moment().startOf(unitsOfTime).unix();
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    let filtersInStringify = Utility.getAllFilters(
      Constants.LABELS.filterTypes.GREATERTHAN,
      columnName,
      generatedUnixTime.toString(),
      listOFFiltersInStringify
    );
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&filterObj=${filtersInStringify}`;
  };

  public static beforeFilter = (
    date: Date,
    endpoint: string,
    selectedEntity: string,
    theme: string,
    columnName: string,
    listOFFiltersInStringify: string
  ) => {
    let generatedUnixTime = moment(date).unix();
    let filtersInStringify = Utility.getAllFilters(
      Constants.LABELS.filterTypes.LESSTHAN,
      columnName,
      generatedUnixTime.toString(),
      listOFFiltersInStringify
    );
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&filterObj=${filtersInStringify}`;
  };

  public static afterFilter = (
    date: Date,
    endpoint: string,
    selectedEntity: string,
    theme: string,
    columnName: string,
    listOFFiltersInStringify: string
  ) => {
    let generatedUnixTime = moment(date).endOf('day').unix();
    let filtersInStringify = Utility.getAllFilters(
      Constants.LABELS.filterTypes.GREATERTHAN,
      columnName,
      generatedUnixTime.toString(),
      listOFFiltersInStringify
    );
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&filterObj=${filtersInStringify}`;
  };

  public static onFilter = (
    date: Date,
    endpoint: string,
    selectedEntity: string,
    theme: string,
    columnName: string,
    listOFFiltersInStringify: string
  ) => {
    let generatedUnixTime: string[] = [];
    let firstUnixTime = moment(date).startOf('day').unix();
    generatedUnixTime.push(String(firstUnixTime));
    let secondUnixTime = moment(date).endOf('day').unix();
    generatedUnixTime.push(String(secondUnixTime));
    let filtersInStringify = Utility.getAllFilters(
      Constants.LABELS.filterTypes.GREATERTHAN_AND_LESSTHAN,
      columnName,
      generatedUnixTime,
      listOFFiltersInStringify
    );
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&filterObj=${filtersInStringify}`;
  };

  public static isEmptyNotEmptyFilter = (
    appliedFilter: string,
    endpoint: string,
    selectedEntity: string,
    theme: string,
    columnName: string,
    listOFFiltersInStringify: string
  ) => {
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    let filtersInStringify = Utility.getAllFilters('', columnName, null, listOFFiltersInStringify);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&filterObj=${filtersInStringify}`;
  };

  public static betweenFilter = (
    date: any,
    endpoint: string,
    selectedEntity: string,
    theme: string,
    columnName: string,
    listOFFiltersInStringify: string
  ) => {
    let generatedUnixTime: string[] = [];
    let firstUnixTime = moment(date[0]).startOf('day').unix();
    generatedUnixTime.push(String(firstUnixTime));
    let secondUnixTime = moment(date[1]).endOf('day').unix();
    generatedUnixTime.push(String(secondUnixTime));
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    let filtersInStringify = Utility.getAllFilters(
      Constants.LABELS.filterTypes.GREATERTHAN_AND_LESSTHAN,
      columnName,
      generatedUnixTime,
      listOFFiltersInStringify
    );
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&filterObj=${filtersInStringify}`;
  };
}
