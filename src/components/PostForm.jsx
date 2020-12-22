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
  const serverError = () => setRedirect(<Redirect to="/server-error" />);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetch = await http.get('/posts/categories');
        if (fetch.status === 200) {
          const contentMap = fetch.data.map((category) => {
            const response = { value: category.id, label: category.category };
            return response;
          });
          setCategories(contentMap);
        }
        setLoading(false);
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
      if (fetch.status === 201) {
        setRedirect(<Redirect to="/" />);
      }
    } catch (err) {
      serverError();
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
              body: '',
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
