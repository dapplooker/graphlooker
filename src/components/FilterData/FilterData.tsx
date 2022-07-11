import React from 'react';
import { Chip, Stack } from '@mui/material';
import moment from 'moment';
import { Allfilters, UserProps } from '../../utility/interface/props';
import Constants from '../../utility/constant';

var listOfFilters: Allfilters[] = [];

const FilterData: React.FunctionComponent<UserProps> = ({ props }): JSX.Element => {
  listOfFilters = props && JSON.parse(props);

  const removeFilter = (index: number) => () => {
    //first removed the clicked filter
    listOfFilters.splice(index, 1);
    //logic of triming the url
    let url = window.location.href;
    let indexOfFilter = url.indexOf('filterObj');
    url = url.substring(0, indexOfFilter - 1);
    //if the removed filter was the last filter left in the array
    if (listOfFilters.length === 0) {
      window.location.href = url;
      return;
    }
    //making url from new filters array
    let remainingFilters = '';
    function stringConverter(item: any) {
      const itemToString = JSON.stringify(item);
      remainingFilters = remainingFilters + ',' + itemToString;
    }
    listOfFilters.forEach(stringConverter);
    url = `${url}&filterObj=[${remainingFilters.substring(1)}]`;
    window.location.href = url;
  };
  function getFilters(filter: Allfilters) {
    switch (filter.filterName) {
      case Constants.LABELS.filterTypes.IS: {
        return filter.inputValue
          ? `${filter.columnName} is ${filter.inputValue}`
          : `${filter.columnName} is Empty`;
      }

      case Constants.LABELS.filterTypes.NOT: {
        return filter.inputValue
          ? `${filter.columnName} is not ${filter.inputValue}`
          : `${filter.columnName} is not Empty`;
      }
      case Constants.LABELS.filterTypes.GREATERTHAN: {
        return Constants.FILTERLABELS.timestampColumnNames.filter(
          (val) => val === filter.columnName
        ).length
          ? `${filter.columnName} Data after ${moment
              .unix(filter.inputValue.substring(0, 10))
              .format('LLL')}`
          : `${filter.columnName} greater than ${filter.inputValue}`;
      }
      case Constants.LABELS.filterTypes.LESSTHAN: {
        return Constants.FILTERLABELS.timestampColumnNames.filter(
          (val) => val === filter.columnName
        ).length
          ? `${filter.columnName} Data before ${moment
              .unix(filter.inputValue.substring(0, 10))
              .format('LLL')}`
          : `${filter.columnName} less than ${filter.inputValue}`;
      }

      case Constants.LABELS.filterTypes.GREATERTHAN_AND_LESSTHAN: {
        return Constants.FILTERLABELS.timestampColumnNames.filter(
          (val) => val === filter.columnName
        ).length
          ? `${filter.columnName} Data between ${moment
              .unix(filter.inputValue[0].substring(0, 10))
              .format('LLL')} to ${moment
              .unix(filter.inputValue[1].substring(0, 10))
              .format('LLL')}`
          : `${filter.columnName} is Between ${filter.inputValue[0]} and ${filter.inputValue[1]}`;
      }
      case Constants.LABELS.filterTypes.SORT: {
        return `${filter.columnName} is ${filter.inputValue.toUpperCase()}`;
      }
    }
    return ``;
  }
  return (
    <>
      <Stack direction="row" spacing={1}>
        {listOfFilters &&
          listOfFilters.map((filter, index) => {
            return <Chip label={getFilters(filter)} color="info" onDelete={removeFilter(index)} />;
          })}
        {/* onDelete={handleDelete(index)} */}
      </Stack>
    </>
  );
};

export default FilterData;
