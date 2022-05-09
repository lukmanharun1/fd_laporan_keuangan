import React, { useState } from "react";
import Heading from "../component/Heading";
import Button from "../component/Button";
import IconAdd from "../component/IconAdd";
import axios from "axios";
import { SERVICE_LAPORAN_KEUANGAN } from "../config";
import Swal from "sweetalert2";
import IconArrowBack from "../component/IconArrowBack";
import validateKodeEmiten from "../helper/validateKodeEmiten";
import iconDropDown from "../asset/icon/dropdown.svg";
import Dropdown from "../component/Dropdown";
import Border from "../component/Border";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";

export default function TambahEmiten() {
  const { kode_emiten } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const title = `Tambah Data Laporan Keuangan ${kode_emiten}`;
  document.title = title;
  const optionsJenisLaporan = [
    {
      key: "Q1",
      value: "Q1",
    },
    {
      key: "Q2",
      value: "Q2",
    },
    {
      key: "Q3",
      value: "Q3",
    },
    {
      key: "TAHUNAN",
      value: "TAHUNAN",
    },
  ];
  const optionsTahun = []; // isi dari tahun 2010 ~ tahun sekarang
  let tahunSekarang = new Date().getFullYear();
  const selisihTahun = tahunSekarang - 2010;
  for (let i = 0; i <= selisihTahun; i++) {
    optionsTahun.push({
      key: tahunSekarang,
      value: tahunSekarang,
    });
    tahunSekarang--;
  }
  const initialValidation = {
    file_laporan_keuangan: "",
    aset: "",
    kas_dan_setara_kas: "",
    persediaan: "",
    piutang: "",
    aset_lancar: "",
    aset_tidak_lancar: "",
    liabilitas_jangka_pendek: "",
    liabilitas_berbunga: "",
    liabilitas_jangka_panjang: "",
    ekuitas: "",
    pendapatan: "",
    laba_kotor: "",
    laba_usaha: "",
    laba_sebelum_pajak: "",
    laba_bersih: "",
    operasi: "",
    investasi: "",
    pendanaan: "",
    dividen: "",
  };

  const [isDividen, setIsDividen] = useState(false);
  const [validation, setValidation] = useState(initialValidation);
  function handleJenisLaporan(e) {
    if (e.target.value === "TAHUNAN") {
      setIsDividen(true);
    } else {
      setIsDividen(false);
    }
  }
  function requiredNumber(
    dataValidation,
    properti,
    message,
    isPositive = true
  ) {
    if (!dataValidation) {
      initialValidation[properti] = `${message} Wajib Diisi`;
      setValidation({ ...initialValidation });
    } else if (isPositive && dataValidation < 0) {
      initialValidation[properti] = `${message} Tidak Boleh Negatif`;
      setValidation({ ...initialValidation });
    }
  }

  function handleFileLaporanKeuangan(e) {
    const [uploadFileLaporanKeuangan] = e.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(uploadFileLaporanKeuangan);
    reader.onload = (e) => {
      const formData = new FormData();
      for (const dataAppend in validation) {
        formData.append(dataAppend, validation[dataAppend]);
      }
      console.log(formData);
      // console.warn(`img data ${e.target.result}`);
      // console.log(e.target);
    };
  }
  async function handleTambahLaporanKeuangan(data) {
    console.log(data);
  }
  const dataNeracaKeuangan = [
    {
      name: "aset",
      text: "Aset",
    },
    {
      name: "kas_dan_setara_kas",
      text: "Kas Dan Setara Kas",
    },
    {
      name: "persediaan",
      text: "Persediaan",
    },
    {
      name: "piutang",
      text: "Piutang",
    },
    {
      name: "aset_lancar",
      text: "Aset Lancar",
    },
    {
      name: "aset_tidak_lancar",
      text: "Aset Tidak Lancar",
    },
    {
      name: "liabilitas_jangka_pendek",
      text: "Liabilitas Jangka Pendek",
    },
    {
      name: "liabilitas_berbunga",
      text: "Liabilitas Berbunga",
    },
    {
      name: "liabilitas_jangka_panjang",
      text: "Liabilitas Jangka Panjang",
    },
    {
      name: "ekuitas",
      text: "Ekuitas",
    },
  ];

  const dataLabaRugi = [
    {
      name: "pendapatan",
      text: "Pendapatan",
    },
    {
      name: "laba_kotor",
      text: "Laba Kotor",
    },
    {
      name: "laba_usaha",
      text: "Laba Usaha",
    },
    {
      name: "laba_sebelum_pajak",
      text: "Laba Sebelum Pajak",
    },
    {
      name: "laba_bersih",
      text: "Laba Bersih",
    },
  ];

  const dataArusKas = [
    {
      name: "operasi",
      text: "Operas",
    },
    {
      name: "investasi",
      text: "Investasi",
    },
    {
      name: "pendanaan",
      text: "Pendanaan",
    },
  ];
  return (
    <div className="mx-2">
      <Button
        type="link"
        href={`/info/${kode_emiten}`}
        className="md:ml-40 block absolute"
      >
        <IconArrowBack className="fill-green-500" />
      </Button>
      <Heading Tag="h2" className="text-center mt-3">
        {title}
      </Heading>
      <div className="flex justify-center mt-3">
        <form
          action="/"
          method="post"
          onSubmit={handleSubmit(handleTambahLaporanKeuangan)}
        >
          {/* jenis laporan | tahun */}
          <div className="grid grid-cols-2 gap-x-2">
            <Heading Tag="h3">Jenis Laporan</Heading>
            <Heading Tag="h3">Tahun</Heading>
            <select
              style={{
                backgroundImage: `url(${iconDropDown})`,
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.5rem 1rem",
              }}
              {...register("jenis_laporan")}
              className="w-full appearance-none rounded-sm bg-clip-padding bg-no-repeat bg-green-500 py-1.5 px-3 text-white focus:border-green-500 focus:outline-none mt-2"
              onChange={handleJenisLaporan}
            >
              {optionsJenisLaporan.map(({ key, value }) => {
                return (
                  <option value={value} key={key}>
                    {key}
                  </option>
                );
              })}
            </select>
            <select
              style={{
                backgroundImage: `url(${iconDropDown})`,
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.5rem 1rem",
              }}
              {...register("tahun")}
              className="w-full appearance-none rounded-sm bg-clip-padding bg-no-repeat bg-green-500 py-1.5 px-3 text-white focus:border-green-500 focus:outline-none mt-2"
            >
              {optionsTahun.map(({ key, value }) => {
                return (
                  <option value={value} key={key}>
                    {key}
                  </option>
                );
              })}
            </select>
          </div>
          {/* file laporan keuangan */}
          <div className="mt-2">
            <label
              htmlFor="file_laporan_keuangan"
              className={`text-green-500 font-semibold text-lg block`}
            >
              File Laporan Keuangan <small className="text-red-400">.pdf</small>
            </label>
            <input
              id="file_laporan_keuangan"
              type="file"
              accept="application/pdf"
              {...register("file_laporan_keuangan", {
                required: {
                  value: true,
                  message: "File Laporan Keuangan Wajib Diisi",
                },
              })}
              className={`p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 w-80`}
            />
            <Heading Tag="h5" color="text-red-400">
              {errors.file_laporan_keuangan?.message}
            </Heading>
          </div>
          {/* neraca keuangan */}
          <Heading Tag="h3" className="mt-2">
            Neraca Keuangan <small className="text-red-400">*</small>
          </Heading>
          <Border className="p-2">
            {/* inputan neraca keuangan */}
            {dataNeracaKeuangan.map(({ name, text }) => {
              return (
                <div className="mt-2" key={`Data Neraca Keuangan ${text}`}>
                  <label
                    htmlFor={name}
                    className={`text-green-500 font-semibold text-lg block`}
                  >
                    {text}
                  </label>
                  <input
                    id={name}
                    type="number"
                    accept="application/pdf"
                    {...register(name, {
                      min: {
                        value: 0,
                        message: `${text} Tidak Boleh Negatif!`,
                      },
                      required: {
                        value: true,
                        message: `${text} Wajib Diisi`,
                      },
                    })}
                    className={`p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 w-72`}
                  />
                  <Heading Tag="h6" color="text-red-400">
                    {errors[name]?.message}
                  </Heading>
                </div>
              );
            })}
          </Border>
          {/* laba rugi */}
          <Heading Tag="h3" className="mt-2">
            Laba Rugi <small className="text-red-400">*</small>
          </Heading>
          <Border className="p-2">
            {/* inputan laba rugi */}
            {dataLabaRugi.map(({ name, text }) => {
              return (
                <div className="mt-2" key={`Data Laba Rugi ${text}`}>
                  <label
                    htmlFor={name}
                    className={`text-green-500 font-semibold text-lg block`}
                  >
                    {text}
                  </label>
                  <input
                    id={name}
                    type="number"
                    accept="application/pdf"
                    {...register(name, {
                      required: {
                        value: true,
                        message: `${text} Wajib Diisi`,
                      },
                    })}
                    className={`p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 w-72`}
                  />
                  <Heading Tag="h6" color="text-red-400">
                    {errors[name]?.message}
                  </Heading>
                </div>
              );
            })}
          </Border>
          {/* arus kas */}
          <Heading Tag="h3" className="mt-2">
            Arus Kas <small className="text-red-400">*</small>
          </Heading>
          <Border className="p-2">
            {/* inputan arus kas */}
            {dataArusKas.map(({ name, text }) => {
              return (
                <div className="mt-2" key={`Data Arus Kas ${text}`}>
                  <label
                    htmlFor={name}
                    className={`text-green-500 font-semibold text-lg block`}
                  >
                    {text}
                  </label>
                  <input
                    id={name}
                    type="number"
                    accept="application/pdf"
                    {...register(name, {
                      required: {
                        value: true,
                        message: `${text} Wajib Diisi`,
                      },
                    })}
                    className={`p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 w-72`}
                  />
                  <Heading Tag="h6" color="text-red-400">
                    {errors[name]?.message}
                  </Heading>
                </div>
              );
            })}
          </Border>
          {/* dividen */}
          {isDividen && (
            <>
              <Heading Tag="h3" className="mt-2">
                Dividen
              </Heading>
              <Border className="p-2">
                {/* rupiah */}
                <div className="mt-2">
                  <label
                    htmlFor="dividen"
                    className={`text-green-500 font-semibold text-lg block`}
                  >
                    Rupiah
                  </label>
                  <input
                    id="dividen"
                    type="number"
                    accept="application/pdf"
                    placeholder="optional"
                    {...register("dividen", {
                      min: {
                        value: 0,
                        message: `Dividen Wajib Diisi`,
                      },
                    })}
                    className={`p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 w-72`}
                  />
                  <Heading Tag="h6" color="text-red-400">
                    {errors.dividen?.message}
                  </Heading>
                </div>
              </Border>
            </>
          )}
          <Button isPrimary type="submit" className="mt-2 w-80 mb-10">
            <IconAdd className="inline fill-white" />
            Data Laporan Keuangan
          </Button>
        </form>
      </div>
    </div>
  );
}
