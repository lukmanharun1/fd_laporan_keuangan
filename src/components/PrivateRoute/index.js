import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import axios from "helpers/axios";
import { SERVICE_LAPORAN_KEUANGAN } from "config";
import propTypes from "prop-types";

export default function PrivateRoute({ element, isAdmin }) {
  const token = localStorage.getItem("token");
  const [isRender, setIsRender] = useState(false);
  const navigate = useNavigate();
  const { decodedToken, isExpired } = useJwt(token);

  if (!decodedToken || isExpired) {
    navigate("/auth/login");
  }
  if (isAdmin && decodedToken?.role !== "admin") {
    navigate("/");
  }
  async function sendVerifyToken() {
    try {
      const res = await axios.post(
        `${SERVICE_LAPORAN_KEUANGAN}/auth/verify-token`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.data.status === "success") {
        return setIsRender(true);
      }
    } catch (error) {
      return navigate("/auth/login");
    }
  }
  sendVerifyToken();
  // useEffect(() => {
  //   async function sendVerifyToken() {
  //     try {
  //       const res = await axios.post(
  //         `${SERVICE_LAPORAN_KEUANGAN}/auth/verify-token`,
  //         {},
  //         {
  //           headers: {
  //             Authorization: token,
  //           },
  //         }
  //       );
  //       if (res.data.status === "success") {
  //         return setIsRender(true);
  //       }
  //     } catch (error) {
  //       return navigate("/auth/login");
  //     }
  //   }
  //   sendVerifyToken();
  // }, [navigate]);

  if (isRender) {
    return element;
  }
  return <></>;
}

PrivateRoute.propTypes = {
  element: propTypes.element,
  isAdmin: propTypes.bool,
};
