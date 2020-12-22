import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import { Redirect, useParams } from 'react-router-dom';
import qs from 'querystring';
import _ from 'lodash';
import postValidator from '../utils/postValidator';
import http from '../axios/axios';
import FormInputs from './FormInputs';

function EditPostForm() {
  const { id } = useParams();
  const debounce = _.debounce((a, b, callback) => callback(a, b), 100);

  const [currentCategory, setCurrentCategory] = useState();
  const [categories, setCategories] = useState();
  const [redirect, setRedirect] = useState(<></>);
  const [data, setData] = useState();
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
        serverError();
      }
    }
    async function fetchData() {
      try {
        const fetch = await http.get(`/posts/${id}`);
        setData(fetch.data);
        setCurrentCategory(fetch.data.category.id);
        setLoading(false);
      } catch (err) {
        serverError();
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
      {redirect}
      {loading
        && (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        )}
      {data && categories && currentCategory
        && (
          <Formik
            initialValues={{
              title: data.title,
              body: data.body,
              image: data.image,
              category: currentCategory,
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

export default EditPostForm;
