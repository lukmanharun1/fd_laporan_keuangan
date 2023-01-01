import React, { useState } from "react";
import { Heading, Button, Border } from "components";
import { SERVICE_LAPORAN_KEUANGAN } from "../config";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import axios from "helpers/axios";
import Swal from "sweetalert2";
import { IconArrowBackSVG, IconAddSVG } from "components/SVG";
import iconDropDown from "assets/icon/dropdown.svg";

export default function TambahEmiten() {
  const { kode_emiten } = useParams();
  const {
    register,
    handleSubmit,
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

  const [isDividen, setIsDividen] = useState(false);
  const [isBackToInfo, setIsBackToInfo] = useState(false);
  const [isDollar, setIsDollar] = useState(false);

  function handleSatuan(e) {
    if (e.target.value === "dollar") {
      setIsDollar(true);
    }
  }
  function handleJenisLaporan(e) {
    if (e.target.value === "TAHUNAN") {
      setIsDividen(true);
    } else {
      setIsDividen(false);
    }
  }

  function handleInputLaporanKeuangan() {
    let { value } = this.ref
    // remove dot (.)
    value = value.replaceAll('.', '').replaceAll(',', '')
    // remove (
    if (value.includes('(')) {
      // value minus
      value = `-${value.replaceAll('(', '')}`;
    }
    this.ref.value = parseInt(value) || 0
  }

  async function handleTambahLaporanKeuangan(data) {
    const {
      file_laporan_keuangan,
      jenis_laporan,
      tahun,
      harga_saham,
      satuan_rupiah,
      aset,
      kas_dan_setara_kas,
      persediaan,
      piutang,
      aset_lancar,
      aset_tidak_lancar,
      liabilitas_jangka_pendek,
      liabilitas_berbunga,
      liabilitas_jangka_panjang,
      ekuitas,
      pendapatan,
      laba_kotor,
      laba_usaha,
      beban_bunga,
      laba_sebelum_pajak,
      laba_bersih,
      operasi,
      investasi,
      pendanaan,
      dividen,
    } = data;
    const formatTanggal = {
      Q1: `${tahun}-03-31`,
      Q2: `${tahun}-06-30`,
      Q3: `${tahun}-09-30`,
      TAHUNAN: `${tahun}-12-31`,
    };
    const tanggal = formatTanggal[jenis_laporan];

    const formData = new FormData();
    // isi data body
    formData.append("kode_emiten", kode_emiten);
    formData.append("tanggal", tanggal);
    formData.append("jenis_laporan", jenis_laporan);
    formData.append("harga_saham", harga_saham);
    formData.append("nama_file", file_laporan_keuangan[0]);
    // isi data neraca keuangan
    formData.append("aset", aset * satuan_rupiah);
    formData.append("kas_dan_setara_kas", kas_dan_setara_kas * satuan_rupiah);
    formData.append("persediaan", persediaan * satuan_rupiah);
    formData.append("piutang", piutang * satuan_rupiah);
    formData.append("aset_lancar", aset_lancar * satuan_rupiah);
    formData.append("aset_tidak_lancar", aset_tidak_lancar * satuan_rupiah);
    formData.append(
      "liabilitas_jangka_pendek",
      liabilitas_jangka_pendek * satuan_rupiah
    );
    formData.append("liabilitas_berbunga", liabilitas_berbunga * satuan_rupiah);
    formData.append(
      "liabilitas_jangka_panjang",
      liabilitas_jangka_panjang * satuan_rupiah
    );
    formData.append("ekuitas", ekuitas * satuan_rupiah);
    // isi data laba rugi
    formData.append("pendapatan", pendapatan * satuan_rupiah);
    formData.append("laba_kotor", laba_kotor * satuan_rupiah);
    formData.append("laba_usaha", laba_usaha * satuan_rupiah);
    formData.append("beban_bunga", beban_bunga * satuan_rupiah);
    formData.append("laba_sebelum_pajak", laba_sebelum_pajak * satuan_rupiah);
    formData.append("laba_bersih", laba_bersih * satuan_rupiah);
    // isi data arus kas
    formData.append("operasi", operasi * satuan_rupiah);
    formData.append("investasi", investasi * satuan_rupiah);
    formData.append("pendanaan", pendanaan * satuan_rupiah);

    // isi data dividen jika jenis laporan TAHUNAN
    if (jenis_laporan === "TAHUNAN" && dividen) {
      formData.append("cash", dividen);
    }

    try {
      // hit API POST /laporan-keuangan
      const laporanKeuangan = await axios.post(
        `${SERVICE_LAPORAN_KEUANGAN}/laporan-keuangan`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // response success sweetalert
      Swal.fire({
        customClass: {
          confirmButton: "p-2 text-white bg-green-500 rounded-sm",
        },
        buttonsStyling: false,
        title: laporanKeuangan.data.message,
        confirmButtonText: "Okey Berhasil",
        icon: "success",
      });
      setIsBackToInfo(true);
    } catch (error) {
      let message = "";
      const { status } = error.response;
      if (status >= 400 && status < 500) {
        message = `${error.response.data?.errors?.errors[0]?.param} ${error.response.data?.errors?.errors[0]?.msg}`;
      } else {
        // ambil error nya berupa string html pesan error di tag <pre>
        const htmlDoc = new DOMParser().parseFromString(
          error.response.data,
          "text/html"
        );
        message = htmlDoc.querySelector("pre").textContent;
      }
      // error sweetalert
      Swal.fire({
        customClass: {
          confirmButton: "p-2 text-white bg-red-400 rounded-sm",
        },
        buttonsStyling: false,
        title: message,
        confirmButtonText: "Maaf Sayang Sekali",
        icon: "error",
      });
    }
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
      name: "beban_bunga",
      text: "Beban Bunga",
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
      text: "Operasi",
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
      {isBackToInfo && <Navigate to={`/info/${kode_emiten}`} />}
      <Button
        type="link"
        href={`/info/${kode_emiten}`}
        className="md:ml-40 block absolute"
      >
        <IconArrowBackSVG className="fill-green-500" />
      </Button>
      <Heading Tag="h2" className="text-center mt-3">
        {title}
      </Heading>
      <div className="flex justify-center mt-5">
        <form
          action="/"
          method="post"
          onSubmit={handleSubmit(handleTambahLaporanKeuangan)}
          encType="multipart/form-data"
        >
          {/* jenis laporan | tahun */}
          <div className="grid grid-cols-5 gap-x-3 gap-y-1" style={{ gridTemplateColumns: '150px 100px 350px 250px 200px' }}>
            <Heading Tag="h3">Jenis Laporan</Heading>
            <Heading Tag="h3">Tahun</Heading>
            <label
              htmlFor="file_laporan_keuangan"
              className={`text-green-500 font-semibold text-lg block`}
            >
              File Laporan Keuangan <small className="text-red-400">.pdf</small>
            </label>
             <label
              htmlFor="harga_saham"
              className={`text-green-500 font-semibold text-lg block`}
            >
              Harga Saham <small className="text-red-400">*</small>
            </label>
          {/* satuan */}
          <Heading Tag="h3" className="mt-2">
            Satuan Rupiah
          </Heading>

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
            {/* file laporan keuangan */}
            <div>
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
                className="cursor-pointer p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 w-full"
              />
              <Heading Tag="h5" color="text-red-400">
                {errors.file_laporan_keuangan?.message}
              </Heading>
            </div>

            {/* harga saham */}
            <div>
              <input
                id="harga_saham"
                type="number"
                accept="application/pdf"
                {...register("harga_saham", {
                  required: {
                    value: true,
                    message: "Harga Saham Wajib Diisi",
                  },
                  min: {
                    value: 50,
                    message: "Harga Saham Harus 50 keatas",
                  },
                })}
                className="p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 w-full"
              />
              <Heading Tag="h5" color="text-red-400">
                {errors.harga_saham?.message}
              </Heading>
            </div>

          {isDollar ? (
            <>
              <input
                id="satuan_rupiah"
                type="number"
                accept="application/pdf"
                {...register("satuan_rupiah", {
                  required: {
                    value: true,
                    message: "Satuan Rupiah Wajib Diisi",
                  },
                  min: {
                    value: 14000,
                    message: "Harga Dollar Diatas Rp.14000",
                  },
                })}
                placeholder="Masukkan Nilai Kurs Dollar Ke Rupiah"
                className="p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 w-full"
              />
              <Heading Tag="h5" color="text-red-400">
                {errors.satuan_rupiah?.message}
              </Heading>
            </>
          ) : (
            <select
              style={{
                backgroundImage: `url(${iconDropDown})`,
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.5rem 1rem",
              }}
              {...register("satuan_rupiah", { onChange: handleSatuan })}
              className="w-full appearance-none rounded-sm bg-clip-padding bg-no-repeat bg-green-500 py-1.5 px-3 text-white focus:border-green-500 focus:outline-none"
            >
              <option value="1">1 Rupiah</option>
              <option value="1000">Ribu</option>
              <option value="1000000">Juta</option>
              <option value="1000000000">Miliar</option>
              <option value="1000000000000">Triliun</option>
              <option value="dollar">Dollar</option>
            </select>
          )}
          </div>
          

         
          {/* neraca keuangan */}
          <Heading Tag="h3" className="mt-2">
            Neraca Keuangan <small className="text-red-400">*</small>
          </Heading>
          <Border className="p-2 grid grid-cols-4 gap-3">
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
                    type="text"
                    {...register(name, {
                      min: {
                        value: 0,
                        message: `${text} Tidak Boleh Negatif!`,
                      },
                      required: {
                        value: true,
                        message: `${text} Wajib Diisi`,
                      },
                     onChange: handleInputLaporanKeuangan
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
          <Border className="p-2 grid grid-cols-4 gap-3">
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
                    type="text"
                    accept="application/pdf"
                    {...register(name, {
                      required: {
                        value: true,
                        message: `${text} Wajib Diisi`,
                      },
                      onChange: handleInputLaporanKeuangan
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
          <Border className="p-2 grid grid-cols-4 gap-3">
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
                    type="text"
                    accept="application/pdf"
                    {...register(name, {
                      required: {
                        value: true,
                        message: `${text} Wajib Diisi`,
                      },
                      onChange: handleInputLaporanKeuangan
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
                    type="text"
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
          <Button isPrimary type="submit" className="mt-2 rounded-md p-2 mb-10">
            <IconAddSVG className="inline fill-white" />
            Data Laporan Keuangan
          </Button>
        </form>
      </div>
    </div>
  );
}
