import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Divider, Card, Box,
} from '@material-ui/core';
import EditPostForm from '../components/EditPostForm';

const useStyles = makeStyles(() => ({
  div: {
    marginTop: 30,
  },
  card: {
    maxWidth: 600,
    padding: 30,
    marginTop: 30,
  },
}));

function EditPost() {
  const classes = useStyles();

  return (
    <div className={classes.div}>
      <Typography
        align="center"
        color="secondary"
        variant="h4"
        component="h1"
      >
        Edit this post
      </Typography>
      <Divider />
      <Box display="flex" justifyContent="center">
        <Card className={classes.card}>
          <EditPostForm />
        </Card>
      </Box>
    </div>
  );
}

export default EditPost;
