import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Heading from "../../component/Heading";
import Button from "../../component/Button";
import validatePassword from "../../helper/validatePassword";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

import { SERVICE_LAPORAN_KEUANGAN } from "../../config";
const title = "Daftar Akun";
document.title = title;
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [validationPassword, setValidationPassword] = useState("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [redirect, setRedirect] = useState("");

  async function handleSubmitRegister(data) {
    const { nama_lengkap, email, password } = data;
    const validate = validatePassword(password);
    if (validate !== true) {
      return setValidationPassword(validate);
    }
    setValidationPassword("");
    // send API
    try {
      setIsLoadingSubmit(true);
      const createRegister = await axios.post(
        `${SERVICE_LAPORAN_KEUANGAN}/auth/register`,
        {
          nama_lengkap,
          email,
          password,
        }
      );
      Swal.fire({
        customClass: {
          confirmButton: "p-2 text-white bg-green-500 rounded-sm",
        },
        buttonsStyling: false,
        title: createRegister.data.message,
        confirmButtonText: "Okey Berhasil",
        icon: "success",
      });
      setRedirect("/auth/login");
    } catch (error) {
      setIsLoadingSubmit(false);
      Swal.fire({
        customClass: {
          confirmButton: "p-2 text-white bg-red-400 rounded-sm",
        },
        buttonsStyling: false,
        title: "Data daftar akun Gagal Ditambahkan",
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
          {/* nama lengkap */}
          <div className="mt-2">
            <label
              htmlFor="nama_lengkap"
              className={`text-green-500 font-semibold text-lg block`}
            >
              nama lengkap
            </label>
            <input
              id="nama_lengkap"
              type="text"
              {...register("nama_lengkap", {
                required: {
                  value: true,
                  message: "Nama Lengkap Wajib Diisi",
                },
                minLength: { value: 3, message: "Minimal 3 karakter" },
                maxLength: { value: 128, message: "Maksimal 3 karakter" },
              })}
              className="p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 w-80"
              placeholder="masukan nama lengkap anda"
            />
            <Heading Tag="h5" color="text-red-400">
              {errors.nama_lengkap?.message}
            </Heading>
          </div>
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
              {...register("email", {
                required: {
                  value: true,
                  message: "Email Wajib Diisi",
                },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Format email tidak valid",
                },
              })}
              className="p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 w-80"
              placeholder="masukan format email dengan benar"
            />
            <Heading Tag="h5" color="text-red-400">
              {errors.email?.message}
            </Heading>
          </div>
          {/* password */}
          <div className="mt-2">
            <label
              htmlFor="email"
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
              placeholder="pastikan anda mengingatnya"
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
              : "Daftar Akun Sekarang"}
          </Button>
          <p className="mt-4 font-light text-center">
            Sudah punya akun?{" "}
            <Button type="link" href="/auth/login" className="underline">
              Login
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
}
