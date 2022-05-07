import React from 'react';
import propTypes from 'prop-types';
import Heading from './Heading';

export default function InputLabel(props) {
  const { type, children, htmlFor, placeholder, autoComplete, className, classLabel, classInput, validation, maxLength, accept } = props;
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={`text-green-500 font-semibold text-lg ${classLabel}`}>{children}</label>
      <input
        type={type ? type : 'text'}
        id={htmlFor}
        placeholder={placeholder}
        autoComplete={autoComplete}
        accept={accept}
        maxLength={maxLength}
        className={`p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 ${classInput}`}
      />
      {validation ? <Heading Tag='h5' color='text-red-400'>{validation}</Heading> : ''}
    </div>
  );
}

InputLabel.propTypes = {
  type: propTypes.oneOf(['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden','image', 'month',
                        'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week'
                        ]),
  htmlFor: propTypes.string.isRequired,
  placeholder: propTypes.string,
  autoComplete: propTypes.oneOf(['on', 'off']),
  className: propTypes.string,
  classLabel: propTypes.string,
  classInput: propTypes.string,
  validation: propTypes.string,
  maxLength: propTypes.number,
  accept: propTypes.string
}