import React from "react";
import propTypes from "prop-types";

export default function ArrowBack(props) {
  const { width = "40", height = "40", className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      className={className}
    >
      <path d="M20 33.333 6.667 20 20 6.667 21.958 8.625 11.958 18.625H33.333V21.375H11.958L21.958 31.375Z" />
    </svg>
  );
}

ArrowBack.propTypes = {
  width: propTypes.string,
  height: propTypes.string,
  className: propTypes.string,
};
