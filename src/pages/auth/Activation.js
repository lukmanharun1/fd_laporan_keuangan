import axios from "helpers/axios";
import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useJwt } from "react-jwt";
import { SERVICE_LAPORAN_KEUANGAN } from "config";
import { Navigate } from "react-router-dom";
import NotFound from "pages/error/NotFound";
import Swal from "sweetalert2";

const title = "Aktivasi Akun";

export default function Activation() {
  document.title = title;
  const { token } = useParams();
  const { decodedToken, isExpired } = useJwt(token);
  const [redirect, setRedirect] = useState("");
  async function sendActivation() {
    try {
      const response = await axios.post(
        `${SERVICE_LAPORAN_KEUANGAN}/auth/activation`,
        { token }
      );
      Swal.fire({
        customClass: {
          confirmButton: "p-2 text-white bg-green-500 rounded-sm",
        },
        buttonsStyling: false,
        title: response.data.message,
        confirmButtonText: "Okey Berhasil",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        customClass: {
          confirmButton: "p-2 text-white bg-red-400 rounded-sm",
        },
        buttonsStyling: false,
        title: error.data.message,
        confirmButtonText: "Maaf Sayang Sekali",
        icon: "error",
      });
    }
    setRedirect("/auth/login");
  }
  useEffect(() => {
    sendActivation();
  }, []);
  if (isExpired || !decodedToken) {
    return <NotFound />;
  }

  return <div>{redirect && <Navigate to={redirect} />}</div>;
}
