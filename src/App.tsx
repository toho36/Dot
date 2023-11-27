import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, gql, useQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import * as React from 'react';



export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dotidot
        </Typography>



      </Box>
    </Container>
  );
}
