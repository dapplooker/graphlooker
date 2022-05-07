import React, { useState, useEffect } from 'react';
import { Chip } from '@mui/material';
import moment from 'moment';
import Constants from '../../utility/constant';
import Utility from '../../utility/utility';
import { UserProps } from '../../utility/interface/props';
// Map for Fetching the values when provided string as a key.
// var arrOfTime = Constants.FILTERLABELS.timestampColumnNames;
var listOfFilters = new Map(Utility.filterData());
var listOfFiltersTime = new Map(Utility.filterDataOfTime());
const FilterData: React.FunctionComponent<UserProps> = ({ props }): JSX.Element => {
  const [time, settime] = useState('');
  let isTimeStampColumn = Constants.FILTERLABELS.timestampColumnNames.filter(
    (timestampColumn) => timestampColumn === props.c
  );
  function checkForBetweenAndOr() {
    return props.i !== undefined && props.i.length === Constants.LENGTH_OF_STRING.VALUE
      ? `${time}`
      : '';
  }
  function checkForEmpty() {
    // Function to check whether {props.f=_is} belongs to Empty Or Equals to.
    return props.i === '' ? Utility.filterDataOfString().get(props.f) : listOfFilters.get(props.f);
  }
  useEffect(() => {
    //In case,when {prop.i} has timestamp.
    props.i !== undefined && props.i.length === Constants.LENGTH_OF_STRING.VALUE
      ? settime(
        `${moment.unix(props.i.substring(0, 10)).format('LLL')} and ${moment
          .unix(props.i.substring(11, 21))
          .format('LLL')}`
      )
      : settime(moment.unix(props.i).format('LLL'));
  }, [props.i]);
  return (
    <>
      {!props.f || props.s !== undefined ? null : (
        // The data which is fetched by the map is being displayed.Here,props is the object.
        // props.i=value entered by the user.
        // props.f=name of the data.
        // props.c=Int Or Alphamuneric Or timestamps specifications
        // props.s=Ascending Or Descending Order
        <Chip
          label={
            isTimeStampColumn.length
              ? `${listOfFiltersTime.get(props.f)}
               ${props.i !== undefined &&
                props.i !== 'null' &&
                props.i.length < Constants.LENGTH_OF_STRING.VALUE
                ? time
                : ''
              }
               ${checkForBetweenAndOr()}`
              : `${props.c} ${checkForEmpty()} ${props.i} `
          }
          color="info"
          size="small"
        />
      )}
      {!props.s ? null : <Chip label={`${listOfFilters.get(props.s)}`} color="info" size="small" />}
    </>
  );
};
export default FilterData;
