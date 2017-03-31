import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import { IntrospectionFragmentMatcher } from 'apollo-client';
import { networkInterface } from './graphql/networkInterface';
import App from './App';
import graphqlSchema from './graphql/schema.json';

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData: graphqlSchema.data,
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}><App /></ApolloProvider>,
  document.getElementById('root'),
);
