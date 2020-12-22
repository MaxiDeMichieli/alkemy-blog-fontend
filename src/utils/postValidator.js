const postValidator = (values, currentCategory) => {
  const errors = {};
  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|jpeg)/;
  const regexTest = (value) => imageRegex.test(value);

  if (!values.title) {
    errors.title = 'Debes ingresar un título';
  } else if (values.title.length > 100) {
    errors.title = 'El título tiene un máximo de 100 caracteres';
  }

  if (!values.body) {
    errors.body = 'Debes ingresar un contenido';
  } else if (values.body.length > 1000) {
    errors.body = 'El contenido tiene un máximo de 1000 caracteres';
  }

  if (!values.image) {
    errors.image = 'Debes ingresar una imagen';
  } else if (!regexTest(values.image)) {
    errors.image = 'La imagen debe ser en formato .png, .jpg o .jpeg';
  }

  if (!currentCategory) {
    errors.category = 'Debes ingresar una categoría';
  }

  return errors;
};

export default postValidator;
