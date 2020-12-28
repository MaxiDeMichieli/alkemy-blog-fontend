import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

function MyDialog({
  open, handleClose, handleClick, id, title, text, primaryBtn, secondaryBtn,
}) {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {primaryBtn}
        </Button>
        <Button onClick={() => handleClick(id)} color="primary">
          {secondaryBtn}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

MyDialog.propTypes = {
  open: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  primaryBtn: PropTypes.string.isRequired,
  secondaryBtn: PropTypes.string.isRequired,
};

export default MyDialog;
