import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Box, CircularProgress } from '@material-ui/core';
import { useParams, Redirect } from 'react-router-dom';
import moment from 'moment';
import PostDetail from '../components/PostDetail';
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
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(<></>);
  const serverError = () => setRedirect(<Redirect to="/server-error" />);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetch = await http.get(`/posts/${id}`);
        setData(fetch.data);
        setLoading(false);
      } catch (err) {
        serverError();
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
      {data
        && (
          <Box display="flex" justifyContent="center">
            <Card className={classes.card}>
              <PostDetail
                title={data.title}
                date={data.creationDate ? moment(new Date(data.creationDate)).format('DD-MM-YYYY') : ''}
                content={data.body}
                image={data.image || ''}
                category={data.category ? data.category.name : ''}
              />
            </Card>
          </Box>
        )}
    </div>
  );
}

export default PostDetails;
