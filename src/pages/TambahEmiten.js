import React, { useState } from "react";
import { Heading, Button, InputLabel } from "components";
import { IconAddSVG, IconArrowBackSVG } from "components/SVG";
import { SERVICE_LAPORAN_KEUANGAN } from "config";
import { Navigate } from "react-router-dom";
import validateKodeEmiten from "helpers/validateKodeEmiten";
import axios from "helpers/axios";
import Swal from "sweetalert2";

export default function TambahEmiten() {
  const initialState = {
    nama_emiten: "",
    kode_emiten: "",
    jumlah_saham: "",
  };

  const [validation, setValidation] = useState(initialState);
  const [isBackToHome, setIsBackToHome] = useState(false);
  async function handleTambahDataEmiten(e) {
    e.preventDefault();
    // inisialisasi
    const namaEmiten = e.target.nama_emiten.value;
    const kodeEmiten = e.target.kode_emiten.value;
    const jumlahSaham = e.target.jumlah_saham.value;

    // cek nama emiten harus panjang lebih dari 10 huruf
    if (namaEmiten.length < 10) {
      initialState.nama_emiten = "Nama Emiten Harus Lebih dari 10 huruf";
      setValidation({
        ...initialState,
      });
    } else {
      initialState.nama_emiten = "";
      setValidation({
        ...initialState,
      });
    }

    // cek kode emiten harus panjang 4 dan harus alphabert
    const isValidKodeEmiten = validateKodeEmiten(kodeEmiten); // false | string
    if (typeof isValidKodeEmiten === "string") {
      initialState.kode_emiten = isValidKodeEmiten;
      setValidation({
        ...initialState,
      });
    } else {
      initialState.kode_emiten = "";
      setValidation({
        ...initialState,
      });
    }
    // cek jumlah saham harus lebih dari 10 juta
    if (jumlahSaham < 10_000_000) {
      initialState.jumlah_saham = "Jumlah Saham Harus Lebih Dari 10 Juta";
      setValidation({
        ...initialState,
      });
    } else {
      initialState.jumlah_saham = "";
      setValidation({
        ...initialState,
      });
    }

    // cek seluruh validation dan send server
    if (
      !initialState.nama_emiten &&
      !initialState.kode_emiten &&
      !initialState.jumlah_saham
    ) {
      try {
        const createEmiten = await axios.post(
          `${SERVICE_LAPORAN_KEUANGAN}/emiten`,
          {
            nama_emiten: namaEmiten,
            kode_emiten: kodeEmiten,
            jumlah_saham: jumlahSaham,
          }
        );
        Swal.fire({
          customClass: {
            confirmButton: "p-2 text-white bg-green-500 rounded-sm",
          },
          buttonsStyling: false,
          title: createEmiten.data.message,
          confirmButtonText: "Okey Berhasil",
          icon: "success",
        });
        setIsBackToHome(true);
      } catch (error) {
        Swal.fire({
          customClass: {
            confirmButton: "p-2 text-white bg-red-400 rounded-sm",
          },
          buttonsStyling: false,
          title: "Data Emiten Gagal Ditambahkan",
          confirmButtonText: "Maaf Sayang Sekali",
          icon: "error",
        });
      }
    }
  }
  const title = "Tambah Data Emiten Syariah";
  document.title = title;
  return (
    <div className="mx-2">
      {isBackToHome && <Navigate to={"/"} />}
      <Button type="link" href="/" className="md:ml-40 block absolute">
        <IconArrowBackSVG className="fill-green-500" />
      </Button>
      <Heading Tag="h1" className="text-center mt-3">
        {title}
      </Heading>
      <div className="flex justify-center mt-3">
        <form action="/" method="post" onSubmit={handleTambahDataEmiten}>
          {/* nama emiten */}
          <InputLabel
            className="mt-2"
            htmlFor="nama_emiten"
            classInput="w-80"
            classLabel="block"
            placeholder="contoh: PT TELKOM INDONESIA TBK"
            maxLength={255}
            autoComplete="off"
            validation={validation.nama_emiten}
          >
            Nama Emiten
          </InputLabel>
          {/* kode emiten */}
          <InputLabel
            className="mt-2"
            htmlFor="kode_emiten"
            classInput="w-80"
            classLabel="block"
            placeholder="contoh: TLKM"
            maxLength={4}
            autoComplete="off"
            validation={validation.kode_emiten}
          >
            Kode Emiten
          </InputLabel>
          {/* jumlah saham */}
          <InputLabel
            className="mt-2"
            type="number"
            htmlFor="jumlah_saham"
            classInput="w-80"
            classLabel="block"
            placeholder="minimal 10 juta"
            validation={validation.jumlah_saham}
          >
            Jumlah Saham
          </InputLabel>
          <Button isPrimary type="submit" className="mt-2 w-80">
            <IconAddSVG className="inline fill-white" />
            Data Emiten
          </Button>
        </form>
      </div>
    </div>
  );
}
