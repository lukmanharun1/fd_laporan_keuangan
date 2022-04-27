import React from 'react'
import propTypes from 'prop-types';

export default function Dropdown(props) {
    const { name, options, className, reverse, onChange } = props;
    let keys = Object.keys(options);
    if (reverse) keys = keys.reverse();
  return (
    <select name={name} id={name} className={`rounded-sm ${className}`} onChange={onChange}>
        {
          keys.map(key => {
            return (
              <option value={options[key]} key={key}>{key}</option>
            );
          })
        }
    </select>
  )
}

Dropdown.prototype = {
    name: propTypes.string,
    options: propTypes.object.isRequired,
    className: propTypes.string,
    reverse: propTypes.bool,
    onChange: propTypes.func
}
