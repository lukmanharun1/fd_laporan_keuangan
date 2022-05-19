import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dropdown from "../component/Dropdown";
import Heading from "../component/Heading";
import IconArrowBack from "../component/IconArrowBack";
import IconAdd from "../component/IconAdd";
import Button from "../component/Button";
import { SERVICE_LAPORAN_KEUANGAN } from "../config";
import TableLaporanKeuangan from "../component/TableLaporanKeuangan";
export default function Info() {
  // inisialisasi data laporan keuangan
  const [jenisLaporanKeuangan, setJenisLaporanKeuangan] =
    useState("neraca-keuangan");
  const [jenisTanggalLaporan, setJenisTanggalLaporan] = useState("TAHUNAN");
  const [namaEmiten, setNamaEmiten] = useState("Nama Emiten Tidak Ada");

  const [dataTbody, setDataTbody] = useState([]);
  const [optionsTanggalLaporan, setOptionsTanggalLaporan] = useState({
    TAHUNAN: "TAHUNAN",
    Q3: "Q3",
    Q2: "Q2",
    Q1: "Q1",
  });
  const optionsLaporanKeuangan = {
    "Neraca Keuangan": "neraca-keuangan",
    "Laba Rugi": "laba-rugi",
    "Arus Kas": "arus-kas",
    Dividen: "dividen",
    Rasio: "rasio",
  };
  function handleOptionsLaporanKeuangan(e) {
    const { value } = e.target;
    const dataQ4 = {
      TAHUNAN: "TAHUNAN",
      Q4: "Q4",
      Q3: "Q3",
      Q2: "Q2",
      Q1: "Q1",
    };
    if (value === "neraca-keuangan") {
      // neraca keuangan
      setOptionsTanggalLaporan({
        TAHUNAN: "TAHUNAN",
        Q3: "Q3",
        Q2: "Q2",
        Q1: "Q1",
      });
    } else if (value === "laba-rugi") {
      // laba rugi
      setOptionsTanggalLaporan(dataQ4);
    } else if (value === "arus-kas") {
      // arus kas
      setOptionsTanggalLaporan(dataQ4);
    } else if (value === "dividen") {
      // dividen
      setOptionsTanggalLaporan({
        TAHUNAN: "TAHUNAN",
      });
    } else if (value === "rasio") {
      // rasio
      setOptionsTanggalLaporan(dataQ4);
    }
    setJenisLaporanKeuangan(value);
  }

  function handleOptionsTanggalLaporan(e) {
    setJenisTanggalLaporan(e.target.value);
  }

  const { kode_emiten } = useParams();
  document.title = `info laporan keuangan ${kode_emiten}`;
  useEffect(() => {
    // handle error neraca keuangan saat get Q4
    if (
      jenisLaporanKeuangan === "neraca-keuangan" &&
      jenisTanggalLaporan === "Q4"
    ) {
      setJenisTanggalLaporan("TAHUNAN");
    }
    let urlLaporanKeuangan = `${SERVICE_LAPORAN_KEUANGAN}/${jenisLaporanKeuangan}/${kode_emiten}/${jenisTanggalLaporan}`;
    if (jenisLaporanKeuangan === "dividen") {
      setJenisTanggalLaporan("TAHUNAN");
      urlLaporanKeuangan = `${SERVICE_LAPORAN_KEUANGAN}/${jenisLaporanKeuangan}/${kode_emiten}`;
    }
    axios.get(urlLaporanKeuangan).then((laporanKeuangan) => {
      const { nama_emiten, data } = laporanKeuangan.data;
      setDataTbody(data);
      setNamaEmiten(nama_emiten);
    });
  }, [kode_emiten, jenisLaporanKeuangan, jenisTanggalLaporan]);
  return (
    <div className="mx-2">
      <Button type="link" href="/" className="absolute">
        <IconArrowBack className="fill-green-500" />
      </Button>
      <Heading Tag="h3" className="text-center mt-3">
        Laporan Keuangan {namaEmiten}
      </Heading>
      <Dropdown
        options={optionsLaporanKeuangan}
        className="mt-10 w-48"
        onChange={handleOptionsLaporanKeuangan}
      />
      <Dropdown
        options={optionsTanggalLaporan}
        className="ml-3 mb-3 w-36"
        onChange={handleOptionsTanggalLaporan}
      />
      <Button
        isPrimary
        href={`/tambah-data-laporan-keuangan/${kode_emiten}`}
        type="link"
        className="h-10 ml-3"
      >
        <IconAdd className="inline fill-white" />
        Data Laporan Keuangan
      </Button>
      <Heading Tag="h5" className="inline-block ml-3">
        Kode Emiten {kode_emiten}
      </Heading>
      {dataTbody.length > 0 && jenisLaporanKeuangan !== "rasio" && (
        <TableLaporanKeuangan
          dataTbody={dataTbody}
          namaLaporan={jenisLaporanKeuangan}
          jenisLaporan={jenisTanggalLaporan}
        />
      )}
    </div>
  );
}
