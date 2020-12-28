import React, { useState, useEffect } from 'react';
import { CircularProgress, Box } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import Post from './Post';
import http from '../axios/axios';
import Dialog from './Dialog';

function Posts() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState();
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(<></>);
  const serverError = () => setRedirect(<Redirect to="/server-error" />);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetch = await http.get('/posts');
        setData(fetch.data);
        setLoading(false);
      } catch (err) {
        serverError();
      }
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
    try {
      const fetch = await http.delete(`/posts/${id}`);
      if (fetch.status === 200) {
        const postsFilter = data.filter((post) => post.id !== id);
        setData(postsFilter);
        handleClose();
      }
    } catch (err) {
      serverError();
    }
  };

  return (
    <div>
      {redirect}
      {loading
        && (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        )}
      <Dialog
        open={open}
        handleClose={handleClose}
        handleClick={deletePost}
        id={toDelete}
        title="Estás seguro que quieres eliminar este post?"
        text="Si lo eliminas no podrás recuperarlo"
        primaryBtn="cancelar"
        secondaryBtn="eliminar"
      />
      {data
        && data.map((post) => (
          <div key={post.id}>
            <Post
              handleClick={() => handleClickOpen(post.id)}
              key={post.id}
              title={post.title}
              id={post.id}
              date={post.creationDate ? moment(new Date(post.creationDate)).format('DD-MM-YYYY') : ''}
            />
          </div>
        ))}
    </div>
  );
}

export default Posts;
