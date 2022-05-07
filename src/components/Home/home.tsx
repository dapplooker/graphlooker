import React, { useEffect, useState } from 'react';
import ErrorMessage from '../ErrorMessage/error-message';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEntities } from '../../utility/graph/query';
import { setGraphEndpoint, setGraphEntity } from '../../redux/actions/endpoint-action';
import { RouteComponentProps, withRouter, Redirect } from 'react-router-dom';
import './home.scss';
import Navbar from '../Navbar/navbar';
import Constants from '../../utility/constant';
import { ThemeState } from '../../utility/redux/state';
const Home: React.FunctionComponent<RouteComponentProps<any>> = ({ history }) => {
  const commonLables = Constants.LABELS.commonLables;
  const [endpoint, setEndpoint] = React.useState(commonLables.EMPTY);
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(true);
  const { data, error, loading } = useQuery(getAllEntities);
  const theme = useSelector((state: ThemeState) => state.themeSelector.theme);
  const dispatch = useDispatch();
  const urlRegex = /^(https:\/\/api\.|http:\/\/api\.)[a-zA-Z0-9\-_$]+\.[a-zA-Z]{2,5}/g;
  let isendpointCorrect = urlRegex.test(endpoint);
  const searchEndpoint = (e: any) => {
    e.preventDefault();
    dispatch(setGraphEndpoint(endpoint));
  };
  useEffect(() => {
    if (error) {
      setErrorMsg(error?.message);
    }
  }, [error]);
  useEffect(() => {
    if (isendpointCorrect) {
      setIsError(false);
    } else {
      setIsError(true);
    }
  }, [endpoint, isendpointCorrect]);
  if (loading) {
  } else {
    if (error) {
    }
    if (data) {
      const firstEntity = data.__schema.queryType.fields[0].name;
      const url = encodeURIComponent(endpoint);
      dispatch(setGraphEntity(firstEntity));
      return <Redirect push to={`explore?uri=${url}&e=${firstEntity}&th=${theme}`} />;
    }
  }
  const onChangeHandler = (e: any) => {
    setEndpoint(e);
    setErrorMsg('');
  };
  return (
    <>
      <div theme-selector={theme}>
        <Navbar></Navbar>
        <div className="container">
          <div className="search-box">
            <form className="search-box-form" onSubmit={searchEndpoint}>
              <input
                className="search-input"
                id="endpoint"
                name="endpoint"
                type="text"
                placeholder="Input Subgraph Endpoint"
                value={endpoint}
                onChange={(e) => onChangeHandler(e.target.value)}
              ></input>
              <button className="search-button" type="submit" disabled={isError}>
                {commonLables.EXPLORE}
              </button>
              <p className="explore-msg">{Constants.LABELS.commonLables.DESC_TITLE}</p>
              {isError && endpoint.length > 0 ? (
                <ErrorMessage
                  type="message"
                  errorMessage={Constants.ERROR_MESSAGES.INVALID}
                  endpoint={endpoint}
                ></ErrorMessage>
              ) : errorMsg ? (
                <ErrorMessage
                  type="message"
                  errorMessage={error?.message}
                  endpoint={endpoint}
                ></ErrorMessage>
              ) : (
                ''
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(Home);
