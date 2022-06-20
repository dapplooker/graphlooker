import React from 'react';
import { Button, Divider, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Constants from '../../utility/constant';
import { TimeFilterMenuProps } from '../../utility/interface/props';
import './time-filter-menu.scss';
import Timestamp from '../../utility/filter-options/timestamp';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { EndpointState, EntityState } from '../../utility/redux/state';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TimeFilterMenu: React.FunctionComponent<TimeFilterMenuProps & RouteComponentProps<any>> = ({
  attributeName,
  location,
}) => {
  const parsed = queryString.parse(location.search);
  const theme = String(parsed.th);
  let listOfFilters = String(parsed.filterObj);

  let selectedEntity: string;
  const endpoint = useSelector((state: EndpointState) => state.graphEndpoint.endpoint);
  selectedEntity = useSelector((state: EntityState) => state.selectedEntity.entity);

  const label = Constants.LABELS.commonLables;

  const timestampFilter = Constants.TIMESTAMP_MENU.timestampFilter;
  const timeFilter = Constants.TIMESTAMP_MENU.timeFilter;
  const currentFilter = Constants.TIMESTAMP_MENU.currentFilter;
  const timeFilterMenu = Constants.FILTERLABELS.timestampFilters;

  const [selectMenu, setSelectMenu] = React.useState(timeFilterMenu.PREVIOUS);
  const [timeMenu, setTimeMenu] = React.useState(timeFilterMenu.DAYS);
  const [currentMenu, setCurrentMenu] = React.useState(timeFilterMenu.DAY);
  const [inputValues, setInputValues] = React.useState(30);
  const [calendarDate, setCalendarDate] = React.useState(new Date());

  const handleChange = (event: SelectChangeEvent) => {
    setSelectMenu(event.target.value as string);
  };
  const handleChangeTime = (event: SelectChangeEvent) => {
    setTimeMenu(event.target.value as string);
  };
  const handleChangeCurrent = (event: SelectChangeEvent) => {
    setCurrentMenu(event.target.value as string);
  };

  const renderSelectMenu = (
    filteringArray: any[],
    menu: any,
    handleChange: ((event: SelectChangeEvent<any>, child: React.ReactNode) => void) | undefined
  ) => {
    return (
      <>
        <Select
          value={menu}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'timestamp filter units' }}
          className="second-select-menu"
        >
          {filteringArray.map((item, i) => (
            <MenuItem value={item.menuItem} key={i}>
              {item.menuItem}
            </MenuItem>
          ))}
        </Select>
      </>
    );
  };

  const renderUpdateButtonFunctions = () => {
    switch (selectMenu) {
      case timeFilterMenu.PREVIOUS:
        Timestamp.perviousFilter(
          inputValues,
          timeMenu,
          endpoint,
          selectedEntity,
          theme,
          attributeName,
          listOfFilters
        );
        break;
      case timeFilterMenu.CURRENT:
        Timestamp.currentFilter(
          currentMenu,
          endpoint,
          selectedEntity,
          theme,
          attributeName,
          listOfFilters
        );
        break;
      case timeFilterMenu.BEFORE:
        Timestamp.beforeFilter(
          calendarDate,
          endpoint,
          selectedEntity,
          theme,
          attributeName,
          listOfFilters
        );
        break;
      case timeFilterMenu.AFTER:
        Timestamp.afterFilter(
          calendarDate,
          endpoint,
          selectedEntity,
          theme,
          attributeName,
          listOfFilters
        );
        break;
      case timeFilterMenu.ON:
        Timestamp.onFilter(
          calendarDate,
          endpoint,
          selectedEntity,
          theme,
          attributeName,
          listOfFilters
        );
        break;
      case timeFilterMenu.IS_EMPTY:
        Timestamp.isEmptyNotEmptyFilter(
          label.UNDERSCORE_IS,
          endpoint,
          selectedEntity,
          theme,
          attributeName,
          listOfFilters
        );
        break;
      case timeFilterMenu.NOT_EMPTY:
        Timestamp.isEmptyNotEmptyFilter(
          label.UNDERSCORE_IS,
          endpoint,
          selectedEntity,
          theme,
          attributeName,
          listOfFilters
        );
        break;
      case timeFilterMenu.BETWEEN:
        Timestamp.betweenFilter(
          calendarDate,
          endpoint,
          selectedEntity,
          theme,
          attributeName,
          listOfFilters
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <MenuItem
        className={
          selectMenu === timeFilterMenu.PREVIOUS || selectMenu === timeFilterMenu.CURRENT
            ? label.EMPTY
            : 'calendar-menu'
        }
      >
        <Select
          value={selectMenu}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'timestamp filters' }}
          className="first-select-menu"
        >
          {timestampFilter.map((item, i) => (
            <MenuItem value={item.menuItem} key={i}>
              {item.menuItem}
            </MenuItem>
          ))}
        </Select>

        {selectMenu === timeFilterMenu.PREVIOUS ? (
          <>
            <input
              type="number"
              className="time-inputfield"
              value={inputValues}
              onChange={(e) => setInputValues(Number(e.target.value))}
            />
            {renderSelectMenu(timeFilter, timeMenu, handleChangeTime)}
          </>
        ) : null}

        {selectMenu === timeFilterMenu.CURRENT
          ? renderSelectMenu(currentFilter, currentMenu, handleChangeCurrent)
          : null}
        {selectMenu === timeFilterMenu.BEFORE ||
        selectMenu === timeFilterMenu.AFTER ||
        selectMenu === timeFilterMenu.ON ? (
          <>
            <div className="calendar">
              <Calendar onChange={setCalendarDate} value={calendarDate} />
            </div>
          </>
        ) : null}

        {selectMenu === timeFilterMenu.BETWEEN ? (
          <>
            <div className="calendar">
              <Calendar onChange={setCalendarDate} value={calendarDate} selectRange={true} />
            </div>
          </>
        ) : null}
      </MenuItem>

      <Divider sx={{ my: 0.5 }} />

      <MenuItem className="end-menu-item">
        <Button variant="contained" onClick={() => renderUpdateButtonFunctions()}>
          {label.UPDATE_FILTER}
        </Button>
      </MenuItem>
    </>
  );
};

export default withRouter(TimeFilterMenu);
