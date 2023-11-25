import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useQuery, gql } from '@apollo/client';
import TableComponent from './Components/TableComponent';

interface Location {
  id: number; // or number, depending on the actual type of the 'id' property
  name: string;
  description: string;
  photo: string;
}
const GET_DATA = gql`
query ExampleQuery {
  company {
    ceo
  }
  roadster {
    apoapsis_au
  }
}
  
`;

function DisplayData() {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3>Company CEO: {data.company.ceo}</h3>
      <h3>Roadster Apoapsis: {data.roadster.apoapsis_au}</h3>
    </div>
  );
}

export default function App() {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dotidot table
        </Typography>
        <DisplayData />
        <TableComponent/>
      </Box>
    </Container>
  );
}
