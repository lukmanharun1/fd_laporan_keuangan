import React from "react";

import { useJwt } from "react-jwt";

export default function IsAdmin({ children }) {
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);
  if (!isExpired && decodedToken?.role === "admin") {
    return children;
  }
  return false;
}
