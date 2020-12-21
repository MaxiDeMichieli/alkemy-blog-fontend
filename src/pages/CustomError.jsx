import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Box } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles(() => ({
  box: {
    height: '70vh',
  },
  message: {
    marginTop: 20,
  },
}));

function CustomError({ title, message }) {
  const classes = useStyles();

  return (
    <Box
      className={classes.box}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h2" color="secondary" align="center">
        <ErrorOutlineIcon color="secondary" fontSize="large" />
        {title}
        <Divider />
      </Typography>
      <Typography variant="h5" color="secondary" align="center" className={classes.message}>
        {message}
      </Typography>
    </Box>
  );
}

CustomError.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default CustomError;
