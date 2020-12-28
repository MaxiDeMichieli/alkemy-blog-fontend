import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Button, Box, CircularProgress, MenuItem,
} from '@material-ui/core';
import { Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

const useStyles = makeStyles(() => ({
  textField: {
    width: '100%',
    margin: 0,
  },
  box: {
    width: '100%',
  },
}));

function FormInputs({
  currentCategory, handleChange, categories, isSubmitting, submitForm,
}) {
  const classes = useStyles();

  return (
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
            name="image"
            label="Imagen*"
            color="primary"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            className={classes.textField}
            component={TextField}
            multiline
            rowsMax={6}
            name="body"
            label="Contenido*"
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
            value={currentCategory()}
            onChange={handleChange}
          >
            {categories().map((option) => (
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
  );
}

FormInputs.propTypes = {
  currentCategory: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  categories: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  submitForm: PropTypes.func.isRequired,
};

export default FormInputs;
