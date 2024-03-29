import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Heading, Button } from "components";
import { Navigate } from "react-router-dom";
import { SERVICE_LAPORAN_KEUANGAN } from "config";

import validatePassword from "helpers/validatePassword";
import validateEmail from "helpers/validateEmail";
import axios from "helpers/axios";
import Swal from "sweetalert2";

import analisisLaporanKeuangan from "assets/images/analisis-laporan-keuangan.png";
const title = "Login Akun";

export default function Login() {
  document.title = title;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [validationPassword, setValidationPassword] = useState("");
  const [validationEmail, setValidationEmail] = useState("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [redirect, setRedirect] = useState("");

  async function handleSubmitRegister(data) {
    const { email, password } = data;
    const validatePass = validatePassword(password);
    const validateMail = validateEmail(email);

    if (typeof validatePass === "string") {
      return setValidationPassword(validatePass);
    }
    if (typeof validateMail === "string") {
      return setValidationEmail(validateMail);
    }
    setValidationPassword("");
    setValidationEmail("");
    // send API
    try {
      setIsLoadingSubmit(true);
      const login = await axios.post(`${SERVICE_LAPORAN_KEUANGAN}/auth/login`, {
        email,
        password,
      });
      Swal.fire({
        customClass: {
          confirmButton: "p-2 text-white bg-green-500 rounded-sm",
        },
        buttonsStyling: false,
        title: login.data.message,
        confirmButtonText: "Okey Berhasil",
        icon: "success",
      });
      localStorage.setItem("token", login.data.token);
      setRedirect("/");
    } catch (error) {
      setIsLoadingSubmit(false);
      Swal.fire({
        customClass: {
          confirmButton: "p-2 text-white bg-red-400 rounded-sm",
        },
        buttonsStyling: false,
        title:
          error.response.data.message ?? "Data daftar akun Gagal Ditambahkan",
        confirmButtonText: "Maaf Sayang Sekali",
        icon: "error",
      });
    }
  }
  return (
    <div className="mx-2">
      {redirect && <Navigate to={redirect} />}
      <Heading Tag="h1" className="text-center mt-3">
        {title}
      </Heading>
      <div className="flex justify-center mt-3">
        <form
          action="/"
          method="post"
          onSubmit={handleSubmit(handleSubmitRegister)}
        >
          <img
            src={analisisLaporanKeuangan}
            alt="ilustrasi analisis laporan keuangan"
            className="w-80 h-56 -mt-2"
          />
          <div className="mt-2">
            <label
              htmlFor="email"
              className={`text-green-500 font-semibold text-lg block`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoFocus
              {...register("email", {
                required: {
                  value: true,
                  message: "Email Wajib Diisi",
                },
              })}
              className="p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 w-80"
              placeholder="masukan format email dengan benar"
            />
            <Heading Tag="h5" color="text-red-400">
              {errors.email?.message || validationEmail}
            </Heading>
          </div>
          {/* password */}
          <div className="mt-2">
            <label
              htmlFor="password"
              className={`text-green-500 font-semibold text-lg block`}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password Wajib Diisi",
                },
                maxLength: {
                  value: 50,
                  maxLength: "Password maksimal 50 karakter",
                },
              })}
              className="p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 w-80"
              placeholder="masukkan password"
            />
            <Heading Tag="h5" color="text-red-400">
              {errors.password?.message || validationPassword}
            </Heading>
          </div>
          <Button
            isPrimary
            type="submit"
            className="mt-2 w-80 block"
            disabled={isLoadingSubmit}
          >
            {isLoadingSubmit
              ? "tunggu data lagi diproses..."
              : "Login Akun Sekarang"}
          </Button>
          <p className="mt-4 font-light text-center">
            Belum punya akun?{" "}
            <Button type="link" href="/auth/register" className="underline">
              Daftar
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
}
