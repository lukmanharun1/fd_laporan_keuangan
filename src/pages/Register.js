import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Heading from "../component/Heading";
import Button from "../component/Button";
const title = "Daftar Akun";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleSubmitRegister(data) {}
  return (
    <div className="mx-2">
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
              })}
              className="p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 w-80"
              placeholder="isi nama lengkap anda"
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
              })}
              className="p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 w-80"
              placeholder="isi format email dengan benar"
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
              })}
              className="p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 w-80"
              placeholder="pastikan anda mengingatnya"
            />
            <Heading Tag="h5" color="text-red-400">
              {errors.password?.message}
            </Heading>
          </div>
          <Button isPrimary type="submit" className="mt-2 w-80 block">
            Daftar Akun Sekarang
          </Button>
          <p className="mt-4  font-light">
            Sudah punya akun?{" "}
            <Button type="link" href="/auth/login" className="underline">
              Login sekarang
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
}
