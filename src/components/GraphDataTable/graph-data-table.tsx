import React, { useEffect, useState } from 'react';
import { GraphDataTableProps } from './../../utility/interface/props';
import {
  EndpointState,
  EntityState,
  AttributesState,
  QueryDataState,
} from '../../utility/redux/state';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDataQuery,
  getGraphDataForID,
  getSortedDataQuery,
  getStringFilterGraphData,
} from '../../utility/graph/query';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import queryString from 'query-string';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Tooltip from '@mui/material/Tooltip';
import './graph-data-table.scss';
import { KeyboardArrowDown } from '@mui/icons-material';
import { Alert, Button, Menu, Snackbar, TableHead } from '@mui/material';
import moment from 'moment';
import PrimaryMenu from '../PrimaryMenu/primary-menu';
import Constants from '../../utility/constant';
import humanizeString from 'humanize-string';
import { setDataLoading } from '../../redux/actions/loading-action';
import Utility from '../../utility/utility';
import ErrorMessage from '../ErrorMessage/error-message';
import ExportButton from '../ExportToCSV/ExportButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NoRecords from '../NoRecords/NoRecords';
import FilterData from '../FilterData/FilterData';
const GraphDataTable: React.FunctionComponent<GraphDataTableProps & RouteComponentProps<any>> = ({
  drawerOpen,
  location,
}) => {
  let selectedEntity: string;
  let rows: any[] = [];
  let pageNumber: number = 1;
  let isNextDisable: boolean = false;
  let isPrevDisable: boolean = true;
  const parsed = queryString.parse(location.search);
  const endpoint = useSelector((state: EndpointState) => state.graphEndpoint.endpoint);
  selectedEntity = useSelector((state: EntityState) => state.selectedEntity.entity);
  let listOfattributes = useSelector((state: AttributesState) => state.allAttributes.attributes);
  const theme = parsed.th;
  const dispatch = useDispatch();

  const label = Constants.LABELS.commonLables;
  const urlLabels = Constants.LABELS.commonUrls;
  const dataTypeLabel = Constants.FILTERLABELS.dataTypeLabels;
  const queryDataGlobalState = useSelector((state: QueryDataState) => state.queryState.query);
  const [errorMsg, setErrorMsg] = useState('');
  const getBoardDataAsQuery = (error: string) => {
    if (parsed.id) {
      return getGraphDataForID(listOfattributes, selectedEntity, `${parsed.id}`);
    }
    if (!parsed.f && !parsed.i && parsed.s) {
      const skip = checkForPagination();
      return getSortedDataQuery(
        listOfattributes,
        selectedEntity,
        `${parsed.s}`,
        `${parsed.c}`,
        skip,
        100,
        '',
        error
      );
    }
    if (parsed.c) {
      const skip = checkForPagination();
      return getStringFilterGraphData(
        listOfattributes,
        selectedEntity,
        `${parsed.f}`,
        `${parsed.c}`,
        `${parsed.i}`,
        skip,
        `${parsed.s}`,
        100,
        '',
        error
      );
    }
    if (parsed.p) {
      const paginateNumber: string = `${parsed.p}`;
      pageNumber = parseInt(paginateNumber);
      if (pageNumber > 1) {
        isPrevDisable = false;
      }
      const skip = 100 * (pageNumber - 1);
      return getDataQuery(
        listOfattributes,
        selectedEntity,
        100,
        skip,
        queryDataGlobalState,
        '',
        error
      );
    }
    return getDataQuery(listOfattributes, selectedEntity, 100, 0, queryDataGlobalState, '', error);
  };
  useEffect(() => {
    getBoardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const checkForPagination = () => {
    if (parsed.p) {
      const paginateNumber: string = `${parsed.p}`;
      pageNumber = parseInt(paginateNumber);
    } else {
      pageNumber = 1;
    }
    if (pageNumber > 1) {
      isPrevDisable = false;
    }
    return 100 * (pageNumber - 1);
  };
  const goToNext = () => {
    if (isNextDisable) return;
    const URI = encodeURIComponent(endpoint);
    if (!parsed.f && !parsed.i && parsed.s) {
      return (window.location.href = `${urlLabels.BASE_URL
        }uri=${URI}&e=${selectedEntity}&th=${theme}&s=${parsed.s}&c=${parsed.c}&p=${pageNumber + 1}`);
    }
    if (parsed.c) {
      if (!parsed.s) {
        parsed.s = label.DESC;
      }
      return (window.location.href = `${urlLabels.BASE_URL
        }uri=${URI}&e=${selectedEntity}&th=${theme}&s=${parsed.s}&f=${parsed.f}&i=${parsed.i}&c=${parsed.c
        }&p=${pageNumber + 1}`);
    }
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${selectedEntity}&th=${theme}&p=${pageNumber + 1
      }`;
  };
  const goToPrev = () => {
    if (isPrevDisable) return;
    const URI = encodeURIComponent(endpoint);
    if (!parsed.f && !parsed.i && parsed.s) {
      return (window.location.href = `${urlLabels.BASE_URL
        }uri=${URI}&e=${selectedEntity}&th=${theme}&s=${parsed.s}&c=${parsed.c}&p=${pageNumber - 1}`);
    }
    if (parsed.c) {
      if (!parsed.s) {
        parsed.s = label.DESC;
      }
      return (window.location.href = `${urlLabels.BASE_URL
        }uri=${URI}&e=${selectedEntity}&th=${theme}&s=${parsed.s}&f=${parsed.f}&i=${parsed.i}&c=${parsed.c
        }&p=${pageNumber - 1}`);
    }
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${selectedEntity}&th=${theme}&p=${pageNumber - 1
      }`;
  };
  //Get Table Data
  const [getBoardData, { error, loading, data }] = useLazyQuery(getBoardDataAsQuery(errorMsg));
  useEffect(() => {
    error && setErrorMsg(error?.message);
  }, [error, data]);
  if (loading) {
  }
  if (error) {
    if (errorMsg && !data && !errorMsg.includes(Constants.LABELS.commonLables.NULL_VALUE)) {
      dispatch(setDataLoading(false));
    }
  }
  if (data) {
    let queryData: any[];
    queryData = data['entity'];
    if (queryData) {
      rows = [...queryData];
      if (rows.length < 100) {
        isNextDisable = true;
      }
    }
    dispatch(setDataLoading(false));
  }
  //Open/Close Filter DropDown Menu Functions
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [attribute, setAttribute] = useState(label.EMPTY);
  const [attributeType, setAttributeType] = useState(label.EMPTY);
  const [attributeDataType, setAttributeDataType] = useState(label.EMPTY);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const setAttributeDetails = (
    attributes: string,
    attributeType: string,
    attributeDataType: string
  ) => {
    setAttribute(attributes);
    setAttributeType(attributeType);
    setAttributeDataType(attributeDataType);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  //Snackbar(Toast) Open/Close handle
  const [open, setOpen] = useState(false);
  const handleCloseToast = () => {
    setOpen(false);
  };
  if (errorMsg) {
    listOfattributes = listOfattributes.filter((item) => item.type !== dataTypeLabel.OBJECT);
  }
  if (listOfattributes.length === 0) {
    dispatch(setDataLoading(false));
  }
  return (
    <>
      <div className='FilterData'>
        <FilterData props={parsed} />
      </div>
      {/* Chip  */}
      <ExportButton rows={rows} />
      <div className="all-graph-data">
        <div className={`table-conatiner ${drawerOpen ? 'drawer-open-table-length' : label.EMPTY}`}>
          <Table stickyHeader aria-label="sticky table" className="data-table">
            <TableHead>
              <TableRow>
                {data &&
                  listOfattributes.map((item, i) => (
                    <TableCell
                      key={i}
                      className={`${theme === label.LIGHT_THEME_LABEL
                          ? 'table-head-cell-light'
                          : 'table-head-cell'
                        }`}
                    >
                      <div className="attribute-columns-cell">
                        <Button
                          onClick={handleOpenMenu}
                          onMouseOver={() =>
                            setAttributeDetails(item.name, item.type, item.typeName)
                          }
                          aria-controls="menu"
                          endIcon={<KeyboardArrowDown />}
                          variant="outlined"
                          className="table-column-btn"
                        >
                          {item.type === dataTypeLabel.OBJECT
                            ? `${humanizeString(item.name)} Id`
                            : `${humanizeString(item.name)}`}
                          {item.type === dataTypeLabel.OBJECT ? (
                            <Tooltip
                              title={
                                <>
                                  {label.ENTITY_REFERENCE} <b> {item.name.toUpperCase()}</b>
                                </>
                              }
                            >
                              <InfoOutlinedIcon />
                            </Tooltip>
                          ) : null}
                        </Button>
                      </div>
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length !== 0
                ? rows.map((row, i) => (
                  <TableRow className="tabledata-row" key={i}>
                    {listOfattributes.map((item, key) => (
                      <TableCell
                        key={key}
                        className={`${Utility.linkToAddressAndTxHash(row, item.name, item.type)
                            ? 'tablerow-data-css address-data-css'
                            : 'tablerow-data-css'
                          }`}
                        onClick={() => {
                          let openCloseSnackbar = Utility.verifyAddress(
                            row,
                            item.name,
                            item.type,
                            endpoint,
                            String(theme)
                          );
                          setOpen(Boolean(openCloseSnackbar));
                        }}
                      >{`${item.type === dataTypeLabel.LIST ||
                          item.type === dataTypeLabel.OBJECT ||
                          item.type === dataTypeLabel.NON_NULL
                          ? row[`${item.name}`] !== undefined
                            ? row[`${item.name}`].id
                            : label.EMPTY
                          : Utility.getTimestampColumns(item.name)
                            ? row[`${item.name}`] !== undefined
                              ? moment(new Date(row[`${item.name}`] * 1000)).format(
                                label.TIME_FORMAT
                              )
                              : label.EMPTY
                            : item.typeName === dataTypeLabel.BIGINT ||
                              item.typeName === dataTypeLabel.BIGDECIMAL ||
                              item.typeName === dataTypeLabel.INT
                              ? Utility.getIntUptoTwoDecimal(row, item.name)
                                ? parseInt(row[`${item.name}`]).toFixed(2)
                                : row[`${item.name}`] !== undefined
                                  ? row[`${item.name}`]
                                  : label.EMPTY
                              : row[`${item.name}`] !== undefined
                                ? row[`${item.name}`]
                                : label.EMPTY
                        }`}</TableCell>
                    ))}
                  </TableRow>
                ))
                : label.EMPTY}
            </TableBody>
          </Table>
          {errorMsg && !data ? (
            <ErrorMessage type="icon" errorMessage={errorMsg} endpoint={endpoint}></ErrorMessage>
          ) : (
            label.EMPTY
          )}
          {rows.length > 0 || errorMsg || parsed.v ? (
            label.EMPTY
          ) : (
            <NoRecords listOfattributes={listOfattributes} />
          )}
          <Menu id="menu" onClose={handleCloseMenu} anchorEl={anchorEl} open={Boolean(anchorEl)}>
            <PrimaryMenu
              attributeName={attribute}
              attributeType={attributeType}
              attributeDataType={attributeDataType}
            />
          </Menu>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={3000}
            onClose={handleCloseToast}
          >
            <Alert onClose={handleCloseToast} severity="error" sx={{ width: '100%' }}>
              {label.INVALID}
            </Alert>
          </Snackbar>
        </div>
        {parsed.id === undefined && rows.length > 0 ? (
          <div
            className={`next-previous-option ${drawerOpen ? 'drawer-open-next-previous-option' : label.EMPTY
              }`}
          >
            <Tooltip title="Previous">
              <NavigateBeforeIcon
                onClick={goToPrev}
                className={`previous-icon ${isPrevDisable ? 'disable-navigation' : label.EMPTY}`}
              ></NavigateBeforeIcon>
            </Tooltip>
            <span>{pageNumber}</span>
            <Tooltip title="Next">
              <NavigateNextIcon
                onClick={goToNext}
                className={`${isNextDisable ? 'disable-navigation' : label.EMPTY}`}
              ></NavigateNextIcon>
            </Tooltip>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default withRouter(GraphDataTable);
