import { Typography } from '@mui/material'
import React from 'react'
import TaskTwo from '../Components/TaskTwo'

const Two = () => {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Task No. 2
      </Typography>
      <Typography variant="h6" component="h1" gutterBottom>

        As an advanced user of Dotidot, I need to select columns in the table that are important to
        me and hide others.
      </Typography>
      <TaskTwo />
    </div>
  )
}

export default Two