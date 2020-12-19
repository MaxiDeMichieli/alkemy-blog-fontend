import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Button, Container, Box,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import logo from '../images/logo.svg';

const useStyles = makeStyles(() => ({
  logo: {
    flexGrow: 1,
  },
}));

function ButtonAppBar() {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Container maxWidth="md">
        <Toolbar>
          <div className={classes.logo}>
            <Link to="/">
              <img src={logo} alt="logo-alk" />
            </Link>
          </div>
          <Link to="/">
            <Box mr={1}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<HomeIcon />}
              >
                home
              </Button>
            </Box>
          </Link>
          <Link to="/admin">
            <Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SettingsIcon />}
              >
                admin
              </Button>
            </Box>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ButtonAppBar;
