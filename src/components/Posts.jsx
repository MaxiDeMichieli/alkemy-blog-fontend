import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import moment from 'moment';
import Post from './Post';
import http from '../axios/axios';

function Posts() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const fetch = await http.get('/posts');
      setData(fetch.data.content);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleClickOpen = (id) => {
    setToDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePost = async (id) => {
    const fetch = await http.delete(`/posts/${id}`);
    if (fetch.data.error === null) {
      const postsFilter = data.filter((post) => post.id !== id);
      setData(postsFilter);
      handleClose();
    }
  };

  return (
    <div>
      {loading
        && (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        )}
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Estás seguro que quieres eliminar este post?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Si lo eliminas no podrás recuperarlo
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancelar
          </Button>
          <Button onClick={() => deletePost(toDelete)} color="primary">
            eliminar
          </Button>
        </DialogActions>
      </Dialog>
      {data
        && data.map((post) => (
          <div key={post.id}>
            <Post
              handleClick={() => handleClickOpen(post.id)}
              key={post.id}
              title={post.title}
              id={post.id}
              date={moment(new Date(post.creationDate)).format('DD-MM-YYYY')}
            />
          </div>
        ))}
    </div>
  );
}

export default Posts;
