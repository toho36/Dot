import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { createProxyMiddleware } from 'http-proxy-middleware';
// const proxy = createProxyMiddleware('/graphql', {
//   target: 'https://stage.dotidot.io',
//   changeOrigin: true,
// });

const client = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/',

  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
    query ExampleQuery {
      company {
        ceo
      }
      roadster {
        apoapsis_au
      }
    }
      
    `,
  })
  .then((result) => console.log(result));

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
