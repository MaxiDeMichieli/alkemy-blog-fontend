import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Box, CircularProgress } from '@material-ui/core';
import { useParams, Redirect } from 'react-router-dom';
import moment from 'moment';
import PostDetail from '../components/PostDetail';
import CustomError from './CustomError';
import http from '../axios/axios';

const useStyles = makeStyles(() => ({
  div: {
    marginTop: 30,
  },
  card: {
    width: '100%',
    maxWidth: 800,
    padding: 30,
    marginTop: 30,
    position: 'relative',
  },
}));

function PostDetails() {
  const classes = useStyles();
  const [post, setPost] = useState();
  const [data, setData] = useState(true);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(<></>);
  const serverError = () => setRedirect(<Redirect to="/server-error" />);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetch = await http.get(`/posts/${id}`);
        setPost(fetch.data);
        setLoading(false);
      } catch (err) {
        if (err.response.status === 404) {
          setData(false);
          setLoading(false);
        } else {
          serverError();
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div className={classes.div}>
      {redirect}
      {loading
        && (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        )}
      {!data
      && (
        <CustomError title="Error" message="We can't find a post with that id" />
      )}
      {post
        && (
          <Box display="flex" justifyContent="center">
            <Card className={classes.card}>
              <PostDetail
                title={post.title}
                date={post.creationDate ? moment(new Date(post.creationDate)).format('DD-MM-YYYY') : ''}
                content={post.body}
                image={post.image || ''}
                category={post.category ? post.category.name : ''}
              />
            </Card>
          </Box>
        )}
    </div>
  );
}

export default PostDetails;
