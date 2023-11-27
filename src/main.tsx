import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, gql, useQuery } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import { AppBar, Box, Container, CssBaseline, Grid, Link as MuiLink, Toolbar, Typography } from '@mui/material';

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import App from './App';
import TaskFour from './Pages/Four';
import TaskOne from './Pages/One';
import TaskThree from './Pages/Three';
import TaskTwo from './Pages/Two';
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

        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div">
                To Hoang Viet
              </Typography>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <Box>
                  <MuiLink component={Link} to="/" color="inherit" underline="none" sx={{ margin: '0px 10px ' }}>
                    Home
                  </MuiLink>
                  <MuiLink component={Link} to="/taskone" color="inherit" underline="none" sx={{ margin: '0 10px' }}>
                    Task One
                  </MuiLink>
                  <MuiLink component={Link} to="/tasktwo" color="inherit" underline="none" sx={{ margin: '0 10px' }}>
                    Task Two
                  </MuiLink>
                  <MuiLink component={Link} to="/taskthree" color="inherit" underline="none" sx={{ margin: '0 10px' }}>
                    Task Three
                  </MuiLink>
                  <MuiLink component={Link} to="/taskfour" color="inherit" underline="none" sx={{ margin: '0 10px' }}>
                    Task Four
                  </MuiLink>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          <Container>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
              <Grid item>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/taskone" element={<TaskOne />} />
                  <Route path="/tasktwo" element={<TaskTwo />} />
                  <Route path="/taskthree" element={<TaskThree />} />
                  <Route path="/taskfour" element={<TaskFour />} />
                </Routes>
              </Grid>
            </Grid>
          </Container>
        </Router>

      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode >,
);
