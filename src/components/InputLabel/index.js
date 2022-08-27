import React from "react";
import propTypes from "prop-types";
import { Heading } from "components";

export default function InputLabel(props) {
  const {
    children,
    htmlFor,
    className,
    classLabel,
    classInput,
    validation,
    ...attributes
  } = props;
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className={`text-green-500 font-semibold text-lg ${classLabel}`}
      >
        {children}
      </label>
      <input
        id={htmlFor}
        {...attributes}
        className={`p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 ${classInput}`}
      />
      {validation ? (
        <Heading Tag="h5" color="text-red-400">
          {validation}
        </Heading>
      ) : (
        ""
      )}
    </div>
  );
}

InputLabel.propTypes = {
  htmlFor: propTypes.string.isRequired,
  className: propTypes.string,
  classLabel: propTypes.string,
  classInput: propTypes.string,
  validation: propTypes.string,
};
