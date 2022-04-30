import React from 'react';
import propTypes from 'prop-types';

export default function IconAdd(props) {
  const { className } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" className={className}><path d="M11 19V13H5V11H11V5H13V11H19V13H13V19Z"/></svg>
  )
}

IconAdd.propTypes = {
  className: propTypes.string
}
