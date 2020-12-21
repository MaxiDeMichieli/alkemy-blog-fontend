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

  const [currentCategory, setCurrentCategory] = useState(1);
  const [redirect, setRedirect] = useState(<></>);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      value: 1,
      label: 'deporte',
    },
    {
      value: 2,
      label: 'tecnología',
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const fetch = await http.get(`/posts/${id}`);
      setData(fetch.data.content);
      categories.forEach((category) => {
        if (category.label === fetch.data.content.category) {
          setCurrentCategory(category.value);
        }
      });
      setLoading(false);
    }
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
      {data
        && (
          <Formik
            initialValues={{
              title: data.title,
              content: data.content,
              image: data.image,
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

export default EditPostForm;
