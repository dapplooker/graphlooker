import React from 'react';
import { Route, Switch, RouteComponentProps, withRouter, Redirect } from 'react-router-dom';
import Home from './components/Home/home';
import './App.css';
import { useSelector } from 'react-redux';
import { EndpointState } from './utility/redux/state';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import GraphData from './components/GraphData/graph-data';
import queryString from 'query-string';
const App: React.FunctionComponent<RouteComponentProps<any>> = ({ location }) => {
  const parsed = queryString.parse(location.search);
  let theme = parsed.th;
  const endpoint = useSelector((state: EndpointState) => state.graphEndpoint.endpoint);
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: endpoint,
  });
  return (
    <>
      <ApolloProvider client={client}>
        <div theme-selector={theme} className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={(props: RouteComponentProps<any>) => <Home></Home>}
            ></Route>
            <Route
              exact
              path="/explore"
              render={(props: RouteComponentProps<any>) => <GraphData></GraphData>}
            ></Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </ApolloProvider>
    </>
  );
};
export default withRouter(App);
