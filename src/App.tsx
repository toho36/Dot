import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import TableComponent from './Components/TableComponent';



export default function App() {
  return (
    <Container >
      <Box >
        <Typography variant="h4" component="h1" gutterBottom>
          Dotidot
        </Typography>
        <TableComponent />


      </Box>
    </Container>
  );
}
