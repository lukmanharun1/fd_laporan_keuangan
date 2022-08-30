import React, { useState, useEffect, Component } from "react";
import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import axios from "helpers/axios";
import { SERVICE_LAPORAN_KEUANGAN } from "config";

export default function PrivateRoute({ element }) {
  const token = localStorage.getItem("token");
  const [isRender, setIsRender] = useState(false);
  const navigate = useNavigate();
  if (!token) {
    navigate("/auth/login");
  }
  const { decodedToken, isExpired } = useJwt(token);
  if (!decodedToken || isExpired) {
    navigate("/auth/login");
  }
  async function sendVerifyToken() {
    try {
      const res = await axios.post(
        `${SERVICE_LAPORAN_KEUANGAN}/verify-token`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.data.status === "success") {
        setIsRender(true);
      }
    } catch (error) {
      navigate("/auth/login");
    }
  }
  useEffect(() => {
    sendVerifyToken();
  }, []);
  if (isRender) {
    return element;
  }
  return <></>;
}
