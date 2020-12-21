import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Button, Box, CircularProgress, MenuItem,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Redirect, useParams } from 'react-router-dom';
import qs from 'querystring';
import _ from 'lodash';
import postValidator from '../utils/postValidator';
import http from '../axios/axios';

const useStyles = makeStyles(() => ({
  textField: {
    width: '100%',
    margin: 0,
  },
  box: {
    width: '100%',
  },
}));

function EditPostForm() {
  const classes = useStyles();
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
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      className={classes.textField}
                      component={TextField}
                      name="title"
                      label="Título*"
                      color="primary"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      className={classes.textField}
                      component={TextField}
                      name="content"
                      label="Contenido*"
                      color="primary"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      className={classes.textField}
                      component={TextField}
                      name="image"
                      label="Imagen*"
                      color="primary"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      className={classes.textField}
                      component={TextField}
                      label="Categoría*"
                      name="category"
                      color="primary"
                      select
                      value={currentCategory}
                      onChange={handleChange}
                    >
                      {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  {isSubmitting
                    && (
                      <Box display="flex" justifyContent="center" mt={6} className={classes.box}>
                        <CircularProgress />
                      </Box>
                    )}
                  <Grid item xs={12}>
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        disabled={isSubmitting}
                        onClick={submitForm}
                      >
                        guardar post
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        )}
    </>
  );
}

export default EditPostForm;
