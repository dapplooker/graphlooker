import React, { useState } from 'react';
import { MenuItem, Select, Divider, TextField, Button, SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';
import { filterNumberIs } from '../../utility/filter-options/number';
import { EndpointState, EntityState } from '../../utility/redux/state';
import { StringFilterMenuProps } from '../../utility/interface/props';
import Constants from '../../utility/constant';
import './number-filter-menu.scss';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';

const NumberFilterMenu: React.FunctionComponent<
  StringFilterMenuProps & RouteComponentProps<any>
> = ({ attributeName, location }) => {
  const parsed = queryString.parse(location.search);
  const theme = parsed.th;
  let listOfFilters = String(parsed.filterObj);
  const label = Constants.LABELS.commonLables;
  const filterOptionLabel = Constants.FILTERLABELS.filterOptionLabels;

  let selectedEntity: string;
  const endpoint = useSelector((state: EndpointState) => state.graphEndpoint.endpoint);
  selectedEntity = useSelector((state: EntityState) => state.selectedEntity.entity);

  const intFilter = Constants.INT_TYPE_MENU.intFilter;
  const [selectMenu, setSelectMenu] = React.useState(filterOptionLabel.EQUAL_TO); //For Number
  const [optionSelected, setOptionSelected] = useState(label.UNDERSCORE_IS);
  const [firstInputNumber, setFirstInputNumber] = useState(label.EMPTY);
  const [secondInputNumber, setSecondInputNumber] = useState(label.EMPTY);
  const handleChange = (event: SelectChangeEvent) => {
    setSelectMenu(event.target.value as string);
  };

  return (
    <>
      <MenuItem>
        <Select
          value={selectMenu}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'number filter' }}
          className="number-select-options"
        >
          {intFilter.map((item, i) => (
            <MenuItem
              value={item.menuItem}
              key={i}
              onClick={() => setOptionSelected(item.menuValue)}
            >
              {item.menuItem}
            </MenuItem>
          ))}
        </Select>
      </MenuItem>
      <MenuItem>
        <Divider sx={{ my: 0.5 }} />
        {selectMenu === filterOptionLabel.BETWEEN ? (
          <>
            <TextField
              label={label.SEARCH_BY_NUMBER}
              className="between-filter-inputfield"
              variant="outlined"
              value={firstInputNumber}
              onChange={(e) => setFirstInputNumber(e.target.value)}
            />
            <h3>{label.AND}</h3>
            <TextField
              label={label.SEARCH_BY_NUMBER}
              className="between-filter-inputfield"
              variant="outlined"
              value={secondInputNumber}
              onChange={(e) => setSecondInputNumber(e.target.value)}
            />
          </>
        ) : selectMenu === filterOptionLabel.IS_EMPTY ||
          selectMenu === filterOptionLabel.NOT_EMPTY ? null : (
          <>
            <TextField
              label={label.SEARCH_BY_NUMBER}
              className="number-textfield"
              variant="outlined"
              value={firstInputNumber}
              onChange={(e) => setFirstInputNumber(e.target.value)}
            />
          </>
        )}
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem>
        <Button
          variant="contained"
          className="update-filter-btn"
          onClick={() =>
            filterNumberIs(
              endpoint,
              selectedEntity,
              attributeName,
              optionSelected,
              firstInputNumber,
              secondInputNumber,
              theme,
              listOfFilters
            )
          }
        >
          {label.UPDATE_FILTER}
        </Button>
      </MenuItem>
    </>
  );
};

export default withRouter(NumberFilterMenu);
