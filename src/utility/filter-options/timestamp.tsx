import moment from 'moment';
import Constants from '../constant';
const urlLabels = Constants.LABELS.commonUrls;
export default class Timestamp {
  public static perviousFilter = (
    inputNumber: any,
    unitsOfTime: string,
    endpoint: string,
    selectedEntity: string,
    theme: string,
    columnName: string
  ) => {
    unitsOfTime = String(unitsOfTime.toLowerCase());
    let generatedUnixTime = moment().subtract(inputNumber, unitsOfTime).unix();
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&f=_gt&i=${generatedUnixTime}&c=${columnName}`;
  };
  public static currentFilter = (
    unitsOfTime: any,
    endpoint: string,
    selectedEntity: string,
    theme: string,
    columnName: string
  ) => {
    unitsOfTime = String(unitsOfTime.toLowerCase());
    let generatedUnixTime = moment().startOf(unitsOfTime).unix();
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&f=_gt&i=${generatedUnixTime}&c=${columnName}`;
  };
  public static beforeFilter = (
    date: Date,
    endpoint: string,
    selectedEntity: string,
    theme: string,
    columnName: string
  ) => {
    let generatedUnixTime = moment(date).unix();
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&f=_lt&i=${generatedUnixTime}&c=${columnName}`;
  };
  public static afterFilter = (
    date: Date,
    endpoint: string,
    selectedEntity: string,
    theme: string,
    columnName: string
  ) => {
    let generatedUnixTime = moment(date).endOf('day').unix();
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&f=_gt&i=${generatedUnixTime}&c=${columnName}`;
  };
  public static onFilter = (
    date: Date,
    endpoint: string,
    selectedEntity: string,
    theme: string,
    columnName: string
  ) => {
    let generatedUnixTime: string[] = [];
    let firstUnixTime = moment(date).startOf('day').unix();
    generatedUnixTime.push(String(firstUnixTime));
    let secondUnixTime = moment(date).endOf('day').unix();
    generatedUnixTime.push(String(secondUnixTime));
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&f=_gte,_lte&i=${generatedUnixTime}&c=${columnName}`;
  };
  public static isEmptyNotEmptyFilter = (
    appliedFilter: string,
    endpoint: string,
    selectedEntity: string,
    theme: string,
    columnName: string
  ) => {
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&f=${appliedFilter}&i=null&c=${columnName}`;
  };
  public static betweenFilter = (
    date: any,
    endpoint: string,
    selectedEntity: string,
    theme: string,
    columnName: string
  ) => {
    let generatedUnixTime: string[] = [];
    let firstUnixTime = moment(date[0]).startOf('day').unix();
    generatedUnixTime.push(String(firstUnixTime));
    let secondUnixTime = moment(date[1]).endOf('day').unix();
    generatedUnixTime.push(String(secondUnixTime));
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&f=_gte,_lte&i=${generatedUnixTime}&c=${columnName}`;
  };
}
