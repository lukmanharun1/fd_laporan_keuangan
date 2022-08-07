import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
export default function Button(props) {
  const {
    type,
    href,
    target,
    onClick,
    isExternal,
    isPrimary,
    disabled,
    children,
  } = props;
  const className = [props.className];
  if (isPrimary) {
    className.push("p-2 text-white bg-green-500 hover:bg-green-600 rounded-sm");
  }
  if (type === "link") {
    if (isExternal) {
      return (
        <a
          href={href}
          className={className.join(" ")}
          target={target === "_blank" ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    } else {
      return (
        <Link to={href} className={className.join(" ")} onClick={onClick}>
          {children}
        </Link>
      );
    }
  }
  return (
    <button
      type={type}
      className={className.join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: propTypes.oneOf(["button", "link", "submit", "reset"]),
  className: propTypes.string,
  href: propTypes.string,
  target: propTypes.string,
  onClick: propTypes.func,
  isExternal: propTypes.bool,
  isPrimary: propTypes.bool,
  disabled: propTypes.bool,
};
