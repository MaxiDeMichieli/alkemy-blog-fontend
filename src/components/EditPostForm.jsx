import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Card } from '@material-ui/core';
import { Formik } from 'formik';
import { Redirect, useParams } from 'react-router-dom';
import qs from 'querystring';
import _ from 'lodash';
import postValidator from '../utils/postValidator';
import http from '../axios/axios';
import FormInputs from './FormInputs';
import CustomError from '../pages/CustomError';

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: 600,
    padding: 30,
    marginTop: 30,
  },
}));

function EditPostForm() {
  const classes = useStyles();

  const { id } = useParams();
  const debounce = _.debounce((a, b, callback) => callback(a, b), 100);

  const [currentCategory, setCurrentCategory] = useState();
  const [categories, setCategories] = useState();
  const [redirect, setRedirect] = useState(<></>);
  const [post, setPost] = useState();
  const [data, setData] = useState(true);
  const [loading, setLoading] = useState(true);
  const serverError = () => setRedirect(<Redirect to="/server-error" />);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetch = await http.get('/posts/categories');
        const contentMap = fetch.data.map((category) => {
          const response = { value: category.id, label: category.category };
          return response;
        });
        setCategories(contentMap);
      } catch (err) {
        if (err.response.status === 404) {
          setCategories([
            { value: 1, label: 'deporte' },
            { value: 2, label: 'tecnología' },
          ]);
          setLoading(false);
        } else {
          serverError();
        }
      }
    }
    async function fetchData() {
      try {
        const fetch = await http.get(`/posts/${id}`);
        setPost(fetch.data);
        if (fetch.data.categori) {
          setCurrentCategory(fetch.data.category.id);
        } else {
          setCurrentCategory(1);
        }
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
    fetchCategories();
    fetchData();
  }, []);

  const handleChange = (event) => {
    setCurrentCategory(event.target.value);
  };

  const sendData = async (values, callback) => {
    try {
      const body = values;
      body.category = currentCategory;
      const fetch = await http.patch(`/posts/${id}`, qs.stringify(body));
      callback(false);
      if (fetch.data.error == null) {
        setRedirect(<Redirect to="/" />);
      }
    } catch (err) {
      serverError();
    }
  };

  return (
    <>
      {!data
        && (
          <CustomError title="Error" message="We can't find a post with that id" />
        )}
      <Box display="flex" justifyContent="center">
        <Card className={classes.card}>
          {redirect}
          {loading
            && (
              <Box display="flex" justifyContent="center" mt={6}>
                <CircularProgress />
              </Box>
            )}
          {post && categories && currentCategory
            && (
              <Formik
                initialValues={{
                  title: post.title || '',
                  body: post.body || '',
                  image: post.image || '',
                  category: currentCategory || '',
                }}
                validate={(values) => postValidator(values, currentCategory)}
                onSubmit={(values, { setSubmitting }) => {
                  debounce(values, setSubmitting, sendData);
                  setSubmitting(true);
                }}
              >
                {({ submitForm, isSubmitting }) => (
                  <FormInputs
                    currentCategory={() => currentCategory}
                    handleChange={handleChange}
                    categories={() => categories}
                    isSubmitting={isSubmitting}
                    submitForm={submitForm}
                  />
                )}
              </Formik>
            )}
        </Card>
      </Box>
    </>
  );
}

export default EditPostForm;
