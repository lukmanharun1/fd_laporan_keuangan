import axios from "helpers/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SERVICE_LAPORAN_KEUANGAN } from "config";
import { optionsJenisLaporan } from "constants/optionsJenisLaporan";
import { Dropdown, Heading, Button } from "components";
import { IconArrowBackSVG, IconAddSVG } from "components/SVG";
import {
  TableLaporanKeuangan,
  TableRasioLaporanKeuangan,
} from "components/Table";

import {
  ChartRasioLaporanKeuangan,
  ChartLaporanKeuangan,
} from "components/Chart";

export default function Info() {
  // inisialisasi data laporan keuangan
  const [jenisLaporanKeuangan, setJenisLaporanKeuangan] =
    useState("neraca-keuangan");
  const [jenisTanggalLaporan, setJenisTanggalLaporan] = useState("Q1");
  const [namaEmiten, setNamaEmiten] = useState("Nama Emiten Tidak Ada");

  const [dataTbody, setDataTbody] = useState([]);
  const [dataRasio, setDataRasio] = useState(null);
  const [optionsTanggalLaporan, setOptionsTanggalLaporan] =
    useState(optionsJenisLaporan);
  const [showChartOrTable, setShowChartOrTable] = useState("chart");

  const optionsChartOrTable = [
    {
      key: "Chart",
      value: "chart",
    },
    {
      key: "Table",
      value: "table",
    },
  ];
  const optionsLaporanKeuangan = [
    {
      key: "Neraca Keuangan",
      value: "neraca-keuangan",
    },
    {
      key: "Laba Rugi",
      value: "laba-rugi",
    },
    {
      key: "Arus Kas",
      value: "arus-kas",
    },
    {
      key: "Dividen",
      value: "dividen",
    },
    {
      key: "Rasio",
      value: "rasio",
    },
  ];
  function handleOptionsLaporanKeuangan(e) {
    const { value } = e.target;
    const dataQ4 = [
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
        key: "Q4",
        value: "Q4",
      },
      {
        key: "TAHUNAN",
        value: "TAHUNAN",
      },
    ];
    if (value === "neraca-keuangan") {
      // neraca keuangan
      setOptionsTanggalLaporan(optionsJenisLaporan);
    } else if (value === "laba-rugi") {
      // laba rugi
      setOptionsTanggalLaporan(dataQ4);
    } else if (value === "arus-kas") {
      // arus kas
      setOptionsTanggalLaporan(dataQ4);
    } else if (value === "dividen") {
      // dividen
      setOptionsTanggalLaporan([
        {
          key: "TAHUNAN",
          value: "TAHUNAN",
        },
      ]);
    } else if (value === "rasio") {
      // rasio
      setOptionsTanggalLaporan(dataQ4);
    }
    setJenisLaporanKeuangan(value);
  }

  function handleOptionsTanggalLaporan(e) {
    setJenisTanggalLaporan(e.target.value);
  }

  function handleChartOrTable(e) {
    setShowChartOrTable(e.target.value);
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
    if (jenisLaporanKeuangan !== "rasio") {
      let urlLaporanKeuangan = `${SERVICE_LAPORAN_KEUANGAN}/${jenisLaporanKeuangan}/${kode_emiten}/${jenisTanggalLaporan}`;
      if (jenisLaporanKeuangan === "dividen") {
        setJenisTanggalLaporan("TAHUNAN");
        urlLaporanKeuangan = `${SERVICE_LAPORAN_KEUANGAN}/${jenisLaporanKeuangan}/${kode_emiten}`;
      }
      axios.get(urlLaporanKeuangan).then((laporanKeuangan) => {
        const { nama_emiten, data } = laporanKeuangan.data;
        setDataTbody(data);
        if (nama_emiten) setNamaEmiten(nama_emiten);
      });
    } else if (jenisLaporanKeuangan === "rasio") {
      const urlRasio = `${SERVICE_LAPORAN_KEUANGAN}/rasio/${kode_emiten}/${jenisTanggalLaporan}`;
      axios.get(urlRasio).then((dataRasio) => {
        setDataRasio(dataRasio.data?.data);
      });
    }
  }, [kode_emiten, jenisLaporanKeuangan, jenisTanggalLaporan]);
  return (
    <div className="mx-2">
      <Button type="link" href="/" className="absolute">
        <IconArrowBackSVG className="fill-green-500" />
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

      <Dropdown
        options={optionsChartOrTable}
        className="ml-3 mb-3 w-28"
        onChange={handleChartOrTable}
      />
      <Button
        isPrimary
        href={`/tambah-data-laporan-keuangan/${kode_emiten}`}
        type="link"
        className="h-10 ml-3"
      >
        <IconAddSVG className="inline fill-white" />
        Data Laporan Keuangan
      </Button>
      {/* tampilkan table laporan keuangan jika di pilih dropdown selain rasio */}
      {dataTbody.length > 0 &&
        jenisLaporanKeuangan !== "rasio" &&
        showChartOrTable === "table" && (
          <TableLaporanKeuangan
            dataTbody={dataTbody}
            namaLaporan={jenisLaporanKeuangan}
            jenisLaporan={jenisTanggalLaporan}
          />
        )}
      {/* tampilkan table rasio jika di pilih dropdown rasio*/}
      {jenisLaporanKeuangan === "rasio" &&
        dataRasio &&
        showChartOrTable === "table" && (
          <TableRasioLaporanKeuangan
            data={dataRasio}
            jenisLaporan={jenisTanggalLaporan}
          />
        )}

      {/* tampilkan chart laporan keuangan jika di pilih dropdown selain rasio*/}
      {dataTbody.length > 0 &&
        jenisLaporanKeuangan !== "rasio" &&
        showChartOrTable === "chart" && (
          <ChartLaporanKeuangan
            dataTbody={dataTbody}
            namaLaporan={jenisLaporanKeuangan}
            jenisLaporan={jenisTanggalLaporan}
          />
        )}
      {/* tampilkan chart rasio jika di pilih dropdown rasio */}
      {jenisLaporanKeuangan === "rasio" &&
        dataRasio &&
        showChartOrTable === "chart" && (
          <ChartRasioLaporanKeuangan
            data={dataRasio}
            jenisLaporan={jenisTanggalLaporan}
          />
        )}
    </div>
  );
}
