import React, { useState, useEffect } from 'react';
import { CircularProgress, Box } from '@material-ui/core';
import moment from 'moment';
import Post from './Post';
import http from '../axios/axios';

function Posts() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const fetch = await http.get('/posts');
      setData(fetch.data.content);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      {loading
        && (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        )}
      {data
        && data.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            date={moment(new Date(post.creationDate)).format('DD-MM-YYYY')}
          />
        ))}
    </div>
  );
}

export default Posts;
