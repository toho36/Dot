import { Typography } from '@mui/material'
import React from 'react'
import TaskOne from '../Components/TaskOne'
function One() {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Task No. 1
      </Typography>
      <Typography variant="h6" component="h1" gutterBottom>

        As a user of Dotidot, I need to see a list of all my data sources in a clear table.
      </Typography>
      <TaskOne />
    </div>
  )
}

export default One