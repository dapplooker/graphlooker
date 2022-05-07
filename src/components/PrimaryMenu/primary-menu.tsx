import { Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import './primary-menu.scss';
import { PrimaryMenuProps } from '../../utility/interface/props';
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import FilterListIcon from '@mui/icons-material/FilterList';
import { EndpointState, EntityState } from '../../utility/redux/state';
import { useSelector } from 'react-redux';
import FilterMenu from '../FilterMenu/filter-menu';
import Constants from '../../utility/constant';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';
const PrimaryMenu: React.FunctionComponent<PrimaryMenuProps & RouteComponentProps<any>> = ({
  attributeName,
  attributeType,
  attributeDataType,
  location,
}) => {
  const parsed = queryString.parse(location.search);
  const theme = parsed.th;
  const label = Constants.LABELS.commonLables;
  const urlLabels = Constants.LABELS.commonUrls;
  const filterLabels = Constants.FILTERLABELS.dataTypeLabels;
  let selectedEntity: string;
  const endpoint = useSelector((state: EndpointState) => state.graphEndpoint.endpoint);
  selectedEntity = useSelector((state: EntityState) => state.selectedEntity.entity);
  //Sort Data (Ascending /Descending) when Attribute Clicked
  const sortDataAscDesc = (sortType: string, columnName: string) => {
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    if (parsed.f && parsed.i) {
      return (window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&s=${sortType}&f=${parsed.f}&i=${parsed.i}&c=${columnName}`);
    } else {
      return (window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&s=${sortType}&c=${columnName}`);
    }
  };
  const [anchorFiterEl, setAnchorFiterEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorFiterEl);
  const handleFilterOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorFiterEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorFiterEl(null);
  };
  const getSortingMenu = () => {
    if (
      attributeType === filterLabels.LIST ||
      attributeType === filterLabels.OBJECT ||
      attributeType === filterLabels.NON_NULL
    ) {
    } else {
      return (
        <>
          <MenuItem>
            <Tooltip title={label.SORT_ASC}>
              <button className="sort-btn">
                <ArrowUpwardTwoToneIcon
                  className="dropdown-arrow"
                  onClick={() => sortDataAscDesc(label.ASC, attributeName)}
                />
              </button>
            </Tooltip>
            <Tooltip title={label.SORT_DESC}>
              <button className="sort-btn">
                <ArrowDownwardTwoToneIcon
                  className="dropdown-arrow"
                  onClick={() => sortDataAscDesc(label.DESC, attributeName)}
                />
              </button>
            </Tooltip>
          </MenuItem>
        </>
      );
    }
  };
  return (
    <>
      {getSortingMenu()}
      <MenuItem>
        <button
          aria-controls="filter_menu"
          onClick={handleFilterOpen}
          className="filter-menu-button"
        >
          <FilterListIcon color="primary" className="filter-list-icon" />
          <span className="filter-by-col-label">{label.FILTER_BY_COL}</span>
        </button>
      </MenuItem>
      <Menu
        id="filter_menu"
        onClose={handleCloseMenu}
        anchorEl={anchorFiterEl}
        open={open}
        className="filter-menu-div"
      >
        <FilterMenu attributeName={attributeName} attributeDataType={attributeDataType} />
      </Menu>
    </>
  );
};
export default withRouter(PrimaryMenu);
