import React from "react";
import propTypes from "prop-types";
import iconDropDown from "../asset/icon/dropdown.svg";
export default function Dropdown(props) {
  const { name, options, className, onChange } = props;

  return (
    <select
      name={name}
      id={name}
      style={{
        backgroundImage: `url(${iconDropDown})`,
        backgroundPosition: "right 0.75rem center",
        backgroundSize: "1.5rem 1rem",
      }}
      className={`w-full appearance-none rounded-sm bg-clip-padding bg-no-repeat bg-green-500 py-1.5 px-3 text-white focus:border-green-500 focus:outline-none ${className}`}
      onChange={onChange}
    >
      {options.map(({ key, value }) => {
        return (
          <option value={value} key={key}>
            {key}
          </option>
        );
      })}
    </select>
  );
}

Dropdown.prototype = {
  name: propTypes.string,
  options: propTypes.object.isRequired,
  className: propTypes.string,
  onChange: propTypes.func,
};
