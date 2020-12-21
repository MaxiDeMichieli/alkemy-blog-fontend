import React, { useState } from 'react';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import qs from 'querystring';
import _ from 'lodash';
import postValidator from '../utils/postValidator';
import http from '../axios/axios';
import FormInputs from './FormInputs';

function PostForm() {
  const debounce = _.debounce((a, b, callback) => callback(a, b), 100);

  const [currentCategory, setCurrentCategory] = useState(1);
  const [redirect, setRedirect] = useState(<></>);

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
    </>
  );
}

export default PostForm;
