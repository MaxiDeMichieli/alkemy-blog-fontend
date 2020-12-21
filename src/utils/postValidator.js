const postValidator = (values, currentCategory) => {
  const errors = {};
  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)/;
  const regexTest = (value) => imageRegex.test(value);

  if (!values.title) {
    errors.title = 'Debes ingresar un título';
  } else if (values.title.length > 100) {
    errors.title = 'El título tiene un máximo de 100 caracteres';
  }

  if (!values.content) {
    errors.content = 'Debes ingresar un contenido';
  } else if (values.content.length > 100) {
    errors.content = 'El contenido tiene un máximo de 1000 caracteres';
  }

  if (!values.image) {
    errors.image = 'Debes ingresar una imagen';
  } else if (!regexTest(values.image)) {
    errors.image = 'La imagen debe ser en formato .png o .jpg';
  }

  if (!currentCategory) {
    errors.category = 'Debes ingresar una categoría';
  }

  return errors;
};

export default postValidator;
