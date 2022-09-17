import axios from "axios";
import React, { useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import { SERVICE_LAPORAN_KEUANGAN } from "config";
import NotFound from "pages/error/NotFound";
import Swal from "sweetalert2";

const title = "Aktivasi Akun";

export default function Activation() {
  document.title = title;
  const { token } = useParams();
  const navigate = useNavigate();
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    async function sendActivation() {
      try {
        const response = await axios.post(
          `${SERVICE_LAPORAN_KEUANGAN}/auth/activation`,
          {},
          { headers: { Authorization: token } }
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
          title:
            error.response.data.message?.message ?? "Activation email gagal!",
          confirmButtonText: "Maaf Sayang Sekali",
          icon: "error",
        });
      }
      navigate("/auth/login");
    }
    sendActivation();
  }, [navigate]);
  if (isExpired || !decodedToken) {
    return <NotFound />;
  }

  return <></>;
}
