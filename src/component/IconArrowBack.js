import React from 'react';
import propTypes from 'prop-types';

export default function IconArrowBack(props) {
  const { className } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={className}><path d="M20 33.333 6.667 20 20 6.667 21.958 8.625 11.958 18.625H33.333V21.375H11.958L21.958 31.375Z"/></svg>
  );
}

IconArrowBack.propTypes = {
  className: propTypes.string
}
