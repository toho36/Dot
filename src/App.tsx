import * as React from 'react';
import { useQuery, ApolloClient, InMemoryCache, ApolloProvider, createHttpLink,gql  } from '@apollo/client';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableComponent from './Components/TableComponent';
import { setContext } from '@apollo/client/link/context';

interface DataSource {
  name: string;
  archived: boolean;
  createdAt: string;
  icon: string;
  itemsCount: number;
  lastImport: string;
}

const httpLink = createHttpLink({
  uri: 'https://stage.dotidot.io/graphql', // Your GraphQL API endpoint
  headers: {
    authorization: 'ApiToken 84e1694aa795ff75dd69d4233061ebdd',
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const GET_DATA = gql`
  query DataSources {
    collection(
      page: 0,
      limit: 100,
      identifier: "organization"
      organizationId: 19952
    ) {
      dataSources {
        name
        createdAt
      }
    }
  }
`;
function DisplayData() {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Access the data from the GraphQL response
  const dataSource: DataSource[] = data.collection.dataSources;

  return (
    <div>
      {dataSource.map((item, index) => (
        <div key={index}>
          <h3>Data Source Name: {item.name}</h3>
          <p>Created At: {item.createdAt}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dotidot table
          </Typography>
          <DisplayData />
          <TableComponent />
        </Box>
      </Container>
    </ApolloProvider>
  );
}
