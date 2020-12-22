import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import EditPostForm from '../components/EditPostForm';

const useStyles = makeStyles(() => ({
  div: {
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
      <EditPostForm />
    </div>
  );
}

export default EditPost;
