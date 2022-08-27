import React from "react";
import propTypes from "prop-types";

export default function Download(props) {
  const { width = "24", height = "24", className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      className={className}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z" />
    </svg>
  );
}

Download.propTypes = {
  width: propTypes.string,
  height: propTypes.string,
  className: propTypes.string,
};
