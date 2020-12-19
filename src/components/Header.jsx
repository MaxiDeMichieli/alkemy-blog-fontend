import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Button, Container,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import logo from '../images/logo.svg';

const useStyles = makeStyles(() => ({
  logo: {
    flexGrow: 1,
  },
  button: {
    margin: '0 10px',
  },
}));

function ButtonAppBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar>
          <div className={classes.logo}>
            <Link to="/">
              <img src={logo} alt="logo-alk" />
            </Link>
          </div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<HomeIcon />}
          >
            home
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SettingsIcon />}
          >
            admin
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ButtonAppBar;
