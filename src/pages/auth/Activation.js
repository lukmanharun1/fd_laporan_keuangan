import axios from "axios";
import React, { useEffect } from "react";
import validateEmail from "helpers/validateEmail";

import { useParams } from "react-router-dom";
import { useJwt } from "react-jwt";
import { SERVICE_LAPORAN_KEUANGAN } from "config";

const title = "Aktivasi Akun";
document.title = title;

export default function Activation() {
  const { token } = useParams();
  const { decodedToken, isExpired } = useJwt(token);
  if (isExpired) {
    return alert("404");
  }
  if (
    !decodedToken?.nama_lengkap ||
    typeof validateEmail(decodedToken?.email) === "string" ||
    !decodedToken?.password
  ) {
    return alert("404");
  }
  // axios
  //   .post(`${SERVICE_LAPORAN_KEUANGAN}/auth/activation`, { token })
  //   .then((data) => {});
  return <div>{token}</div>;
}
