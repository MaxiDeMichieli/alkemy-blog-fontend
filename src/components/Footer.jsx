import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  footer: {
    position: 'absolute',
    width: '100%',
    right: 0,
    bottom: 0,
    color: '#636363',
    textAlign: 'center',
    fontSize: '.9rem',
    padding: 2,
    paddingTop: 30,
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      &copy; Máximo De Michieli
    </footer>
  );
}

export default Footer;
