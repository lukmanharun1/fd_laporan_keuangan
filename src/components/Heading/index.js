import React from "react";
import propTypes from "prop-types";

export default function Heading(props) {
  const { children, Tag = "h1", color = "text-green-500" } = props;
  const className = ["font-bold", color, props.className];
  if (Tag === "h1") className.push("text-2xl md:text-3xl");
  else if (Tag === "h2") className.push("text-xl md:text-2xl");
  else if (Tag === "h3") className.push("text-lg md:text-xl");
  else if (Tag === "h4") className.push("text-base md:text-lg");
  else if (Tag === "h5") className.push("text-sm md:text-base");
  else className.push("text-sm md:text-xs");

  return <Tag className={className.join(" ")}>{children}</Tag>;
}
Heading.propTypes = {
  Tag: propTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
  color: propTypes.string,
  className: propTypes.string,
};
