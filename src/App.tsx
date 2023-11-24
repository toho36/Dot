import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useQuery, gql } from '@apollo/client';

interface Location {
  id: number; // or number, depending on the actual type of the 'id' property
  name: string;
  description: string;
  photo: string;
}
const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  
  return  data.locations.map((location: Location) => (
    <div key={location.id}>
      <h3>{location.name}</h3>
      <img width="400" height="250" alt="location-reference" src={`${location.photo}`} />
      <br />
      <b>About this location:</b>
      <p>{location.description}</p>
      <br />
    </div>
  ));
}

export default function App() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dotidot table
        </Typography>
        <DisplayLocations />
      </Box>
    </Container>
  );
}
