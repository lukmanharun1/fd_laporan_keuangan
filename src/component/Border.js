import React from 'react';
import propTypes from 'prop-types';

export default function Border(props) {
  const { className, children } = props;
  return (
    <div className={`border border-green-500 border-solid rounded-sm ${className}`}>
      {children}
    </div>
  )
}

Border.propTypes = {
  className: propTypes.string
}
