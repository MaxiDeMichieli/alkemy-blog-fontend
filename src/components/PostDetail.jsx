import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Box } from '@material-ui/core';

function PostDetail({
  title, date, image, content, category,
}) {
  const useStyles = makeStyles(() => ({
    div: {
      marginTop: 20,
    },
    date: {
      position: 'absolute',
      right: 30,
      top: 20,
    },
    category: {
      position: 'absolute',
      top: 20,
      left: 30,
    },
    image: {
      height: '50vw',
      maxHeight: 320,
      maxWidth: 540,
      backgroundImage: `url(${image})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.div}>
      <Typography variant="caption" className={classes.date}>
        {date}
      </Typography>
      <Typography variant="caption" className={classes.category}>
        {category}
      </Typography>
      <Box mb={3}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        <Divider />
      </Box>
      {!!image
      && (
        <div className={classes.image} />
      )}
      <Box mt={3}>
        <Typography>
          {content}
        </Typography>
      </Box>
    </div>
  );
}

PostDetail.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default PostDetail;
