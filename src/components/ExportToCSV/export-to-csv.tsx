/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import {
  getDataQuery,
  getGraphDataForID,
  getSortedDataQuery,
  getStringFilterGraphData,
} from '../../utility/graph/query';
import { useApolloClient } from '@apollo/client';
import { useSelector } from 'react-redux';
import { AttributesState, EntityState, QueryDataState } from '../../utility/redux/state';
import './export-to-csv.scss';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import Constants from '../../utility/constant';
import DownloadPage from './download-page';
import Utility, { sortData } from '../../utility/utility';
const ExportToCSV: React.FunctionComponent<any> = () => {
  const [entityId, setEntityId] = useState<any[]>([]);
  const [sortedDataState, setSortedDataState] = useState<any[]>([]);
  const [downloadRef, setDownloadRef] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const CSV_LINK_REF = useRef<any>(null);
  const client = useApolloClient();
  const parsed = queryString.parse(window.location.search);
  let rows: any[] = [];
  const regex: any = new RegExp(/^(?:[1-9][0-9]{3}|[1-9][0-9]{2}|[1-9][0-9]|[1-9])$/gm);
  //<--------------- All use Selectors --------------->
  let selectedEntity: string = useSelector((state: EntityState) => state.selectedEntity.entity);
  const queryDataGlobalState = useSelector((state: QueryDataState) => state.queryState.query);
  const listOfattributes = useSelector((state: AttributesState) => state.allAttributes.attributes);
  useEffect(() => {
    if (selectedEntity && queryDataGlobalState && listOfattributes) {
      exportClickHandler();
    }
  }, [selectedEntity, queryDataGlobalState, listOfattributes]);
  //<------- functionality for dynamic query ------->
  function getCsvDataResursively(error: string) {
    if (parsed.id) {
      return getGraphDataForID(listOfattributes, selectedEntity, `${parsed.id}`);
    } else if (!parsed.f && !parsed.i && parsed.s) {
      return getSortedDataQuery(
        listOfattributes,
        selectedEntity,
        `${parsed.s}`,
        `${parsed.c}`,
        0,
        1000,
        entityId.length > 0 ? entityId[entityId.length - 1] : '',
        error
      );
    } else if (parsed.c) {
      return getStringFilterGraphData(
        listOfattributes,
        selectedEntity,
        `${parsed.f}`,
        `${parsed.c}`,
        `${parsed.i}`,
        0,
        `${parsed.s}`,
        1000,
        entityId.length > 0 ? entityId[entityId.length - 1] : '',
        error
      );
    }
    return getDataQuery(
      listOfattributes,
      selectedEntity,
      1000,
      0,
      queryDataGlobalState,
      entityId.length > 0 ? entityId[entityId.length - 1] : '',
      error
    );
  }
  //<--------------- Export Handler --------------->
  const exportClickHandler = async () => {
    let data: any;
    try {
      data = await client.query({
        query: getCsvDataResursively(errorMsg),
      });
    } catch (err) {
      setErrorMsg(err);
    }
    let entityData: any = await data?.data;
    entityData = data?.data['entity'];
    rows = [...entityData];
    let sortedData = rows.map((item) => {
      const { __typename, ...sortedRows } = item;
      return sortedRows;
    });
    sortedData = Utility.sortedTimeData(sortedData);
    sortedData = sortData(sortedData);
    if (sortedData && !sortedData.includes(sortedDataState[sortedDataState.length - 1]?.Id)) {
      setSortedDataState([...sortedDataState, ...sortedData]);
    }
    if (sortedData.length === 0) {
      CSV_LINK_REF?.current?.link.click();
    }
    if (downloadRef === null) {
      setDownloadRef(true);
    }
  };
  useEffect(() => {
    if (errorMsg) {
      setDownloadRef('');
      exportClickHandler();
    }
  }, [errorMsg]);
  useEffect(() => {
    if (
      entityId.length > 0 &&
      sortedDataState.length < Constants.NUMBERS.CSV_Data &&
      regex.test(sortedDataState.length / 1000)
    ) {
      exportClickHandler();
    } else if (downloadRef && !errorMsg) {
      CSV_LINK_REF?.current?.link.click();
      setDownloadRef(false);
    }
  }, [entityId, downloadRef, errorMsg]);
  useEffect(() => {
    if (
      sortedDataState.length > 0 &&
      entityId.includes(sortedDataState[sortedDataState.length - 1].Id) === false
    ) {
      setEntityId([...entityId, sortedDataState[sortedDataState.length - 1].Id]);
    }
    setErrorMsg('');
  }, [sortedDataState]);
  let fileName = `${selectedEntity}_cosmodapp.csv`;
  return (
    <>
      <CSVLink
        data={sortedDataState}
        filename={fileName}
        className="csvlink"
        ref={CSV_LINK_REF}
        asyncOnClick={true}
      />
      <DownloadPage
        sortedDataState={sortedDataState}
        downloadRef={downloadRef}
        errorMsg={errorMsg}
      />
    </>
  );
};
export default withRouter(ExportToCSV);
