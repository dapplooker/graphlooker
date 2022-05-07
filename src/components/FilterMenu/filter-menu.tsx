import React from 'react';
import { FilterMenuProps } from '../../utility/interface/props';
import StringFilterMenu from '../StringFilterMenu/string-filter-menu';
import NumberFilterMenu from '../NumberFilterMenu/number-filter-menu';
import TimeFilterMenu from '../TimeFilterMenu/time-filter-menu';
import Constants from '../../utility/constant';
import Utility from '../../utility/utility';
const FilterMenu: React.FunctionComponent<FilterMenuProps> = ({
  attributeName,
  attributeDataType,
}) => {
  const dataTypeLabel = Constants.FILTERLABELS.dataTypeLabels;
  const getTimestampMenuItem = () => {
    return (
      <>
        <TimeFilterMenu attributeName={attributeName} />
      </>
    );
  };
  const getNumberOrStringMenu = () => {
    if (
      attributeDataType === dataTypeLabel.BIGINT ||
      attributeDataType === dataTypeLabel.BIGDECIMAL ||
      attributeDataType === dataTypeLabel.INT
    ) {
      return (
        <>
          <NumberFilterMenu attributeName={attributeName} />
        </>
      );
    } else {
      return (
        <>
          <StringFilterMenu attributeName={attributeName} />
        </>
      );
    }
  };
  return (
    <>
      {Utility.getTimestampColumns(attributeName)
        ? getTimestampMenuItem()
        : getNumberOrStringMenu()}
    </>
  );
};
export default FilterMenu;
