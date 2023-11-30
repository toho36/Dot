import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, gql, useQuery } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme';

const httpLink = createHttpLink({
  uri: 'https://stage.dotidot.io/graphql',
  headers: {
    authorization: 'ApiToken 84e1694aa795ff75dd69d4233061ebdd',
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
