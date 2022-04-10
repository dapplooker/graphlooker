import React from 'react';
import { Route, Switch, RouteComponentProps, withRouter, Redirect } from 'react-router-dom';
import Home from './components/Home/home';
import './App.css';
import { useSelector } from 'react-redux';
import { EndpointState } from './utility/redux/state';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import GraphData from './components/GraphData/graph-data';
import queryString from 'query-string';
import Constants from './utility/constant';

const App: React.FunctionComponent<RouteComponentProps<any>> = ({ location }) => {
  const parsed = queryString.parse(location.search);
  let theme = parsed.th;
  const label = Constants.LABELS.commonUrls;
  const endpoint = useSelector((state: EndpointState) => state.graphEndpoint.endpoint);
  const endpointLink = new HttpLink({
    uri: endpoint,
  });
  const networkEndpointLink = new HttpLink({
    uri: label.CHAIN_NETWORK_URL,
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    // uri: endpoint,
    link: ApolloLink.split(
      (operation) => operation.getContext().clientName === 'chain-network',
      createHttpLink({ uri: label.CHAIN_NETWORK_URL }),
      createHttpLink({ uri: endpoint })
    ),
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
