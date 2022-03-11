export default class Constants {
  public static URL = {
    DEV: {},
    PROD: {},
  };

  public static FILTERLABELS = {
    dataTypeLabels: {
      LIST: 'LIST',
      OBJECT: 'OBJECT',
      NON_NULL: 'NON_NULL',
      STRING: 'String',
      INT: 'Int',
      BIGINT: 'BigInt',
      BIGDECIMAL: 'BigDecimal',
    },
    columnNameLabels: {
      CREATED_AT_TIMESTAMP: 'createdAtTimestamp',
      UPDATED_AT_TIMESTAMP: 'updatedAtTimestamp',
      TIMESTAMP: 'timestamp',
    },
    filterOptionLabels: {
      IS_EMPTY: 'Is Empty',
      NOT_EMPTY: 'Not Empty',
      EQUAL_TO: 'Equal to',
      PREVIOUS: 'Previous',
      DAYS: 'Days',
    },
  };

  public static LABELS = {
    commonLables: {
      subgraph_visualizer: 'Subgraph Visualizer',
      FILTER_BY_THIS_COL: 'Filter by this column',
      ASC: 'asc',
      DESC: 'desc',
      IS: 'Is',
      EMPTY: '',
      UPDATE_BY_FILTER: 'Update by Filter',
      SEARCH_BY_USER: 'Search by User',
      SEARCH_BY_NUMBER: 'Search by Number',
      LOADING: 'Loading...',
      NO_RECORD: 'No Records Found',
      EXPLORE: 'Explore',
    },
  };

  public static TIMESTAMP_MENU = {
    timestampFilter: [
      { menuItem: 'Previous' },
      { menuItem: 'Next' },
      { menuItem: 'Current' },
      { menuItem: 'Before' },
      { menuItem: 'After' },
      { menuItem: 'On' },
      { menuItem: 'Between' },
      { menuItem: 'Is Empty' },
      { menuItem: 'Not Empty' },
    ],
    timeFilter: [
      { menuItem: 'Minutes' },
      { menuItem: 'Hours' },
      { menuItem: 'Days' },
      { menuItem: 'Weeks' },
      { menuItem: 'Months' },
      { menuItem: 'Ouarters' },
      { menuItem: 'Years' },
    ],
  };

  public static INT_TYPE_MENU = {
    intFilter: [
      { menuItem: 'Equal to', menuValue: ' ' },
      { menuItem: 'Not equal to', menuValue: '_not' },
      { menuItem: 'Greater than', menuValue: '_gt' },
      { menuItem: 'Less than', menuValue: '_lt' },
      { menuItem: 'Between', menuValue: '_btw' },
      { menuItem: 'Greater than or equal to', menuValue: '_gte' },
      { menuItem: 'Less than or equal to', menuValue: '_lte' },
      { menuItem: 'Is Empty', menuValue: ' ' },
      { menuItem: 'Not Empty', menuValue: '_not' },
    ],
  };
  public static STRING_TYPE_MENU = {
    stringFilter: [
      { menuItem: 'Is', menuValue: ' ' },
      { menuItem: 'Is not', menuValue: '_not' },
      { menuItem: 'Contains', menuValue: '_contains' },
      { menuItem: 'Does not contain', menuValue: 'does_not_contain' },
      { menuItem: 'Starts with', menuValue: 'starts_with' },
      { menuItem: 'Ends with', menuValue: 'ends_with' },
      { menuItem: 'Is Empty', menuValue: ' ' },
      { menuItem: 'Not Empty', menuValue: '_not' },
    ],
  };
}
