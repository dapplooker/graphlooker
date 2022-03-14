export default class Utility {
  public static getColumnNameForOptimizeQuery = (columnNames: any) => {
    let columnName = 'id';
    for (let index = 0; index < columnNames.length; ++index) {
      const element = columnNames[index].name;
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
      } else {
        columnName = 'id';
      }
    }
    return columnName;
  };
}
