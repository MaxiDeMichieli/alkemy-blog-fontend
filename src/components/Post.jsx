import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  Box, Card, Typography, IconButton, Button,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
  div: {
    marginTop: 20,
  },
  card: {
    width: '100%',
    maxWidth: 600,
    minHeight: 150,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '64px 20px',
  },
  date: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  btnsContainer: {
    position: 'absolute',
    top: 10,
    right: 0,
  },
  btn: {
    margin: '0 5px',
  },
  btnDetail: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
}));

function Post({
  title, date, id, handleClick,
}) {
  const classes = useStyles();

  return (
    <div className={classes.div}>
      <Box display="flex" justifyContent="center">
        <Card className={classes.card}>
          <Box className={classes.btnsContainer}>
            <Link to={`/edit/${id}`}>
              <IconButton className={classes.btn}>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton className={classes.btn} onClick={handleClick}>
              <DeleteIcon />
            </IconButton>
          </Box>
          <Typography>
            {title}
          </Typography>
          <Link to={`/post/${id}`}>
            <Button variant="contained" color="primary" className={classes.btnDetail}>
              detalles
            </Button>
          </Link>
          <Typography variant="caption" className={classes.date}>
            {date}
          </Typography>
        </Card>
      </Box>
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Post;
