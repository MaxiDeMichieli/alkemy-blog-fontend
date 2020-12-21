import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import qs from 'querystring';
import _ from 'lodash';
import postValidator from '../utils/postValidator';
import http from '../axios/axios';
import FormInputs from './FormInputs';

function PostForm() {
  const debounce = _.debounce((a, b, callback) => callback(a, b), 100);

  const [currentCategory, setCurrentCategory] = useState('');
  const [categories, setCategories] = useState();
  const [redirect, setRedirect] = useState(<></>);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const fetch = await http.get('/posts/categories');
      const contentMap = fetch.data.content.map((category) => {
        const response = { value: category.id, label: category.category };
        return response;
      });
      /* setCurrentCategory(contentMap[1].value); */
      setCategories(contentMap);
      setLoading(false);
    }
    fetchCategories();
  }, []);

  const handleChange = (event) => {
    setCurrentCategory(event.target.value);
  };

  const sendData = async (values, callback) => {
    try {
      const body = values;
      body.category = currentCategory;
      const fetch = await http.post('/posts', qs.stringify(body));
      callback(false);
      if (fetch.data.error == null) {
        setRedirect(<Redirect to="/" />);
      }
    } catch (err) {
      window.location.reload();
    }
  };

  return (
    <>
      {redirect}
      {loading
        && (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        )}
      {categories
        && (
          <Formik
            initialValues={{
              title: '',
              content: '',
              image: '',
              category: '',
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
    </>
  );
}

export default PostForm;
