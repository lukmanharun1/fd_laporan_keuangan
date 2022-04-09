import React from 'react'
import propTypes from 'prop-types';

export default function Dropdown(props) {
    const { name, options, className, reverse } = props;
    let keys = Object.keys(options);
    if (reverse) keys = keys.reverse();
  return (
    <select name={name} id={name} className={className}>
        {
          keys.map(key => <option value={options[key]} key={key}>{key}</option>)
        }
    </select>
  )
}

Dropdown.prototype = {
    name: propTypes.string,
    options: propTypes.object,
    className: propTypes.string,
    reverse: propTypes.bool
}
