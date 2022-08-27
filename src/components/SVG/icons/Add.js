import React from "react";
import propTypes from "prop-types";

export default function Add(props) {
  const { width = "24", height = "24", className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
    >
      <path d="M11 19V13H5V11H11V5H13V11H19V13H13V19Z" />
    </svg>
  );
}

Add.propTypes = {
  width: propTypes.string,
  height: propTypes.string,
  className: propTypes.string,
};
