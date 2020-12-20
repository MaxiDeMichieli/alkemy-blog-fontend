import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import Posts from '../components/Posts';

const useStyles = makeStyles(() => ({
  div: {
    marginTop: 30,
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.div}>
      <Typography
        align="center"
        color="secondary"
        variant="h4"
        component="h1"
      >
        Posts
      </Typography>
      <Divider />
      <Posts />
    </div>
  );
}

export default Home;
